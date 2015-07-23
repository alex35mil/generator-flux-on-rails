/* eslint no-shadow: 0 */

import * as actionTypes  from '../constants/AuthConstants';


const initialState = {
  type      : null,
  user      : null,
  isLoggedIn: false,
  errors    : null,
  isLoading : false
};

export default function auth(state = initialState, action) {

  const { type, user, errors } = action;

  switch (type) {

    case actionTypes.AUTH_LOGGED_IN:
      return {
        type,
        user,
        isLoggedIn: true,
        errors    : null,
        isLoading : false
      };


    case actionTypes.AUTH_LOGIN_REQUESTED:
      return {
        type,
        user      : null,
        isLoggedIn: false,
        errors    : null,
        isLoading : true
      };


    case actionTypes.AUTH_LOGIN_SUCCEED:
      return {
        type,
        user,
        isLoggedIn: true,
        errors    : null,
        isLoading : false
      };


    case actionTypes.AUTH_LOGIN_FAILED:
      return {
        type,
        errors,
        user      : null,
        isLoggedIn: false,
        isLoading : false
      };


    case actionTypes.AUTH_LOGGED_OUT:
      return {
        type,
        user      : null,
        isLoggedIn: false,
        errors    : null,
        isLoading : false
      };


    default:
      return state;

  }

}
