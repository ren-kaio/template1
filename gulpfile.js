let gulp = require("gulp");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let sass = require("gulp-sass");
let browserSync = require("browser-sync");
let useref = require("gulp-useref");
let gulpIf = require("gulp-if");
let imagemin = require("gulp-imagemin");
let cache = require("gulp-cache");
let cleanCss = require("gulp-clean-css");
let del = require("del");
let runSequence = require("run-sequence");
let autoprefixer = require("gulp-autoprefixer");
let ejs = require("gulp-ejs");


gulp.task('browserSync', function() { //отслеживает изменения и обновляет страницу
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss') // берем файлы *.scss из папки sass
        .pipe(sass().on('error', sass.logError)) // компилируем sass в css и отслеживаем ошибки
        .pipe(autoprefixer({ browsers: ['last 50 versions'], cascade: false }) ) // выставляем необходимые вендорные префиксы для браузеров
        .pipe(gulp.dest('app/css/'))  // направляе скомпилированные из sass css-файлы в указанную папку
        .pipe(gulp.dest('dist/css/'))  // направляе скомпилированные из sass css-файлы в указанную папку
        .pipe(browserSync.reload({ // перезагрузка страницы браузера
            stream: true
        }));
});


gulp.task('ejs', function() {
    return gulp.src('app/views/*.ejs')
        .pipe(ejs({msg:"ejs processing"}, {}, {ext:'.html'}))
        .pipe(gulp.dest('app'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ // перезагрузка страницы браузера
            stream: true
        }));
});


gulp.task('img', function() {
    return gulp.src("app/img/**/*") // берем файлы из папки img
        .pipe(cache(imagemin() ) ) // минификация файлов
        .pipe(gulp.dest("app/img")) // направляем файлы в нужную директорию
        .pipe(gulp.dest("dist/img")) // направляем файлы в нужную директорию
});

gulp.task('fonts', function() {
    return gulp.src("app/fonts/**/*") // берем файлы шрифтов
        .pipe(gulp.dest("app/fonts")) // направляем файлы в нужную директорию
        .pipe(gulp.dest("dist/fonts")) // направляем файлы в нужную директорию
});

gulp.task('clean:dist', function() {
    del(['dist/**/*', '!dist/css', '!dist/images', '!dist/images/**/*']); // удаляем лишние промежуточные файлы, кроме изображений
});

gulp.task('clean', function() {
    del('dist'); // удаляем лишние промежуточные файлы
});

gulp.task( 'watch', ['browserSync', 'sass', 'ejs'], function() { //следим за изменениями в файлах и перезагружаем браузер при необходимости
        gulp.watch( 'app/sass/**/*.scss', ['sass']);
        gulp.watch( 'app/views/**/*.ejs', ['ejs']);
        gulp.watch('app/js/**/*.js', browserSync.reload);

    }
);

gulp.task('build', function() { // сборка проекта
    runSequence( 'clean:dist',  'sass', 'ejs' , ['fonts', 'img'] );  // прогоняем в нужной последовательности
});

gulp.task('default', function() {
    runSequence( 'build',  'watch' );  // прогоняем в нужной последовательности

});