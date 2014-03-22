---
layout: post
title: Getting started with gulp.js
tags: [js]
---

[gulp.js](http://gulpjs.com) is a 'streaming build system' for javascript.
It is an incredibly elegant alternative to `grunt`. The entire API is composed
of just 5 functions, `task`, `src`, `pipe`, `dest` and `watch`.

Since a `gulpfile` usually speaks for itself, here is the one I put together for
`talaria` (I did add some comments):

{% highlight js %}
// start out by importing gulp and any plugins we might need
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var jshint = require('gulp-jshint');

// 'default' is the task that gulp executes when called without arguments.
// The second argument specifies a list of dependencies - tasks that are run
// before we can run the called task ('default' in this case).
// Note that this is an empty task, it has no functionality of its own, just
// dependencies upon other tasks.
gulp.task('default', ['compress', 'copy', 'sass']);

// As with build tools, you can call all tasks by name, so `gulp watch` with
// call the 'watch' task.
gulp.task('watch', function() {
    // `watch` is a (blocking) task that will execute other tasks each time a
    // watched file changes.
    gulp.watch('./src/*.js', ['lint']);
})

gulp.task('sass', function() {
    // `src` takes a path spec and creates a stream of its contents for
    // processing.
    gulp.src('./src/*.scss')
         // `pipe` takes said stream and does something useful with it.
         // Here we pass it to sass to compile it.
        .pipe(sass({compass: true}))
        // `dest` takes a stream and emits it to the path (which is ALWAYS a
        // directory!).
        // This might seem inconvenient, but makes total sense, since we are
        // dealing with streams (which can be made up of arbitrary files)
        // Neatly, `dest` actually re-emits its input, so it can be chained
        // indefinitely.
        .pipe(gulp.dest('./src'));
    gulp.src('./src/*.scss')
        .pipe(sass({compass: true, style: 'compressed'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compress', function() {
    gulp.src('./src/talaria.js')
        // gulp-rename allows us to run a transformation over the input
        // stream, so that we can change file names before further processing
        // of the stream.
        // This is the simplest form: using a single file as input and
        // 'hard-coding' the target name.
        .pipe(rename('talaria.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('./dist'));
});

// This task is actually a little overkill, since it could just as well have
// been a part of the 'compress' task, by simply having the call to
// `.pipe(gulp.dest('./dist'))` before the `rename` call. However,
// even if more verbose, I find this more readable.
gulp.task('copy', function() {
    gulp.src('./src/talaria.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function() {
    gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
{% endhighlight %}

`gulp` comes with a comprehensive documentation and its plugin repository is
growing by the minute. I highly recommend you give it a try.
