/* Datasource Plugins*/
import * as singlestatPanel2 from 'src/plugins/panel/stat/module';

const prometheusPlugin = async () =>
    await import(/* webpackChunkName: "prometheusPlugin" */ 'src/plugins/datasource/prometheus/module');


export const builtInPlugins = {
    'src/plugins/datasource/prometheus/module': prometheusPlugin,
    'app/plugins/panel/stat/module': singlestatPanel2
}
