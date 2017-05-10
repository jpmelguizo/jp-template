var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// BrowserSync server
gulp.task('server', ['sass', 'js'], function() {
  browserSync.init({
    open: false,
    proxy: "localhost:4567",
    // needs some delay to avoid refreshing faster than applying changes
    // still does weird stuff for some reason
    reloadDelay: 100,
    reloadDebounce: 500,
    reloadOnRestart: true,
  });

  gulp.watch('source/**/*.{erb,html,yml,md}').on('change', reload);
  gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch('source/js/**/*.js', ['js']);
});

// Compile SASS
gulp.task('sass', function () {
  return gulp
    .src('source/sass/styles.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('source/dist/css/'))
    .pipe(reload({stream: true}));
});

// Merge scripts
gulp.task('js', function() {
  return gulp
    .src('source/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('source/dist/js/'))
    .pipe(reload({stream: true}));
});

// Middleman build
gulp.task('build', ['sass', 'js'], function() {
  // does nothing, just runs sass and js tasks
});

// Middleman server
gulp.task('default', ['server']);
