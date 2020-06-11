import { DataSourcePluginMeta ,SystemJS} from 'src/packages/datav-core'
import {GenericDataSourcePlugin} from './settings'
import {builtInPlugins} from './built_in_plugins'
export function importDataSourcePlugin(meta: DataSourcePluginMeta) : Promise<GenericDataSourcePlugin>{
    return importPluginModule(meta.module).then(pluginExports => {
      if (pluginExports.plugin) {
        const dsPlugin = pluginExports.plugin as GenericDataSourcePlugin;
        dsPlugin.meta = meta;
        return dsPlugin;
      }
      console.log("import plugin error,plugin: ",pluginExports)
      throw new Error('Plugin module is missing DataSourcePlugin or Datasource constructor export');
    })
}

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