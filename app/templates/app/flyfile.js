import wpClientConfig from './configs/build/webpack.client.prod.config.babel';
import wpServerConfig from './configs/build/webpack.server.config.babel';


/* ======= Sets */

export default async function() {

  /** @desc Compile production build */

  await this.start('runDevEnv');

}


export async function runDevEnv() {

  /** @desc Start development servers with development build */

  await this.start(['clear', 'lint', 'test']);
  await this.start(['runDevBuild']);
  await this.start(['followUp']);
  await this.start(['runDevServers']);

}


export async function build() {

  /** @desc Make production build */

  await this.start(['clear', 'lint', 'test']);
  await this.start(['compileProdBuild']);
  await this.start(['followUp']);

}


export async function tryBuild() {

  /** @desc Start production servers with production build */

  await this.start(['clear', 'lint', 'test']);
  await this.start(['compileProdBuild']);
  await this.start(['followUp']);
  await this.start(['runProdServers']);

}


/* ======= Tasks */

export async function clear() {

  /** @desc Clear `/build` & `/public` folders */

  await this.clear('build', 'public');

}


export async function test() {

  /** @desc Run tests */

  await this.run('scripts/test');

}


export async function lint() {

  /** @desc Run linters */

  await this.run('scripts/lint');

}


export async function runDevBuild() {

  /** @desc Run hot reloadable development server and development build */

  await this.run('mkdir -p public/assets', { method: 'exec' });
  await this.run('server.dev.js', { method: 'fork', resolveOn: 'message' });
  await this.compileAndWatch(wpServerConfig);

}


export async function compileProdBuild() {

  /** @desc Compile production build */

  await this.run('mkdir -p public/assets', { method: 'exec' });
  await this.compile(wpClientConfig);
  await this.compile(wpServerConfig);

}


export async function runDevServers() {

  /** @desc Run reloadable development servers with development build */

  const servers = this.getServers({ hot: true });

  await this.runAsync(servers);

}


export async function runProdServers() {

  /** @desc Run production servers with production build */

  const servers = this.getServers();

  await this.runAsync(servers);

}


export async function followUp() {

  /** @desc Perform follow-up operations after build */

  await this.copy([{
    target: 'app/assets/root/.',
    dest  : 'public/',
  }]);
  await this.move([{
    target: 'build/*.ico build/*.png',
    dest  : 'public/assets/',
  }]);

}
