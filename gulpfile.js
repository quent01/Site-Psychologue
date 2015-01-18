
'use strict';

// Include Gulp & Tools We'll Use
var gulp	= require('gulp');
var less	= require('gulp-less');
var path	= require('path');
var rimraf	= require('gulp-rimraf');
var browserSync = require('browser-sync');
var reload	= browserSync.reload;



gulp.task('less', function () {
	gulp.src('./app/styles/less/main.less')
		.pipe(less({
			paths : ['./app/styles/less']
		}))
		.pipe(gulp.dest('app/styles/css'));
		// .pipe(browserSync.reload({stream:true})); // Make sure this is called!
});


gulp.task('clean', function(){
	return gulp.src('app/styles/css/*.css', { read: false }) // much faster
			.pipe(rimraf());
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('serve', ['less'], function () {
  browserSync({
    notify: true,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'JPS',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/less/**/*.{less,css}'], ['less', reload]);
});