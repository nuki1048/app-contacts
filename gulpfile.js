const gulp = require("gulp"),
  less = require("gulp-less"),
  sass = require("gulp-sass")(require("sass")),
  del = require("del"),
  rename = require("gulp-rename"),
  cleanCSS = require("gulp-clean-css"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  newer = require("gulp-newer"),
  imagemin = require("gulp-imagemin"),
  mozjpeg = require("imagemin-mozjpeg"),
  optipng = require("imagemin-optipng"),
  htmlmin = require("gulp-htmlmin"),
  size = require("gulp-size"),
  gulpts = require("gulp"),
  ts = require("gulp-typescript"),
  browsersync = require("browser-sync").create();

const paths = {
  html: {
    src: "src/*.html",
    dest: "dist",
  },
  styles: {
    src: ["src/sass/**/*.+(scss|sass)"],
    dest: "dist/css/",
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js/",
  },
  images: {
    src: "src/img/**",
    dest: "dist/img",
  },
  icons: {
    src: "src/icons/**/*",
    dest: "dist/icons",
  },
  fonts: {
    src: "src/fonts/**/*",
    dest: "dist/fonts",
  },
};

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

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(newer(paths.scripts.dest))
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      }) // Настройка под другие стандарти
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      }) // Отображение размера сжатого файла
    )

    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream());
} // Задача для обработки скриптов

function icons() {
  return gulp.src(paths.icons.src).pipe(gulp.dest(paths.icons.dest));
} // Задача на перенос иконок в dist

function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

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
  gulp.watch(paths.scripts.src, scripts).on("change", browsersync.reload);
  gulp.watch(paths.images.src, img);
} // Задача для слежки файлов на изменение

// Запускаються все задачи
const build = gulp.series(
  clean,
  html,
  gulp.parallel(styles, scripts, img, icons, fonts),
  watch
);

// Можно так-же запустить по отдельности каждий таск
exports.icons = icons;
exports.fonts = fonts;
exports.img = img;
exports.html = html;
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
