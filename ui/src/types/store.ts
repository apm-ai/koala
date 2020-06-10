
import {UserState} from './user'
import {ApplicationState} from './application'
import {LogState} from './log'
import {TemplatingState} from './template'
export interface StoreState {
    user: UserState,
    application: ApplicationState,
    templating: TemplatingState,
    log: LogState
}