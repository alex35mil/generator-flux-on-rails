import path from 'path';

import * as say from '../utils/say';

export default function scaffoldRailsApi() {
  if (!this.installApi) return;

  say.section('Scaffolding Rails API...');

  const { railsApiActions, commonActions } = this;
  const railsApiRoot = path.join(this.root, this.apiName);

  this.destinationRoot(this.root);
  railsApiActions.prepareEnv();
  railsApiActions.createApp();

  this.destinationRoot(railsApiRoot);
  commonActions.createRvmFiles();
  commonActions.createGitignore();
  railsApiActions.editGemfile();
  railsApiActions.installGems();
  railsApiActions.editDBConfig();
  railsApiActions.createDB();
  railsApiActions.editCore();
  railsApiActions.setupDeploy();
  railsApiActions.setupTests();
  railsApiActions.setupAuth();
  commonActions.gitInit();
  railsApiActions.gitRemote();
}
