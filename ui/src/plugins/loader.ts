import { DataSourcePluginMeta, SystemJS, PanelPlugin, PanelPluginMeta, PluginState,PluginType} from 'src/packages/datav-core'
import { GenericDataSourcePlugin } from './settings'
import { builtInPlugins } from './built_in_plugins'
import { getPanelPluginNotFound, getPanelPluginLoadError } from 'src/views/dashboard/PanelPluginError'

export async function importPluginModule(path: string): Promise<any> {
  const builtIn = builtInPlugins[path];
  if (builtIn) {
    // for handling dynamic imports
    if (typeof builtIn === 'function') {
      return await builtIn();
    } else {
      return Promise.resolve(builtIn);
    }
  }
  return SystemJS.import(path);
}


export function importDataSourcePlugin(meta: DataSourcePluginMeta): Promise<GenericDataSourcePlugin> {
  return importPluginModule(meta.module).then(pluginExports => {
    if (pluginExports.plugin) {
      const dsPlugin = pluginExports.plugin as GenericDataSourcePlugin;
      dsPlugin.meta = meta;
      return dsPlugin;
    }
    console.log("import plugin error,plugin: ", pluginExports)
    throw new Error('Plugin module is missing DataSourcePlugin or Datasource constructor export');
  })
}

interface PanelCache {
  [key: string]: Promise<PanelPlugin>;
}
const panelCache: PanelCache = {};

export function importPanelPlugin(id: string): Promise<PanelPlugin> {
  const loaded = panelCache[id];

  if (loaded) {
    return loaded;
  }

  //@todo
  // 为了迅速推进主体流程，暂时写死了meta
  const meta: PanelPluginMeta = {
    type: PluginType.panel,
    baseUrl: "public/app/plugins/panel/stat",
    hideFromList: false,
    id: "stat",
    info: {
      author: { name: "Grafana Labs", url: "https://grafana.com" },
      build: {},
      description: "Singlestat Panel for Grafana",
      links: null,
      logos: { small: "public/app/plugins/panel/stat/img/icn-singlestat-panel.svg", large: "public/app/plugins/panel/stat/img/icn-singlestat-panel.svg" },
      screenshots: null,
      updated: "",
      version: "",
    },

    module: "app/plugins/panel/stat/module",
    name: "Stat",
    skipDataQuery: false,
    sort: 2,
    state: "beta" as PluginState
  }

  if (!meta) {
    return Promise.resolve(getPanelPluginNotFound(id));
  }

  panelCache[id] = importPluginModule(meta.module)
    .then(pluginExports => {
      if (pluginExports.plugin) {
        return pluginExports.plugin as PanelPlugin;
      } 
      throw new Error('missing export plugin:' + meta.type);
    })
    .then(plugin => {
      plugin.meta = meta;
      return plugin;
    })
    .catch(err => {
      // TODO, maybe a different error plugin
      console.log('Error loading panel plugin: ' + id);
      console.log(err)
      return getPanelPluginLoadError(meta);
    });

  return panelCache[id];
}
