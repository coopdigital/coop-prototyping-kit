'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const include = require('gulp-include');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const spawn = require('child_process').spawn;

/**
 * Settings
 */
const src = 'src/';
const dest = 'build/';
 
const src_paths = {
  css: src + '_css/**/*.{pcss,css}',
  temp: src + 'temp/**/*',
  scripts: src + '_js/*.js',
  assets: [
    src + '_assets/**/*'
  ],
  html: src + '**/*.html'
};

const dest_paths = {
  styles: dest + 'assets/css',
  scripts: dest + 'assets/js',
  assets: dest + 'assets'
};

const settings = {
  css: {
    outputStyle: 'compressed',
  },
  include: {
    includePaths: [
      __dirname + '/node_modules',
      __dirname + '/src/_js',
    ]
  }
};


/**
 * Lint tasks
 */
function lintjs() {
  return gulp.src([
    src_paths.scripts,
    '!' + src + '_js/vendor'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}


/**
 * Build tasks
 */

// Jekyll
function jekyll(gulpCallBack) {
  const jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', cwd: 'src'});
  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
}

function html() {
  return gulp
    .src(dest + '**/*.html')
    .pipe(connect.reload());
}

// Styles
function css() {
  return gulp.src(src_paths.css, { follow: true })
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(dest_paths.styles))
    .pipe(connect.reload());
}

// Scripts
function js() {
  return gulp.src(src_paths.scripts, { follow: true })
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(include(settings.include))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(dest_paths.scripts))
    .pipe(connect.reload());
}

function vendorjs() {
  return gulp
    .src([src + '_js/vendor/**/*'])
    .pipe(gulp.dest(dest_paths.scripts + '/vendor'));
}

// Static assets
function assets() {
  return gulp
    .src(src_paths.assets)
    .pipe(gulp.dest(dest_paths.assets))
    .pipe(connect.reload());
}

function optimiseImages() {
  return gulp
    .src(dest_paths.assets + '/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(dest_paths.assets + '/images'));
}


/**
 * Watch tasks
 */
function watch(done) {
  gulp.watch(['src/_css/**/**.{pcss,css}'], css);
  gulp.watch(src_paths.scripts, gulp.series(lintjs, js));
  gulp.watch(src_paths.assets, optimiseImages);
  gulp.watch(src_paths.html, gulp.series(jekyll, html));
  done();
}


/**
 * Local server
 */
function serve(done) {
  connect.server({
    port: 9000,
    root: 'build',
    livereload: true
  });
  done();
}

/**
 * Run tasks
 */
const build = gulp.parallel(gulp.series(jekyll), css, vendorjs, gulp.series(lintjs, js), gulp.series(assets, optimiseImages));
const server = gulp.series(build, serve, watch);


module.exports = {
  jekyll,
  css,
  vendorjs,
  lintjs,
  js,
  assets,
  optimiseImages,
  build,
  server,
  default: server
};