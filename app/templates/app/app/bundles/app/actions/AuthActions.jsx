import apiCall            from 'app/libs/apiCall';

import * as actionTypes   from '../constants/AuthConstants';


export function setLoggedInState(user) {

  return {
    type: actionTypes.AUTH_LOGGED_IN,
    user: user
  };

}


export function login({ data, authAgent }) {

  return dispatch => {

    dispatch({
      type: actionTypes.AUTH_LOGIN_REQUESTED
    });

    return apiCall({
      method: 'POST',
      path  : '/login',
      data  : data
    })
      .then(res => {

        const { 'email': user, 'authentication_token': token } = res.data.user;

        authAgent.login(user, token, {
          sessionOnly: false,
          cb         : () => {

            dispatch({
              type: actionTypes.AUTH_LOGIN_SUCCEED,
              data: res.data
            });

          }
        });

      })
      .catch(res => {
        dispatch({
          type : actionTypes.AUTH_LOGIN_FAILED,
          code : res.status,
          error: res.data
        });
      });

  };

}


export function logout() {

  return {
    type: actionTypes.AUTH_LOGGED_OUT
  };

}
