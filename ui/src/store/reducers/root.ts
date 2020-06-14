import { AnyAction, combineReducers } from 'redux';
import applicationReducers from './application'
import userReducers from './user'
import pluginsReducer from './plugins'
import { CleanUp, cleanUpAction } from '../actions/cleanUp';

const rootReducers = {
    ...applicationReducers,
    ...userReducers,
    ...pluginsReducer
};


export const createRootReducer = () => {
  const appReducer = combineReducers({
    ...rootReducers,
  });

  return (state: any, action: AnyAction): any => {
    if (action.type !== cleanUpAction.type) {
      return appReducer(state, action);
    }

    const { stateSelector } = action.payload as CleanUp<any>;
    const stateSlice = stateSelector(state);
    recursiveCleanState(state, stateSlice);

    return appReducer(state, action);
  };
};

export const recursiveCleanState = (state: any, stateSlice: any): boolean => {
  for (const stateKey in state) {
    if (!state.hasOwnProperty(stateKey)) {
      continue;
    }

    const slice = state[stateKey];
    if (slice === stateSlice) {
      state[stateKey] = undefined;
      return true;
    }

    if (typeof slice === 'object') {
      const cleaned = recursiveCleanState(slice, stateSlice);
      if (cleaned) {
        return true;
      }
    }
  }

  return false;
};