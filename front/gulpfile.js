/* jshint node: true */
var path = require('path'),

    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    util = require('gulp-util'),
    less = require('gulp-less'),
    svgstore = require('gulp-svgstore'),
    rename = require('gulp-rename'),

    broSync = require('browser-sync').create(),

    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js'),

    paths = {
        src: path.resolve(__dirname, './blocks'),
        dest: path.resolve(__dirname, '../back/app/assets')
    },

    production = util.env.stage === 'production' ? true : false;


gulp.task('js', function() {
    return gulp.src(paths.src + '/**/*.coffee')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.dest + '/javascripts/'));
});

gulp.task('css', function() {

    return gulp
        .src([
            // starting point for all @imports
            paths.src + '/page/page.less'
        ])
        .pipe(sourcemaps.init())
        .pipe(less({
            // @include paths
            paths: [path.join(__dirname), 'node_modules']
        }))
        .pipe(concat('app.css'))

        // CSS autoprefixer
        .pipe(prefix([
            '> 7%',
            'Opera > 7%',
            'Safari > 7%',
            'Firefox > 7%',
            'Explorer > 7%',
            'Chrome > 7%'
        ], {
            cascade: true
        }))

        // minify for production
        .pipe(gulpif(production, minifyCSS()))

        // add sourcemaps for developing
        .pipe(gulpif(!production, sourcemaps.write()))
        .pipe(gulp.dest(paths.dest + '/stylesheets/'))

        // for changing CSS without page refresh
        .pipe(broSync.reload({ stream: true}));

});

// SVG icons for inlining in HTML
gulp.task('icons', function() {

    return gulp.src(paths.src + '/icons/*.svg')
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('_icons.erb'))
        .pipe(gulp.dest(paths.dest + '/../views/layouts'));

});

gulp.task('watch', ['js', 'css', 'icons'], function() {

    broSync.init({
        proxy: '0.0.0.0:3000',   // rails server
        port: 8080               // cloud9 proxied port to 80
    });

    gulp.watch(paths.src + '/**/*.less', ['css']);

    gulp
        .watch(paths.src + '/**/*.coffee', ['js'])
        .on('change', broSync.reload);

    gulp
        .watch(paths.src + '/icons/*.svg', ['icons'])
        .on('change', broSync.reload);

});

gulp.task('default', ['css', 'icons', 'js']);
