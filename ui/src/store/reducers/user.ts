import { createAction } from '@reduxjs/toolkit';

import { UserState } from 'src/types/user';

import storage from 'src/library/utils/localStorage'

const initUser = storage.get("user")
export const initialState: UserState = initUser ? initUser :
  {
    id: null,
    name: null,
    email: null,
    priv: null,
    mobile: null,
    avatarUrl: null
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