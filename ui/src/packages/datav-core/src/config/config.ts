import {DatavConfig} from './types'
import moment from 'moment'

// default config settings
export const defaultConfig : DatavConfig= {
    panel : { newTitle: 'Panel Title'},
    dashboard: {newTitle: 'New Dashboard Copy'},
    application: { 
        startDate: () => moment().subtract(1, 'h') ,
        endDate: ()=> moment(),
        theme: 'light',
        locale: 'en_US'
    },
    user: {
        avatarUrl: ''
    }
}