var gulp         = require('gulp');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var fs           = require('fs');
var browserify   = require('browserify');
var watchify     = require('watchify');
var babelify     = require('babelify');
var rimraf       = require('rimraf');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var _            = require('lodash');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var cssnext      = require('gulp-cssnext');
var imagemin     = require('gulp-imagemin');
var modernizr    = require('gulp-modernizr');
var plumber      = require('gulp-plumber');
var order        = require('gulp-order');
var gulpSequence = require('gulp-sequence').use(gulp);
var config       = {baseUrl: './', entryFile: './src/app.js', outputDir: './dist/js/', outputFile: 'app.js'};
var bundler;

//get bundle files and set up watchify
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

//set up bundle all files
function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { 
      console.log('Error: ' + err.message); 
      // end this stream 
      // this prevents browserify to crash on compilation error
      this.emit('end');
    })
    .pipe(source(config.outputFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({stream: true}));
}

// start web server
gulp.task('browserSync', function () {
  browserSync({
    port: 7777,
    server: {
      baseDir: './'
    },
    options: {
      reloadDelay: 100
    },
    notify: true
  });
});

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

//perform build without exiting
gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

//perform build and exists pipe / stop gulp
gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

// watch task that reloads browser on js files update
gulp.task('watch', ['build-persistent'], function() {
  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});

//compiling SCSS files
gulp.task('styles', function() {
  //the initializer / master SCSS file, 
  //which will just be a file that imports everything
  return gulp.src('./styles/scss/main.scss')
              //prevent pipe breaking caused by errors from gulp plugins
              .pipe(plumber({
                errorHandler: function(err) {
                  console.log(err);
                  this.emit('end');
                }
              }))
              //get sourcemaps ready
              .pipe(sourcemaps.init())
              //include SCSS and list every 'include' folder
              .pipe(sass({
                errLogToConsole: true,
                includePaths: [
                  //'./styles/scss/'
                ]
              }))
              // cssnext also prefix the css output 
              // (compress set to false so source maps work)
              .pipe(cssnext({
                compress: true
              }))
              //catch errors
              .on('error', gutil.log)
              //the final filename of our combined css file
              .pipe(concat('styles.css'))
              //get our sources via sourcemaps
              .pipe(sourcemaps.write())
              //where to save our final, compressed css file
              .pipe(gulp.dest('./dist/css/'))
              //notify browserSync to refresh
              .pipe(browserSync.reload({stream: true}));
});

//compressing images & handle SVG files
gulp.task('images', function(tmp) {
  gulp.src(['./images/*.jpg', './images/*.png'])
    //prevent pipe breaking caused by errors from gulp plugins
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./images'));
});

//basically just keeping an eye on all HTML files
gulp.task('html', function() {
  //watch any and all HTML files and refresh when something changes
  return gulp.src('./*.html')
      .pipe(plumber())
      .pipe(browserSync.reload({stream: true}))
      //catch errors
      .on('error', gutil.log);
});

//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
//  this will:
//  startup the web server,
//  start up browserSync
//  compress all scripts and SCSS files
gulp.task('default', ['browserSync', 'build-persistent', 'watch', 'styles'], function() {
  //a list of watchers, so it will watch all of the following files waiting for changes
  gulp.watch('./styles/scss/**', ['styles']);
  gulp.watch('./images/**', ['images']);
  gulp.watch('./*.html', ['html']);

});
