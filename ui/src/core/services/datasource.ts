import { DataSourceService, DataSourceApi, DataSourceInstanceSettings, config ,getDataSourceService} from 'src/packages/datav-core'
import {importDataSourcePlugin} from 'src/plugins/loader'

export class DatasourceSrv implements DataSourceService {
    // cache for datasource plugins
    datasources: Record<string, DataSourceApi> = {}

    constructor() {
        this.init();
    }
    
    init() {
        this.datasources = {};
    }

    getDataSourceSettingsByUid(uid: string): DataSourceInstanceSettings | undefined {
        return Object.values(config.datasources).find(ds => ds.uid === uid)
    }

    get(name?: string): Promise<DataSourceApi> {
        if (!name) {
            return this.get(config.defaultDatasource)
        }



        if (name === 'default') {
            return this.get(config.defaultDatasource)
        }

        if (this.datasources[name]) {
            return Promise.resolve(this.datasources[name])
        }

        return this.loadDatasource(name)
    }

    async loadDatasource(name: string):  Promise<DataSourceApi> {
        // check if its in cache now
        if (this.datasources[name]) {
            return this.datasources[name]
        }

        const dsConfig = config.datasources[name]
        if (!dsConfig) {
            return Promise.reject({ message: `Datasource named ${name} was not found in config` })
        }

        try {
            const dsPlugin = await importDataSourcePlugin(dsConfig.meta)
            const instance : DataSourceApi= new dsPlugin.DataSourceClass(dsConfig)
            instance.components = dsPlugin.components
            instance.meta = dsConfig.meta

            // store in instance cache
            this.datasources[name] = instance 

            return instance
        } catch(err) {
            return Promise.reject({ message: `Datasource named ${name} was not found in plugins` })
        }
    }
} 

export const getDatasourceSrv = (): DatasourceSrv => {
    return getDataSourceService() as DatasourceSrv;
};
  
export default DatasourceSrv;