/* eslint-disable no-unused-vars */
const gulp = require("gulp");
const less = require("gulp-less");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const optipng = require("imagemin-optipng");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const gulpts = require("gulp");
const ts = require("gulp-typescript");
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack-stream");
const browsersync = require("browser-sync").create();

const paths = {
   html: {
      src: "src/*.html",
      dest: "dist",
   },
   styles: {
      src: ["src/scss/**/*.+(scss|sass)"],
      dest: "dist/css/",
   },
   scripts: {
      src: "src/js/**/*.js",
      dest: "dist/js/",
   },
   images: {
      src: "src/assets/img/**/*",
      dest: "dist/img",
   },
   icons: {
      src: "src/assets/icons/**/*",
      dest: "dist/icons",
   },
   fonts: {
      src: "src/assets/fonts/**/*",
      dest: "dist/fonts",
   },
};
const dist = "./dist/";
function clean() {
   return del(["dist", "dist/img"]);
} // Задача для очистки папки dist

function html() {
   return gulp
      .src(paths.html.src)
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
         size({
            showFiles: true,
         }) // Отображение размера сжатого файла
      )
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browsersync.stream());
} // Задача на минимизацию html-кода

function styles() {
   return gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(
         autoprefixer({
            cascade: false,
         })
      )
      .pipe(
         cleanCSS({
            level: 2,
         })
      )
      .pipe(
         rename({
            basename: "main",
            suffix: ".min",
         })
      )
      .pipe(sourcemaps.write("."))
      .pipe(
         size({
            showFiles: true,
         }) // Отображение размера сжатого файла
      )
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browsersync.stream());
} // Задача для обработки styles.less(Хз нах оно мне)

// function scripts() {
//    return gulp
//       .src(paths.scripts.src)
//       .pipe(newer(paths.scripts.dest))
//       .pipe(sourcemaps.init())
//       .pipe(
//          babel({
//             presets: ["@babel/env"],
//          }) // Настройка под другие стандарти
//       )
//       .pipe(uglify())
//       .pipe(concat("main.min.js"))
//       .pipe(sourcemaps.write("."))
//       .pipe(
//          size({
//             showFiles: true,
//          }) // Отображение размера сжатого файла
//       )

//       .pipe(gulp.dest(paths.scripts.dest))
//       .pipe(browsersync.stream());
// } // Задача для обработки скриптов

function icons() {
   return gulp.src(paths.icons.src).pipe(gulp.dest(paths.icons.dest));
} // Задача на перенос иконок в dist

function fonts() {
   return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}
gulp.task("build-prod-js", () =>
   gulp
      .src("./src/js/main.js")
      .pipe(
         webpack({
            mode: "production",
            output: {
               filename: "script.js",
            },
            module: {
               rules: [
                  {
                     test: /\.m?js$/,
                     exclude: /(node_modules|bower_components)/,
                     use: {
                        loader: "babel-loader",
                        options: {
                           presets: [
                              [
                                 "@babel/preset-env",
                                 {
                                    corejs: 3,
                                    useBuiltIns: "usage",
                                 },
                              ],
                           ],
                        },
                     },
                  },
               ],
            },
         })
      )
      .pipe(gulp.dest(dist))
);

gulp.task(
   "build-js",
   () =>
      gulp
         .src("./src/js/main.js")
         .pipe(
            webpack({
               mode: "development",
               output: {
                  filename: "script.js",
               },
               watch: false,
               devtool: "source-map",
               module: {
                  rules: [
                     {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                           loader: "babel-loader",
                           options: {
                              presets: [
                                 [
                                    "@babel/preset-env",
                                    {
                                       debug: true,
                                       corejs: 3,
                                       useBuiltIns: "usage",
                                    },
                                 ],
                              ],
                           },
                        },
                     },
                  ],
               },
            })
         )
         .pipe(gulp.dest(dist))
   // .on("end", browsersync.reload)
);
function img() {
   return gulp
      .src(paths.images.src)
      .pipe(
         imagemin(
            [
               imagemin.mozjpeg({ quality: 75, progressive: true }),
               imagemin.optipng({ optimizationLevel: 3 }),
            ],
            {
               progressive: true,
            }
         ) // для jpeg i png отдельние настройки
      )
      .pipe(gulp.dest(paths.images.dest));
} // Задача на сжатие фото

function watch() {
   browsersync.init({
      server: {
         baseDir: "./dist/",
      },
   }); // Запуск сервера
   gulp.watch(paths.html.dest).on("change", browsersync.reload);
   gulp.watch(paths.html.src, html);
   gulp.watch(paths.styles.src, styles);
   gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
   gulp.watch(paths.images.src, img);
} // Задача для слежки файлов на изменение

// Запускаються все задачи
const build = gulp.series(
   // clean,
   html,
   gulp.parallel(styles, "build-js", img, icons, fonts),
   watch
);

// Можно так-же запустить по отдельности каждий таск
exports.icons = icons;
exports.fonts = fonts;
exports.img = img;
exports.html = html;
exports.clean = clean;
exports.styles = styles;
exports.scripts = "build-js";
exports.watch = watch;
exports.build = build;
exports.default = build;
