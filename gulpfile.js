var gulp          = require('gulp'),
    livereload    = require('gulp-livereload'),
    watch         = require('gulp-watch'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    filesize      = require('gulp-filesize'),
    sourcemaps    = require('gulp-sourcemaps'),
    istanbul      = require('gulp-istanbul'),
    mocha         = require('gulp-mocha'),
    exit          = require('gulp-exit');

gulp.task('css', function() {
    return gulp.src('public/css/*.css')
        .pipe(watch('public/css/*.css'))
        .pipe(livereload());
});

gulp.task('js', function() {
    return gulp.src('public/js/**/*.js')
        .pipe(watch('public/js/**/*.js'))
        .pipe(livereload());
});

gulp.task('html', function() {
    return gulp.src('public/partial/*.html')
        .pipe(watch('public/partial/*.html'))
        .pipe(livereload());
});

gulp.task('compress', function() {
    gulp.src('public/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'))
        .pipe(filesize());

    gulp.src(['public/partial/*.html', '!public/partial/ad-*.html'])
        .pipe(gulp.dest('public/dist'));
});

gulp.task('develop', function() {

    // not a good way but gulp-nodemon sucks xD
    var nodemon = require('nodemon');
    nodemon({
        script: 'bin/babel.server',
        ext: 'js json'
    });

    nodemon.on('start', function() {
        console.log('App has started');
    }).on('quit', function() {
        console.log('App has quit');
    }).on('restart', function(files) {
        console.log('App restarted due to: ', files);
    });
});

gulp.task('coverage', function() {
    return gulp.src(['models/**/*.js', 'routes/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('coverage:clean', function(callback) {
    del(['coverage/**/*'], callback);
});

function mochaStream() {
    return gulp.src('tests/index.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec'
        }));
}

gulp.task('mocha', ['coverage'], function() {
    return mochaStream()
        .pipe(istanbul.writeReports())
        .pipe(exit());
});

gulp.task('mocha:nocov', function() {
    return mochaStream()
        .pipe(exit());
});

gulp.task('test', ['mocha']);
gulp.task('default', ['develop', 'css', 'html', 'js']);
gulp.task('build', ['compress']);