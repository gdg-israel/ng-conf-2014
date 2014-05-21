/* Gulpfile for NG-CON Israel Website */
/* Provides SASS + Livereload functions */
/* Copyright (C) 2014, Uri Shaked. License: ISC */

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	connectLivereload = require('connect-livereload'),
	git = require('gulp-git'),
	express = require('express');

var serverPort = 7000;
var livereloadPort = 35730;

var paths = {
	images: ['images/**/*.{svg,png,jpg}'],
	styles: ['styles/*.scss'],
	html: ['*.html']
};

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

gulp.task('default', ['serve', 'watch']);
