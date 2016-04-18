import yeoman                  from 'yeoman-generator';

import deps                    from './deps/deps';
import devDeps                 from './deps/devDeps';

import mainPrompts             from './prompts/main';
import repoPrompts             from './prompts/repo';
import pushPrompt              from './prompts/push';

import * as commonActions      from './actions/common';
import * as frontendAppActions from './actions/frontendApp';
import * as railsApiActions    from './actions/railsApi';

import scaffoldRoots           from './writings/scaffoldRoots';
import scaffoldFrontendApp     from './writings/scaffoldFrontendApp';
import scaffoldRailsApi        from './writings/scaffoldRailsApi';
import allDone                 from './writings/allDone';

import * as utils              from './utils';
import * as instanceUtils      from './utils/instance';


class FluxOnRailsGenerator extends yeoman.Base {

  constructor(...args) {
    super(...args);

    this.npmDeps    = deps;
    this.npmDevDeps = devDeps;

    for (const method of Object.keys(instanceUtils)) {
      this[method] = instanceUtils[method].bind(this);
    }

    this.commonActions      = utils.bindToContext(this, commonActions);
    this.frontendAppActions = utils.bindToContext(this, frontendAppActions);
    this.railsApiActions    = utils.bindToContext(this, railsApiActions);
  }

  mainPrompts() {
    mainPrompts.call(this);
  }

  repoPrompts() {
    repoPrompts.call(this);
  }

  pushPrompt() {
    pushPrompt.call(this);
  }

  get writing() {
    return {
      scaffoldRoots,
      scaffoldFrontendApp,
      scaffoldRailsApi,
      allDone,
    };
  }

}

module.exports = FluxOnRailsGenerator;
