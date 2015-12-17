import Immutable, { Map as $Map } from 'immutable';

import actionTypes from '../constants/authConstants';


const $initialState = Immutable.fromJS({
  action    : null,
  user      : null,
  isLoggedIn: false,
  errors    : null,
  isLoading : false,
});


export default function authReducer(
  $state: $Map = $initialState,
  {
    type,
    user,
    errors,
  } : {
    type  : string,
    user  : ?string,
    errors: void | {
      code: number,
      data: Object,
    },
  }
) {

  switch (type) {

    case actionTypes.AUTH_LOGGED_IN: {
      return $state.merge({
        action    : type,
        user      : user,
        isLoggedIn: true,
        errors    : null,
        isLoading : false,
      });
    }


    case actionTypes.AUTH_LOGIN_REQUESTED: {
      return $state.merge({
        action    : type,
        user      : null,
        isLoggedIn: false,
        errors    : null,
        isLoading : true,
      });
    }


    case actionTypes.AUTH_LOGIN_SUCCEED: {
      return $state.merge({
        action    : type,
        user      : user,
        isLoggedIn: true,
        errors    : null,
        isLoading : false,
      });
    }


    case actionTypes.AUTH_LOGIN_FAILED: {
      return $state.merge({
        action    : type,
        user      : null,
        isLoggedIn: false,
        errors    : errors,
        isLoading : false,
      });
    }


    case actionTypes.AUTH_LOGGED_OUT: {
      return $state.merge({
        action    : type,
        user      : null,
        isLoggedIn: false,
        errors    : null,
        isLoading : false,
      });
    }


    default: {
      return $state;
    }

  }

}
