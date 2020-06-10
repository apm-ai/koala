import { createAction } from '@reduxjs/toolkit';

import { UserState } from 'src/types/user';

import storage from 'src/library/utils/localStorage'

import {defaultConfig} from 'src/packages/datav-core'

const cachedUser = storage.get("user")
export const initialState: UserState = cachedUser ? cachedUser :
  {
    id: null,
    name: null,
    email: null,
    priv: null,
    mobile: null,
    avatarUrl: defaultConfig.user.avatarUrl
  };

export const updateUser = createAction<UserState>('user/update');


export const userReducer = (state = initialState, action: any) => {
  if (updateUser.match(action)) {
    storage.set("user",action.payload)
    return { ...action.payload}
  }

  return state;
};



export default {
  user: userReducer,
};