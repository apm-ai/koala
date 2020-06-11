import { DataSourceSettings } from 'src/packages/datav-core';
 
export function createDatasourceSettings<T>(jsonData: T): DataSourceSettings<T> {
  return {
    id: 1,
    name: 'datasource-test',
    typeLogoUrl: '',
    type: 'datasource',
    url: 'http://localhost',
    password: '',
    user: '',
    database: '',
    basicAuth: false,
    basicAuthPassword: '',
    basicAuthUser: '',
    isDefault: false,
    jsonData,
    readOnly: false,
    withCredentials: false,
  };
}