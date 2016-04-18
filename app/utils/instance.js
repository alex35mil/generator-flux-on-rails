import fs    from 'fs';
import path  from 'path';
import shell from 'shelljs';
import ejs   from 'ejs';

import * as say from './say';

const DONE = '✓ ';
const UTF8 = 'utf8';

export function shellExec(cmd) {
  say.cmd(cmd);
  shell.exec(cmd);
  console.log('Completed.');
}


export function rvmExec(cmd) {
  this.shellExec(this.rvmString + cmd);
}


export function render(src, dest, params = {}) {
  const output = ejs.render(this.read(this.templatePath(src)), params);
  fs.writeFileSync(this.destinationPath(dest), output);
  say.status(dest, DONE);
}


export function copy(src, dest, show) {
  shell.cp('-Rf', this.templatePath(src), this.destinationPath(dest));
  say.status(show || dest, DONE);
}


export function injectInto(file, baseString, addString, readFromFile) {
  const injectant = (
    readFromFile
    ? fs.readFileSync(this.templatePath(addString))
    : addString
  );

  const content = (
    fs
      .readFileSync(path.resolve(file), UTF8)
      .replace(
        `${baseString}\n`,
        `${baseString}\n\n${injectant}\n\n`
      )
  );

  fs.writeFileSync(this.destinationPath(file), content);
  say.status(file, DONE);
}
