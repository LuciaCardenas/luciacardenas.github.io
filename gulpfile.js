var gulp = require('gulp'),
  image = require('gulp-image');
var sass = require('gulp-sass');
var purify = require('gulp-purifycss');
var replace = require('gulp-replace');
let cleanCSS = require('gulp-clean-css');
var responsive = require('gulp-responsive');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
 
gulp.task('replace', function(){
  gulp.src(['./_posts/**.md'])
    // See http://mdn.io/string.replace#Specifying_a_string_as_a_parameter
    //.pipe(replace(/\/images\//gm, '/assets/img/'))
    .pipe(replace(/figure:/gm, 'image:'))
    .pipe(gulp.dest('_posts/'));
});

gulp.task('responsive', function () {
  return gulp.src('./assets/img/**/{main.png,main.jpg}')
    .pipe(responsive({
      //'*/main.jpg': {
      //  // Resize all JPG images to 200 pixels wide
      //  width: 200,
      //},
      //'*/main.png': {
      //  // Resize all PNG images to 50% of original pixels wide
      //  width: '50%',
      //},
      // Resize all images to 100 pixels wide and add suffix -thumbnail
      '*/main.{jpg,png}': {
        width: 300,
        height: 200,
        rename: { suffix: '-crop' },
      },
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
    .pipe(gulp.dest('./assets/img'));
});

gulp.task('image', function () {
  gulp.src('./assets/images/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest('./assets/images/'));
});

gulp.task('sass', function () {
  return gulp.src('./_sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/dist'));
});

// purify removes unused CSS classes
gulp.task('purify', ['sass'],  function() {
  return gulp.src('./assets/css/dist/main.css')
    .pipe(purify(['./_includes/**.html', './_layouts/**.html', './_pages/**.html', './blog/**.html'], {info: true}))
    .pipe(replace(/!important/gm, ''))
    .pipe(gulp.dest('./assets/css/dist'));
});
 
gulp.task('concat', ['purify'], function() {
  return gulp.src(['./assets/css/dist/main.css', './assets/css/syntax.css'])
    .pipe(concat('main.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({ suffix: '-min' }))
    .pipe(gulp.dest('./_includes/'));
});

gulp.task("watch", ["purify", "sass", "concat"], function() {
  gulp.watch(["./_sass/main.scss", "./_sass/_variables.scss"], ["sass", "purify", "concat"])
  gulp.watch(["./_pages/**", "./_layouts/**", "./_includes/**.html", "./blog/*"], ["purify"]);
})

gulp.task('default', ['watch'], function(){});
