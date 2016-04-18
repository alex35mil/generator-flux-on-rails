import shell from 'shelljs';
import path  from 'path';

export default function scaffoldRoots() {
  shell.mkdir('-p', this.name);

  if (this.installApp) {
    shell.mkdir('-p', path.join(this.name, this.appName));
  }

  if (this.installApi) {
    shell.mkdir('-p', path.join(this.name, this.apiName));
  }
}
