import moment from 'moment'
import { createAction } from '@reduxjs/toolkit';

import { ApplicationState } from 'src/types/application'; 

import storage from 'src/library/utils/localStorage'

export const initialState: ApplicationState = {
  startDate: storage.get('app.startDate') || moment().subtract(1, 'h'),
  endDate: storage.get('app.endDate') || moment(),
  locale : storage.get('app.locale') || 'en_US',
  theme: storage.get('app.theme') || 'dark'
}; 


export const updateLocale = createAction<string>('application/locale');
export const updateTheme = createAction<string>('application/theme');
export const updateStartDate = createAction<any>('application/startDate');
export const updateEndDate = createAction<any>('application/endDate');

export const applicationReducer = (state = initialState, action: any) => {
  if (updateLocale.match(action)) {
    const locale = state.locale==='en_US'?'zh_CN':'en_US'
    storage.set('app.locale', locale)
    return {...state, locale}
  } 
  
  if (updateTheme.match(action)) {
    storage.set('app.theme',action.payload)
    return {...state,theme: action.payload}
  }

  if (updateStartDate.match(action)) {
    storage.set('app.startDate',action.payload)
    return {...state,startDate: action.payload}
  }

  if (updateEndDate.match(action)) {
    storage.set('app.endDate',action.payload)
    return {...state,endDate: action.payload}
  }

  return state;
};


  
export default {
    application: applicationReducer,
};
  