import {PanelPlugin} from 'src/packages/datav-core'
import { createAction } from '@reduxjs/toolkit';
import {PluginsState} from 'src/types/plugins'

export const initialState: PluginsState = {
    plugins: [],
    searchQuery: '',
    hasFetched: false,
    dashboards: [],
    isLoadingPluginDashboards: false,
    panels: {},
  };

export const setPlugin = createAction<PanelPlugin>('plugins/set')

export const pluginsReducer = (state = initialState, action: any) => {
    if (setPlugin.match(action)) {
        state.panels[action.payload.meta!.id] = action.payload;
        return state
    } 
    
    return state;
  }

  export default {
    plugins: pluginsReducer,
  };