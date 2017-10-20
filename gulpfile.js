var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// BrowserSync server
gulp.task('server', ['sass', 'js'], function(gulpCallback) {
  browserSync.init({
    proxy: "localhost:4567",
    reloadDelay: 100,
    reloadDebounce: 500,
    reloadOnRestart: true,
    files: [
      "source/**/*.erb",
      "source/**/*.html",
      "source/dist/css/*.css",
      "source/dist/js/*.js", "source/dist/**/*.+(svg|jpg|jpeg|png|gif|ttf|woff|woff2|eof)"
    ]
  }, function callback() {
    gulp.watch('source/**/*.{erb,html,yml,md}').on('change', reload);
    gulp.watch('source/sass/**/*.scss', ['sass']);
    gulp.watch('source/js/**/*.js', ['js']);
    gulpCallback();
  });
});

// Compile SASS
gulp.task('sass', function () {
  return gulp
    .src('source/sass/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('source/dist/css/'));
});

// Merge scripts
gulp.task('js', function() {
  return gulp
    .src('source/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('source/dist/js/'));
});

// Middleman build
gulp.task('build', ['sass', 'js'], function() {
  // does nothing, just runs sass and js tasks
});

// Middleman server
gulp.task('default', ['server']);
