import path from 'path';

import * as say from '../utils/say';

export default function scaffoldFrontendApp() {
  if (!this.installApp) return;

  say.section('Scaffolding Frontend App...');

  const { frontendAppActions, commonActions } = this;
  const frontendAppRoot = path.join(this.root, this.appName);

  this.destinationRoot(frontendAppRoot);

  frontendAppActions.setupProject();
  commonActions.createRvmFiles();
  commonActions.createGitignore();
  frontendAppActions.setupDeploy();
  frontendAppActions.npmInstall();
  commonActions.gitInit();
  frontendAppActions.gitRemote();
}
