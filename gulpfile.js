'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

/**
 * Copilando HTML (PUG Templat)
 */
gulp.task('html', function () {
	return gulp.src('./src/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist'))
});

/**
 * Copilando CSS
 */
gulp.task('css', function () {
	return gulp.src(['src/css/*.css', 'node_modules/materialize-css/dist/css/materialize.min.css'])
		.pipe(gulp.dest('./dist/css/'))
});

/**
 * Copilando JS
 */
gulp.task('js', function () {
	return gulp.src(['src/js/*.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/materialize-css/dist/js/materialize.min.js'])
		.pipe(gulp.dest('./dist/js/'))
});

/**
 * otimizando Imagens
 */
gulp.task('img', function () {
	return gulp.src('src/img/*.*')
		.pipe(gulp.dest('./dist/img/'))
});

/**
 * Servidor local
 */
gulp.task('serve', function () {

	browserSync.init({
		server: {
			baseDir: "./dist/"
		}
	});

	gulp.watch("src/css/*.css", ['css']);
	gulp.watch("src/js/*.js", ['js']);
	gulp.watch("src/img/*.*", ['img']);
	gulp.watch("src/*.pug", ['html']);
	gulp.watch("./dist/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', ['html', 'css', 'js', 'img', 'serve']);

// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
