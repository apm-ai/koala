import {DataSourcePlugin} from 'src/packages/datav-core'
import {PrometheusDatasource} from './datasource'
import {PromQueryEditor} from './components/PromQueryEditor'

export const plugin = new DataSourcePlugin(PrometheusDatasource)
  .setQueryEditor(PromQueryEditor)