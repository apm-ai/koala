import queryString from 'query-string'
import { History as RouterHistory, Location } from 'history';
import _ from 'lodash'
import {getTimeSrv} from 'src/core/services/time'

// time params, variable params etc
export const addParamsToUrl = (history: RouterHistory, location: Location) => {
    const timeSrv = getTimeSrv()
    const urlRange = timeSrv.timeRangeForUrl();
    const currentQuery = getUrlParams()
    _.extend(currentQuery, urlRange)
    const params = queryString.stringify(currentQuery)

    history.replace({
        ...location,
        search: params,
    });
}

export const addParamToUrl = (history: RouterHistory, location: Location,param: any) => {
    const currentQuery = getUrlParams()
    _.extend(currentQuery, param)
    const params = queryString.stringify(currentQuery)

    history.replace({
        ...location,
        search: params,
    });
}

export const removeParamFromUrl = (history: RouterHistory, location: Location,paramKey: string) => {
    const currentQuery = getUrlParams()
    delete currentQuery[paramKey]
    const params = queryString.stringify(currentQuery)

    history.replace({
        ...location,
        search: params,
    });
}

export const getUrlParams = ():any => {
    return  queryString.parseUrl(window.location.href).query
  }