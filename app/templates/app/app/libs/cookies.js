import cookie from 'cookie';


export default context => {

  if (process.browser) {

    return {
      get(name) {
        return cookie.parse(context.cookie)[name];
      },

      set(name, value, options) {
        context.cookie = cookie.serialize(name, value, options);
      },
    }

  } else {

    return {
      get(name) {
        return context.cookies[name];
      },

      set(name, value, options) {
        context.res.cookie(name, value, options);
      },
    }

  }

}
