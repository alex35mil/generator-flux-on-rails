import config   from 'config/server';
import cookies  from './cookies';


export default class Auth {

  constructor(context, domain) {

    this.cookie = cookies(context);

    this.setCookieParams = months => {

      const monthsFromNow = quantity => {
        const now = new Date();
        return (new Date(now.setMonth(now.getMonth() + quantity)));
      };

      const params = {};

      params.httpOnly = false;

      if (domain) params.domain  = domain;
      if (months) params.expires = monthsFromNow(months);

      return params;

    };

  }


  login(email, token, params = {}) {

    const cookieParams = params.sessionOnly ? this.setCookieParams() : this.setCookieParams(6);

    this.cookie.set(config.loginCookie, email, cookieParams);
    this.cookie.set(config.tokenCookie, token, cookieParams);

    if (params.cb) params.cb();

  }


  logout(cb) {

    this.cookie.set(config.loginCookie, 'bye-bye', this.setCookieParams(-1));
    this.cookie.set(config.tokenCookie, 'bye-bye', this.setCookieParams(-1));

    if (cb) return cb();

  }


  getLogin() {

    return this.cookie.get(config.loginCookie);

  }


  getToken() {

    return this.cookie.get(config.tokenCookie);

  }


  getAuthHeaders() {

    if (this.getLogin() && this.getToken()) {
      return {
        [config.loginHeader]: this.getLogin(),
        [config.tokenHeader]: this.getToken()
      };
    }

    return false;

  }


  isLoggedIn() {

    const { cookie } = this;
    return (
      !!(cookie.get(config.loginCookie) && cookie.get(config.tokenCookie))
    );

  }

}
