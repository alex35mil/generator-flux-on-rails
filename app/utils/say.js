import chalk from 'chalk';

const POINTER = '----> ';
const TAB     = '      ';

export function section(msg) {
  console.log('\n\n\n' + chalk.black.bgGreen(POINTER + msg));
}

export function info(msg) {
  console.log('\n\n' + chalk.yellow(POINTER + msg));
}

export function cmd(command) {
  console.log('\n' + chalk.green('$ ' + command));
}

export function status(item, icon) {
  console.log(TAB + chalk.green(icon + ' ') + item);
}

export function plain(msg) {
  console.log(TAB + msg);
}
