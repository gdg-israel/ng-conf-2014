/* Gulpfile for NG-CON Israel Website */
/* Provides SASS + Livereload functions */
/* Copyright (C) 2014, Uri Shaked. License: ISC */

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	connectLivereload = require('connect-livereload'),
	git = require('gulp-git'),
	express = require('express');

var serverPort = process.env.GDG_DEVSERVER_PORT || 7000;
var livereloadPort = process.env.GDG_LIVERELOAD_PORT || 35730;

var paths = {
	scripts: ['js/*.js'],
	images: ['images/**/*.{svg,png,jpg}'],
	styles: ['styles/*.scss'],
	html: ['*.html']
};


gulp.task('scripts', function () {
	return gulp.src(paths.scripts)
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('sass', function () {
	gulp.src(paths.styles)
		.pipe(sass())
		.pipe(gulp.dest('styles'))
});

gulp.task('serve', ['sass'], function () {
	var server = express();
	server.use(connectLivereload({
		port: livereloadPort
	}));
	server.use(express.static('.'));
	server.listen(serverPort);
});

gulp.task('watch', function () {
	var lrserver = livereload(livereloadPort);

	gulp.watch(paths.scripts, ['scripts']);

	gulp.src(paths.styles)
		.pipe(watch())
		.pipe(sass())
		.pipe(gulp.dest('styles'))
		.pipe(lrserver);

	gulp.src([].concat(paths.images, paths.html))
		.pipe(watch())
		.pipe(lrserver);
});

gulp.task('publish', function () {
	git.push('origin', 'master:gh-pages')
		.end();
});

gulp.task('default', ['scripts', 'serve', 'watch']);
