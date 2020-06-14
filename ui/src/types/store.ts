
import {UserState} from './user'
import {ApplicationState} from './application'
import {LogState} from './log'
import {TemplatingState} from './templating'
import {PluginsState} from './plugins'

export interface StoreState {
    user: UserState
    application: ApplicationState
    templating: TemplatingState
    log: LogState
    plugins: PluginsState
}