import { createAction } from '@reduxjs/toolkit';

import { ApplicationState } from 'src/types/application'; 

import storage from 'src/core/library/utils/localStorage'
import {defaultConfig} from 'src/packages/datav-core'

export const initialState: ApplicationState = {
  startDate: storage.get('app.startDate') || defaultConfig.application.startDate(),
  endDate: storage.get('app.endDate') || defaultConfig.application.endDate(),
  locale : storage.get('app.locale') || defaultConfig.application.locale,
  theme: storage.get('app.theme') || defaultConfig.application.theme
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
  