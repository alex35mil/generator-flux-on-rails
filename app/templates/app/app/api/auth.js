import cookies  from '../shared/js/helpers/cookies';
import config   from '../../config/server';


export default (context) => {

  let cookie = cookies(context);


  let cookieParams = (months) => {

    let params = {};

    params.httpOnly = false;

    if (months) {
      let monthsFromNow = (n) => {
        let now = new Date();
        return (new Date(now.setMonth(now.getMonth() + n)));
      };
      params.expires = monthsFromNow(months);
    }

    return params;
  };


  return {

    login(email, token, params) {

      let opts = params.sessionOnly ? cookieParams() : cookieParams(6);

      cookie.set(config.loginCookie, email, opts);
      cookie.set(config.tokenCookie, token, opts);

      if (params.cb) params.cb();

    },

    logout(cb) {

      cookie.set(config.loginCookie, 'bye-bye', cookieParams(-1));
      cookie.set(config.tokenCookie, 'bye-bye', cookieParams(-1));

      if (cb) cb();

    },

    getLogin() {
      return cookie.get(config.loginCookie);
    },

    getToken() {
      return cookie.get(config.tokenCookie);
    },

    getAuthHeaders() {
      if (this.getLogin() && this.getToken()) {
        return {
          [config.loginHeader]: this.getLogin(),
          [config.tokenHeader]: this.getToken()
        };
      } else {
        return false;
      }
    },

    isLoggedIn() {
      return !!(cookie.get(config.loginCookie) && cookie.get(config.tokenCookie));
    }

  }


}
