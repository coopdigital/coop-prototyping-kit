var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var include = require('gulp-include');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');


/**
 * Settings
 */
var src = 'src/';
var dest = 'build/';

var src_paths = {
  styles: src + '_css/**/*.scss',
  scripts: src + '_js/**/*.js',
  assets: [
    src + '_assets/**/*',
    'node_modules/coop-frontend-toolkit/static/**/*'
  ],
  html: src + '**/*.html'
};

var dest_paths = {
  styles: dest + 'assets/css',
  scripts: dest + 'assets/js',
  assets: dest + 'assets'
};

var settings = {
  sass: {
    outputStyle: 'compressed',
    includePaths: [
      'node_modules/coop-frontend-toolkit/styles/',
      src + 'src/css'
    ]
  },
  autoprefixer: {
    browsers: ['> 5%', 'last 2 versions']
  }
};



/**
 * Lint tasks
 */
gulp.task('lintjs', function() {
  gulp.src(src_paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('lintscss', function() {
  gulp.src(src_paths.styles)
    .pipe(scsslint());
});


/**
 * Build tasks
 */

// Jekyll
gulp.task('html', ['jekyll'], function() {
  gulp.src(dest + '**/*.html')
    .pipe(connect.reload());
});
gulp.task('jekyll', function (gulpCallBack){
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', cwd: 'src'});

  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
});

// Styles
gulp.task('css', ['lintscss'], function() {
  gulp.src(src_paths.styles)
    .pipe(sourcemaps.init())
      .pipe(sass(settings.sass))
      .on('error', sass.logError)
      .pipe(autoprefixer(settings.autoprefixer))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(dest_paths.styles))
    .pipe(connect.reload());
});

// Scripts
gulp.task('js', ['lintjs'], function() {
  gulp.src(src_paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(concat('main.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(dest_paths.scripts))
    .pipe(connect.reload());
});

// Static assets
gulp.task('assets', function() {
  gulp.src(src_paths.assets)
    .pipe(gulp.dest(dest_paths.assets))
    .pipe(connect.reload());
});


/**
 * Tests
 */
gulp.task('testjs', function() {
  gulp.src('test.js')
    .pipe(mocha());
});



/**
 * Watch tasks
 */
gulp.task('watch', function() {
  gulp.watch(src_paths.styles, ['lintscss', 'css']);
  gulp.watch(src_paths.scripts, ['lintjs', 'js']);
  gulp.watch(src_paths.assets, ['assets']);
  gulp.watch([src_paths.html, src + '_config.yml'], ['html']);
});


/**
 * Local server
 */
gulp.task('connect', function() {
  connect.server({
    port: 9000,
    root: 'build',
    livereload: true,
    middleware: function(connect, opt) {
		return [
			function(req, res, next){
				// treat POST request like GET during dev
				req.method = 'GET';
				return next();
			}
		];
	},
  });
});

/**
 * Run tasks
 */
gulp.task('test', ['testjs']);
gulp.task('build', ['html', 'css', 'js', 'assets']);
gulp.task('server', ['build', 'watch', 'connect']);

gulp.task('default', ['server']);
