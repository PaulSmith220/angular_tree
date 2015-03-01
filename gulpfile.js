'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),// Плагин, позволяющий импортировать файлы кострукцией "//= pathToFile"
    rimraf = require('rimraf'),
    connect = require('gulp-connect'),
    opn = require('opn');


var path = {
    // Путь для файлов, прошедших сборку
    build: {
        html: 'build/',
        js: 'build/scripts/',
        css: 'build/styles/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        templates: 'build/templates/'
    },
    // Откуда брать исходные файлы
    src: {
        html: 'src/*.html',
        js: 'src/scripts/*.js',
        style: 'src/styles/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        templates: 'src/templates/*.html'
    },
    // Назначаем пересборку при изменении указанных файлов
    watch: {
        html: 'src/**/*.html',
        js: 'src/scripts/**/*.js',
        style: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

// Сервер
var server = {
    host: 'localhost',
    port: '9000'
};

/////////////////////////////////////////////////////////////////
gulp.task('clean', function () {
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
});

gulp.task('server', function() {
    connect.server({
        host: server.host,
        port: server.port,
        livereload: true
    });
});

gulp.task('browser', function() {
    opn( 'http://' + server.host + ':' + server.port + '/build' );
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
});

gulp.task('templates', function () {
    gulp.src(path.src.templates)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.templates))
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

gulp.task('img', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
///////////////////////////////////////////////////

gulp.task('build', [
    'html',
    'templates',
    'scripts',
    'styles',
    'fonts',
    'img'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('templates');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('styles');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('scripts');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});


gulp.task('default', ['build', 'server', 'watch', 'browser']);