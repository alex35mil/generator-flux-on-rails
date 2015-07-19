/* eslint no-shadow: 0 */

import * as actionTypes  from '../constants/AuthConstants';


const initialState = {
  type      : null,
  user      : null,
  isLoggedIn: false,
  error     : null,
  isLoading : false
};

export default function auth(state = initialState, action) {

  const { type, user, code, error } = action;

  switch (type) {

    case actionTypes.AUTH_LOGGED_IN:
      return {
        type,
        user,
        isLoggedIn: true,
        error     : null,
        isLoading : false
      };


    case actionTypes.AUTH_LOGIN_REQUESTED:
      return {
        type,
        user      : null,
        isLoggedIn: false,
        error     : null,
        isLoading : true
      };


    case actionTypes.AUTH_LOGIN_SUCCEED:
      return {
        type,
        user,
        isLoggedIn: true,
        error     : null,
        isLoading : false
      };


    case actionTypes.AUTH_LOGIN_FAILED:
      return {
        type,
        error,
        user      : null,
        isLoggedIn: false,
        isLoading : false
      };


    case actionTypes.AUTH_LOGGED_OUT:
      return {
        type,
        user      : null,
        isLoggedIn: false,
        error     : null,
        isLoading : false
      };


    default:
      return state;

  }

}
