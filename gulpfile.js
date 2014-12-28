var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    opn = require('opn'),
    wiredep = require('wiredep').stream,
    imagemin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    spritesmith  = require('gulp.spritesmith'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade');


gulp.task('default', function () {
    gulp.start([
        'jade',
        'stylus',
        'watch',
        'dev-server'

    ]);
});
gulp.task('dev-server', function () {
    connect.server({
        root: './app',
        livereload: true
    });
    opn('http://localhost:8080/')
});

// Слежка
gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/css/*.css'], ['css']);
    gulp.watch(['./app/js/*.js'], ['js']);
    gulp.watch(['./app/jade/**/*.jade'], ['jade']);
    //gulp.watch(['./app/img/**/*.*', '!./app/img/sprite/*.*'], ['imgmin']);
    gulp.watch(['./app/img/sprite/*.*'], ['sprite']);
    gulp.watch(['./app/stylus/**/*.styl'], ['stylus']);
    gulp.watch('./bower.json', ['wiredep']);
});

// работа с bower
gulp.task('wiredep', function () {
    gulp.src('./app/jade/layout.jade')
        .pipe(wiredep({
            directory: './app/bower_components/',
            devDependencies: true,
            ignorePath: '.'
        }))
        .pipe(gulp.dest('./app/jade'));
});

// компиляция jade
gulp.task('jade', function () {
    gulp.src('./app/jade/*.jade')
        .pipe(jade(
            {pretty: true}
        ))
        .pipe(gulp.dest('./app'));
    console.log('done jade');
});

// компиляция stylus
gulp.task('stylus', function () {
    gulp.src(['./app/stylus/*.styl', '!dev/stylus/mixin/*.styl'])
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./app/css'))
});

// html
gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(connect.reload());
    console.log('done reload html');
});

// js
gulp.task('js', function () {
    gulp.src('app/js/*.js')
        .pipe(connect.reload());
    console.log('done reload js');
});

// css
gulp.task('css', function () {
    gulp.src('app/css/*.css')
        .pipe(connect.reload());
    console.log('done reload css');
});

// оптимизация изображений
gulp.task('imgmin', function () {
    gulp.src('./app/img/**/*.{png,jpg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/img'))
});
// Создание спрайта
gulp.task('sprite', function() {
    var spriteData = gulp.src('./app/img/sprite/*.*') // путь, откуда берем картинки для спрайта
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.styl',
            cssFormat: 'stylus',
            algorithm: 'binary-tree',
            cssTemplate: './app/stylus/stylus.template.mustache',
            cssVarMap: function(sprite) {
                sprite.name = 'g-' + sprite.name
            }
        }));

    spriteData.img.pipe(gulp.dest('./app/img/bg')); // путь, куда сохраняем спрайт
    spriteData.css.pipe(gulp.dest('./app/stylus/mixins/')); // путь, куда сохраняем стили
});

// Сборка проекта
gulp.task('dist', function () {
    gulp.start('copy-source');
    var assets = useref.assets();
    return gulp.src('./app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'))
});
// Сборка шрифтов и картинок
gulp.task('copy-source', function () {
    gulp.src(['./app/img/**/*.*','./app/fonts/**/*.*'], { base: './app' })
        .pipe(gulp.dest('./dist'))
});
