export default function repoPrompts() {
  const done = this.async();

  if (this.configRepo) {
    const prompts = [
      {
        type   : 'list',
        name   : 'repo',
        message: 'Github or Bitbucket?',
        default: 0,
        choices: [
          {
            name : 'Github',
            value: 'github',
          },
          {
            name : 'Bitbucket',
            value: 'bitbucket',
          },
        ],
      },
      {
        type   : 'input',
        name   : 'repoUser',
        message: 'Your username:',
      },
    ];

    return this.prompt(prompts, props => {
      const { appName, apiName } = this;

      this.repo = props.repo;

      if (this.repo === 'github') {
        this.repoUser = props.repoUser || 'alexfedoseev';

        const { repoUser } = this;

        this.repoAppUrl = `https://github.com/${repoUser}/${appName}`;
        this.repoApiUrl = `https://github.com/${repoUser}/${apiName}`;
        this.repoAppSsh = `git@github.com:${repoUser}/${appName}.git`;
        this.repoApiSsh = `git@github.com:${repoUser}/${apiName}.git`;
      } else {
        this.repoUser = props.repoUser || 'alex_fedoseev';

        const { repoUser } = this;

        this.repoAppUrl = `https://bitbucket.org/${repoUser}/${appName}`;
        this.repoApiUrl = `https://bitbucket.org/${repoUser}/${apiName}`;
        this.repoAppSsh = `git@bitbucket.org:${repoUser}/${appName}.git`;
        this.repoApiSsh = `git@bitbucket.org:${repoUser}/${apiName}.git`;
      }

      return done();
    });
  }

  return done();
}
