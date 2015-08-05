# generator-flux-on-rails

Scaffolder of isomorphic/universal Flux app, backed by Rails API.

[**LIVE DEMO APP**](http://isomorphic-comments.alexfedoseev.com)  |  App sources: [Flux App](https://github.com/alexfedoseev/isomorphic-comments-app) & [Rails API](https://github.com/alexfedoseev/isomorphic-comments-api)  


What you'll get with just a few lines in console.

* Isomorphic/universal SPA based on Flux architecture
* Running on latest versions of `redux` and `react-router`
* Written on ES6/ES2015 (transpiled by Babel)
* Multiple bundles ready
* Simple authentication mechanism
* `<head>` generation and `<title>` updater
* Development and production builds (using `webpack` & `gulp`)
* Hot reloading in development
* Google Analytics helpers
* Rails API — up and running
* Deployment scripts for Flux app and Rails API (using `mina`)

If you don't use Rails, you can skip its setup and use whatever JSON API back-end you like. For the Flux app it's just a JSON API somewhere in the outer space.

For further details please follow up this [series of posts @medium](https://medium.com/@alexfedoseev/isomorphic-react-with-rails-part-i-440754e82a59)  

### Technologies used

#### Flux app

* **React @ 0.13.3**
* **Redux @ 1.0.0-rc** as Flux implementation
* **React Router @ 1.0.0-beta3** as... Router
* **Express @ 4.x** as front-end framework
* **Jade @ 1.x** as template engine
* **Stylus** as css preprocessor
* **Babel** as ES6 -> ES5 transpiler
* **Webpack** as assets bundler
* **Gulp** as build engine
* **Eslint** as js linter
* **Node** as is

#### Rails API

* **Rails @ 4.x** as back-end framework
* **rails_api gem** as rails-json-api maker
* **Devise** (with **simple_token_authentication** gem) as authentication engine
* **Postgres** as database
* **RVM** as rubies manager
* **Unicorn** as production server

And

* **Mina** as deploy engine
* **Nginx** as front-end server

**Node** & **NPM** are required for Flux app.  
**RVM**, **Ruby** & **Postgres** are required for Rails API.  
**Nginx** is required for both.  

_Why we need **Nginx** on localhost — read in my [post on @medium](https://medium.com/@alexfedoseev/isomorphic-react-with-rails-part-i-440754e82a59)_.


> **This generator will install latest versions of dependencies, so if some npm package or ruby gem will be updated to the next major version (and there will be breaking changes in its API) — something can be broken after installation. I think on the project's creation stage it's better to get an error and update code base to start with the newest available versions of libs, rather than locking dependencies and use outdated packages at the beginning. If you'll face such case, please let me know via issue or pull request. Thanks!**


## Getting Started

Let's create an app called `my-blog`.

This generator will scaffold 2 separate repos:

* Flux app
* Rails API

In case you don't have `yo`:

```bash
npm install -g yo
```

Get `generator`:

```bash
npm install -g generator-flux-on-rails
```

Make sure **Postgres** is up and running (if you plan to install Rails API) and initiate scaffolder:

```bash
yo flux-on-rails

# or specify name right here
yo flux-on-rails my-blog
```

`myBlog` or `my_blog` will be converted to `my-blog` for consistency.

Before scaffolder start process, you have to answer following questions:

![Installation](https://cloud.githubusercontent.com/assets/4244251/8851727/fdf2c280-3159-11e5-9754-6d6226fc28dc.png)

* **Enter app name:**  
Specify app's name. Or hit `Enter` if you've already done this within `yo` command.
* **Choose parts to install:**  
Choose which parts of app you want to install — Node app & Rails API. Press `space` to toggle.
* **Configure remote repo on Github / Bitbucket?**  
Generator can configure for you remote repo on Github / Bitbucket. Hit `Enter` to accept it. If you'll choose `no`, scaffolder will start his work.
* **Github or Bitbucket?**  
Choose one with arrows keys.
* **Your username:**  
Your account on chosen service.
* **Push first commit to remote?**  
It can push first commit to remote for you. If you'll choose `yes`, check that you've created 2 repos on chosen service:
  * Node app repo:  `git@github.com:username/my-blog-app.git`
  * Rails app repo: `git@github.com:username/my-blog-api.git`


After scaffolding is done, 2 repos will be created:

```bash
|- /my-blog
    |- /my-blog-api    # <------- Rails API
    |- /my-blog-app    # <------- Node app
```

Before we'll spin up these apps, setup your localhost environment. As a result our Flux app will be available at `http://lvh.me` and our Rails API will be available at `http://api.lvh.me`.

* Install and setup **Nginx** ([it's really easy](https://coderwall.com/p/dgwwuq/installing-nginx-in-mac-os-x-maverick-with-homebrew)).
* Add `lvh.me` & `api.lvh.me` to your **hosts** file to get rid of unnecessary roundtrips (`lvh.me` already points to `localhost`, but browser have to make roundtrip to DNS servers to get that).

Here is [the gist with my local configs](https://gist.github.com/alexfedoseev/43fcaf1975768606458a).

### Spinning up Rails API

Navigate to project folder:

```
cd my-blog/my-blog-api
```

We need to create `users` table in database, so Devise can handle users authentication.

* Check migration at `db/migrate/XXXXXXXXXXXXXX_devise_create_users.rb`
* Configure it and run the migration.

```
rake db:migrate
```

Now we can start local Rails server:

```
bin/rails s
```

To create a `User`, make `POST` request to `/signup` path, smth like this:

```
curl http://api.lvh.me/signup \
-X POST \
-H 'Content-type: application/json' \
-d '{"api_user":{"email":"some@email.com", "password":"123456789"}}'
```

And we're done.

### Spinning up Flux app

Navigate to project folder:

```
cd my-blog/my-blog-app
```

Run dev server with hot reloading:

```
npm start
```

Point your browser to `http://lvh.me`. That's all!

Also:

```bash
# to start local server with production assets
npm run prod

# to compile production assets before deploy
npm run build
# or just
gulp

```

Further details about Flux app, Rails API, authentication and deployment I'll cover in this [series of posts @medium](https://medium.com/@alexfedoseev/isomorphic-react-with-rails-part-i-440754e82a59).

If you'll find any errors or have a suggestions — issues and PRs are absolutely welcome.
Special thanks to those who'll correct the grammar issues in this README.


## TODO

* **[Flux]** Add tests
* **[Flux]** Remove `/public` stuff out of repo + symlink it to shared folder on production
* **[Flux]** Improve error handling
* **[Flux]** Add `immutable.js`
* **[Flux]** Add `redux-devtools`
* ~~**[Flux]** Rewrite `meta` generator: class -> function~~
* **[Flux]** Add notifications from webpack server
* **[Flux]** Add server-side retina detection
* **[Flux]** Add I18n
* **[Flux, Rails]** Switch to JWT authentication

## Thanks

* [**@gaearon**](https://github.com/gaearon) for `redux` — awesome flux implementation
* [**@mjackson**](https://github.com/mjackson) & [**@ryanflorence**](https://github.com/ryanflorence) for wonderful `react-router`
* [**@erikras**](https://github.com/erikras) & [**@quangbuule**](https://github.com/quangbuule) for great `redux` examples
* [**Rails team**](https://github.com/rails) for the best backend framework ever.
* And all the OS contributors, who made the stuff from `Gemfile` & `project.json`.

## License

It's MIT.
