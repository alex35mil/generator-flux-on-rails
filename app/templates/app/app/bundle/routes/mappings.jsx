import mapper from'../../api/map';

export default {

  api: [
    {
      req    : '/',
      apiPath: '/component'
    }
  ],

  locals: [
      '/login'
  ],

  getApiPath(localPath) {
    return mapper(localPath, this.api);
  },

  isLocal(localPath) {
    return (
        this.locals.indexOf(localPath) !== -1
    );
  }

}
