"use strict";
const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

let DIR = {
    build: './dist',
    src: './src'
};

DIR.build_css = `${DIR.build}/css`;
DIR.build_images = `${DIR.build}/images`;
DIR.build_js = `${DIR.build}/js`;

DIR.src_css = `${DIR.src}/css`;
DIR.src_images = `${DIR.src}/images`;
DIR.src_js = `${DIR.src}/js`;

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: `${DIR.build}`
        }
    });
    done();
};

function clean() {
    return del([DIR.build]);
};

function images() {
    return src([
        `${DIR.src_images}/**.*`
    ]).pipe(dest(DIR.build_images))
    .pipe(browserSync.stream());
};

function scss() {
	return src(`${DIR.src_css}/*.scss`)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(dest('./dist/css'));
};

function style() {
    return src([
        `${DIR.src_css}/*.css`, 
        'node_modules/normalize.css/normalize.css'
    ]).pipe(dest(DIR.build_css))
    .pipe(browserSync.stream());
};

function script() {
    return src([`${DIR.src_js}/**/**.js`]).pipe(dest(DIR.build_js))
    .pipe(browserSync.stream());
};

function html() {
    return src([`${DIR.src}/*.pug`])
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest(`${DIR.build}`))
        .pipe(browserSync.stream());
};

function watchFiles() {
    watch(`${DIR.src}/*.pug`, series(html, reload));
    watch(`${DIR.src_css}`, series(style, reload));
    watch(`${DIR.src_images}`, series(images, reload));
    watch(`${DIR.src_js}`, series(script, reload));
};

exports.clean = clean;
exports.html = html;
exports.images = images;
exports.scss = scss;
exports.style = style;
exports.script = script;
exports.watchFiles = watchFiles;
exports.serve = serve;
exports.default = series(clean, html, images, scss, style, script, parallel(watchFiles, serve));

// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p