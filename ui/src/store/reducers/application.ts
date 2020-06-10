import moment from 'moment'
import { createAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../../types/application'; 

import storage from 'src/library/utils/localStorage'

export const initialState: ApplicationState = {
  startDate: storage.get('apm-start-date') || moment().subtract(1, 'h'),
  endDate: storage.get('apm-end-date') || moment(),
  locale : storage.get('apm-locale') || 'en_US',
  theme: storage.get('apm-theme') || 'dark'
}; 


export const updateLocale = createAction<string>('application/locale');
export const updateTheme = createAction<string>('application/theme');
export const updateStartDate = createAction<any>('application/startDate');
export const updateEndDate = createAction<any>('application/endDate');

export const applicationReducer = (state = initialState, action: any) => {
  if (updateLocale.match(action)) {
    const locale = state.locale==='en_US'?'zh_CN':'en_US'
    storage.set('apm-locale', locale)
    return {...state, locale}
  } 
  
  if (updateTheme.match(action)) {
    storage.set('apm-theme',action.payload)
    return {...state,theme: action.payload}
  }

  if (updateStartDate.match(action)) {
    storage.set('apm-start-date',action.payload)
    return {...state,startDate: action.payload}
  }

  if (updateEndDate.match(action)) {
    storage.set('apm-end-date',action.payload)
    return {...state,endDate: action.payload}
  }

  return state;
};


  
export default {
    application: applicationReducer,
};
  