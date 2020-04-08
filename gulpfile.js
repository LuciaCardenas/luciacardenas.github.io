var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var purify = require('gulp-purifycss');
let cleanCSS = require('gulp-clean-css');
var responsive = require('gulp-responsive');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var gulpAmpValidator = require('gulp-amphtml-validator');

var paths = {
  styles: {
    src: '_sass/main.scss',
    dest: '_includes'
  },
  images: {
    src: 'assets/img',
    dest: 'assets/img'
  },
  html: {
    src: '_site/{index,es,fr}.html'
  }
};

function thumbnails() {
  return gulp.src(`${paths.images.src}/**/main{.png,.jpg,jpeg}`)
    .pipe(responsive({
      // Resize all images to 100 pixels wide and add suffix -thumbnail
      '*/*': {
        width: 300,
        height: 200,
        format: 'jpg',
        rename: { suffix: '-crop'},
        //crop: 'attention'
      }
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Zlib compression level of PNG output format
      compressionLevel: 6,
      // Strip all metadata
      withMetadata: false,
      crop: 'entropy'
    }))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ], {verbose: true}))
    .pipe(gulp.dest(paths.images.dest));
}


function images() {
  return gulp.src(`${paths.images.src}/**/*.{png,jpg,jpeg,gif,svg}`)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ], {verbose: true}))
    .pipe(gulp.dest(paths.images.dest))
}

function amp_validator() {
  return gulp.src(paths.html.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
}
 
function purification() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(purify(['_includes/*.html', '_layouts/*.html', 'collections/**/*.html'], {info: true}))
    .pipe(replace(/!important/gm, ''))
    .pipe(cleanCSS({compatibility: 'ie8'}, (details) => {
      console.log(`Minification of ${details.name}: ${details.stats.originalSize} -> ${details.stats.minifiedSize} b`);
    }))
    .pipe(rename({ suffix: '-min' }))
    .pipe(gulp.dest('./_includes/'));
}

function watch() {
  gulp.watch(["_layouts/*", "_includes/*.html", "_sass/*", "assets/css/*", "collections/**/*"], purification);
}
 
exports.images = images;
exports.thumbnails = thumbnails;
exports.amp_validator = amp_validator;
exports.purification = purification;
exports.watch = watch;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
