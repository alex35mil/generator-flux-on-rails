export default function pushPrompt() {
  const done = this.async();

  if (this.configRepo && this.repo) {
    const newLine = '\n    ';
    const { repoAppSsh, repoApiSsh } = this;

    let notice = newLine + 'Check that you have created:';
    if (this.installApp) notice += newLine + `Node app repo: ${repoAppSsh}`;
    if (this.installApi) notice += newLine + `Rails app repo: ${repoApiSsh}`;
    notice = newLine + notice + newLine + newLine;

    const prompt = [
      {
        type   : 'confirm',
        name   : 'pushToRemote',
        message: 'Push first commit to remote?' + notice + 'Push now?',
        default: false,
      },
    ];

    return this.prompt(prompt, props => {
      this.pushToRemote = props.pushToRemote;
      return done();
    });
  }

  return done();
}
