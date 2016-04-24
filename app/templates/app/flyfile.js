require('babel-register');

const wpClientConfig = require('./configs/build/webpack.client.prod.config.babel').default;
const wpServerConfig = require('./configs/build/webpack.server.config.babel').default;

const expose = module.exports;


/* ======= Sets */

/** @desc Compile production build */

expose.default = function* () {
  yield this.start('runDevEnv');
};


/** @desc Start development servers with development build */

expose.runDevEnv = function* runDevEnv() {
  yield this.start(['clear', 'lint', 'test']);
  yield this.start(['runDevBuild']);
  yield this.start(['followUp']);
  yield this.start(['runDevServers']);
};


/** @desc Make production build */

expose.build = function* build() {
  yield this.start(['clear', 'lint', 'test']);
  yield this.start(['compileProdBuild']);
  yield this.start(['followUp']);
};


/** @desc Start production servers with production build */

expose.tryBuild = function* tryBuild() {
  yield this.start(['clear', 'lint', 'test']);
  yield this.start(['compileProdBuild']);
  yield this.start(['followUp']);
  yield this.start(['runProdServers']);
};


/* ======= Tasks */

/** @desc Clear `/build` & `/public` folders */

expose.clear = function* clear() {
  yield this.clear('build', 'public');
};


/** @desc Run tests */

expose.test = function* test() {
  yield this.run('scripts/test');
};


/** @desc Run linters */

expose.lint = function* lint() {
  yield this.run('scripts/lint');
};


/** @desc Run hot reloadable development server and development build */

expose.runDevBuild = function* runDevBuild() {
  yield this.run('mkdir -p public/assets', { method: 'exec' });
  yield this.run('server.dev.js', { method: 'fork', resolveOn: 'message' });
  yield this.compileAndWatch(wpServerConfig);
};


/** @desc Compile production build */

expose.compileProdBuild = function* compileProdBuild() {
  yield this.run('mkdir -p public/assets', { method: 'exec' });
  yield this.compile(wpClientConfig);
  yield this.compile(wpServerConfig);
};


/** @desc Run reloadable development servers with development build */

expose.runDevServers = function* runDevServers() {
  const servers = this.getServers({ hot: true });
  yield this.runAsync(servers);
};


/** @desc Run production servers with production build */

expose.runProdServers = function* runProdServers() {
  const servers = this.getServers();
  yield this.runAsync(servers);
};


/** @desc Perform follow-up operations after build */

expose.followUp = function* followUp() {
  yield this.copy([{
    target: 'app/assets/root/.',
    dest  : 'public/',
  }]);
  yield this.move([{
    target: 'build/*.ico build/*.png',
    dest  : 'public/assets/',
  }]);
};
