import gulp         from 'gulp';
import webpack      from 'webpack';
import eslint       from 'eslint/lib/cli';
import run          from 'run-sequence';
import gutil        from 'gulp-util';
import changed      from 'gulp-changed';
import gulpif       from 'gulp-if';
import imagemin     from 'gulp-imagemin';
import { exec }     from 'child_process';
import del          from 'del';

import gulpConfig   from './build/gulp.config';


const prodBuildTask   = 'build';
const startDevTask    = 'start:dev';
const startProdTask   = 'start:prod';
const isDevBuild      = process.argv.indexOf(startDevTask) !== -1;
const startTask       = isDevBuild ? startDevTask : prodBuildTask;

const config          = gulpConfig(isDevBuild);
const webpackConfig   = config.webpack.config;
const webpackCallback = config.webpack.cb;



/* Run tasks */

gulp.task('default', [startTask]);

gulp.task(prodBuildTask, done => {
  run(
    ['clean', 'lint'],
    ['bundle', 'images', 'copy'],
    done
  );
});

gulp.task(startDevTask, done => {
  run(
    ['clean', 'lint'],
    ['bundle', 'images', 'copy'],
    ['server', 'watch'],
    done
  );
});

gulp.task(startProdTask, done => {
  run(
    ['clean', 'lint'],
    ['bundle', 'images', 'copy'],
    ['server', 'watch'],
    done
  );
});



/* Node servers starter */

const startServer = (serverPath, done) => {

  const prodFlag = !isDevBuild ? 'NODE_ENV=production' : '';
  const server = exec(`NODE_PATH=. ${prodFlag} node ${serverPath}`);

  server.stdout.on('data', data => {
    if (done && data === 'Webpack: Done!') {
      done();
    } else {
      gutil.log(data.trim());
    }
  });

  server.stderr.on('data', data => {
    gutil.log(gutil.colors.red(data.trim()));
    gutil.beep();
  });

};



/* Build bundles */

gulp.task('bundle', done => {

  if (isDevBuild) {

    exec('mkdir -p public/assets');
    startServer('server.dev.js', done);

  } else {

    webpack(webpackConfig).run((err, stats) => {
      webpackCallback('build', err, stats);
      done();
    });

  }

});



/* Start express servers */

gulp.task('server', done => {

  const servers = config.server.paths;
  let queue     = servers.length;

  servers.forEach(server => {
    startServer(server);
    if (--queue === 0) done();
  });

});



/* Optimize images */

gulp.task('images', done => {

  gulp.src(config.images.src)
      .pipe(gulpif(isDevBuild, changed(config.images.dest)))
      .pipe(imagemin(config.images.imagemin))
      .pipe(gulp.dest(config.images.dest))
      .on('end', done);

});



/* Copy files to `public` */

gulp.task('copy', done => {

  const files = config.copy.files;
  let   queue = files.length;

  files.forEach(file => {
    const from = config.copy.from + file[0];
    const to   = config.copy.to + (file[1] || file[0]);
    exec(`cp -R ${from} ${to}`, err => {
      if (err) {
        gutil.log(gutil.colors.red(err));
        gutil.beep();
      }
      if (--queue === 0) done();
    });
  });

});



/* Watch statics */

gulp.task('watch', () => {

  const { files, root } = config.watch;
  const watchItems = files.map(file => root + file);

  gulp.watch(watchItems, ['copy']);

});



/* Lint scripts */

gulp.task('lint', done => {

  eslint.execute('--ext .js,.jsx .');
  done();

});



/* Clean up before build */

gulp.task('clean', done => {

  const { clean } = config;
  const items = clean.map(dir => dir + '/**/*');

  del(items).then(done);

});
