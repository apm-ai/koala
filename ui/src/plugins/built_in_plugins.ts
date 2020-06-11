/* Datasource Plugins*/
const prometheusPlugin = async () =>
    await import(/* webpackChunkName: "prometheusPlugin" */ 'src/plugins/datasource/prometheus/module');

export const builtInPlugins = {
    'src/plugins/datasource/prometheus/module': prometheusPlugin,
}
