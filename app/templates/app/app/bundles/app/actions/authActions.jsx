import apiCall             from 'app/libs/apiCall';
import { paths, apiPaths } from '../routes/authPaths';
import actionTypes         from '../constants/authConstants';


export function setLoggedInState(
  user: string,
) {
  return {
    type: actionTypes.AUTH_LOGGED_IN,
    user: user,
  };
}


export function login(
  {
    authData,
    authAgent,
    history,
  } : {
    authData: {
      api_user: {
        email: string,
        password: string,
      },
    },
    authAgent: {
      login: Function,
    },
    history: Object,
  }
) {
  return dispatch => {

    dispatch({
      type: actionTypes.AUTH_LOGIN_REQUESTED,
    });

    return apiCall({
      method: 'POST',
      path  : apiPaths.loginPath(),
      data  : authData,
    })
      .then(res => {
        const { 'email': user, 'authentication_token': token } = res.data.user;

        authAgent.login(user, token, {
          sessionOnly: false,
          callback   : () => {
            dispatch({
              type: actionTypes.AUTH_LOGIN_SUCCEED,
              user: user,
            });
            if (!history.goBack()) history.pushState(null, '/');
          },
        });
      })
      .catch(res => {
        dispatch({
          type  : actionTypes.AUTH_LOGIN_FAILED,
          errors: {
            code: res.status,
            data: res.data,
          },
        });
      });

  };
}


export function logout({
  authAgent,
  history,
  nextLocation,
} : {
  authAgent: {
    logout: Function,
  },
  history     : Object,
  nextLocation: string,
}) {
  return dispatch => {
    authAgent.logout(() => {
      dispatch({
        type: actionTypes.AUTH_LOGGED_OUT,
      });

      history.pushState({ nextLocation }, paths.logoutPath());
    });
  };
}
