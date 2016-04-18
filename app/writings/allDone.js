import * as say from '../utils/say';

export default function allDone() {
  console.log('\n\n');

  say.status('What else:', 'All done!');

  if (this.installApp) {
    say.section('Frontend App');
    say.plain('- Check app configuration.');
    say.plain('- Check deploy settings in `configs/deploy.rb` & `configs/deploy` folder.');
  }

  if (this.installApi) {
    say.section('Rails Api');
    say.plain('- Setup User:');
    say.plain('---> Check User model: `app/models/user.rb`');
    say.plain('---> Check User migration: `db/migrate/XXXXXXXXXXXXXX_devise_create_users.rb`');
    say.plain('---> Migrate: `bundle exec rake db:migrate`');
    say.plain('');
    say.plain('- Check app configuration.');
    say.plain('- Check deploy settings in `config/deploy.rb` & `lib/mina` folder.');
  }

  say.section('And...');
  say.plain('Spin it up > Check logs > Fix errors > Have fun!');

  console.log('\n\n');
}
