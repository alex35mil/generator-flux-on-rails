# generator-flux-on-rails

## [ ... This Doc is Work-In-Progress ... ]

Scaffolder of isomorphic/universal Flux app, backed by Rails API.

[**DEMO APP**](http://isomorphic-comments.alexfedoseev.com)  |  Sources: [Flux App](https://github.com/alexfedoseev/isomorphic-comments-app) & [Rails API](https://github.com/alexfedoseev/isomorphic-comments-api)  


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

> **This generator will install latest versions of dependencies, so if some npm package or ruby gem will be updated to the next major version (and there will be breaking changes) — something can be broken after installation. I think on the project's creation stage it's better to get an error and update code base to start with the newest available versions of libs, rather than locking dependencies and use outdated packages at the beginning. If you'll face such case, please let me know via issue or pull request. Thanks!**

## Getting Started

This generator will create 2 apps:

* Flux app
* Rails API

Lets do it.

In case you don't have `yo`:

```bash
npm install -g yo
```

Get `generator`:

```bash
npm install -g generator-flux-on-rails
```

Initiate it:

```bash
yo flux-on-rails

# or specify name right here
yo flux-on-rails your-app-name
```

## [ ... To be continued ... ]


## TODO

* **[Flux]** Remove `/public` stuff out of repo + symlink it to shared folder on production
* **[Flux]** Improve error handling
* **[Flux]** Add `immutable.js`
* **[Flux]** Add server-side retina detection
* **[Flux]** Add I18n
* **[Flux, Rails]** Switch to JWT authentication

## License

MIT
