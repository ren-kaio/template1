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


gulp.task('browserSync', function() { //отслеживает изменения и обновляет страницу
    browserSync({
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
        .pipe(browserSync.reload({ // перезагрузка страницы браузера
            stream: true
        }));
});



gulp.task('useref', function() {
    return gulp.src("app/*.html")
        .pipe(gulpIf("*.js", uglify() )) // минификация js

        .pipe(gulpIf("*.css", cleanCss() )) // минификация css
        .pipe(useref()) // объединение всего css в единый файл и всего js в единый файл
        .pipe(gulp.dest('dist')); // направляем файлы в нужную директорию
});

gulp.task('img', function() {
    return gulp.src("app/img/**/*") // берем файлы из папки img
        .pipe(cache(imagemin() ) ) // минификация файлов
        .pipe(gulp.dest("dist/img")) // направляем файлы в нужную директорию
});

gulp.task('fonts', function() {
    return gulp.src("app/fonts/**/*") // берем файлы шрифтов
        .pipe(gulp.dest("dist/fonts")) // направляем файлы в нужную директорию
});

gulp.task('clean:dist', function() {
    del(['dist/**/*',  '!dist/images', '!dist/images/**/*']); // удаляем лишние промежуточные файлы, кроме изображений
});

gulp.task('clean', function() {
    del('dist'); // удаляем лишние промежуточные файлы
});

gulp.task( 'watch', ['browserSync', 'sass'], function() { //следим за изменениями в файлах и перезагружаем браузер при необходимости
        gulp.watch( 'app/sass/**/*.scss', ['sass']);
        gulp.watch('app/*.html', browserSync.reload);
        gulp.watch('app/js/**/*.js', browserSync.reload);
    }
);

gulp.task('build', function() { // сборка проекта
    runSequence( 'clean:dist',  'sass', 'useref', ['fonts', 'img'] );  // прогоняем в нужной последовательности
});
