import { createAction } from '@reduxjs/toolkit';

import { UserState } from 'src/types/user'; 

import storage from 'src/library/utils/localStorage'

export const initialState: UserState = {
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
        console.log(action.payload)
      return {...state}
    } 
  
    return state;
  };
  
  
    
  export default {
      user: userReducer,
  };