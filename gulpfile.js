const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');


gulp.task('views', function () {
	return gulp.src('./src/index.pug')
		.pipe(pug())
		.on('error', function(error) {
			gutil.log(gutil.colors.red('Error: ' + error.message));
			this.emit('end');
		});
		.pipe(gulp.dest('./public'));
});

gulp.task('styles', function () {
	return gulp.src(['src/sass/**/*.sass','src/sass/**/*.scss'])
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream: true}))
});
// outputStyle: nested, compact, expanded, compressed

gulp.task('watch', function () {
	gulp.watch('./src/index.pug', gulp.series('views'));
	gulp.watch(['src/sass/**/*.sass','src/sass/**/*.scss'], gulp.series('styles'))
});

gulp.task('serve', function () {
	browserSync.init({
		server: './public',
		port: 8080
});

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('./public')
});

gulp.task('build', gulp.series(
	'clean',
	'views',
	'styles'
));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel(
		'serve',
		'watch'
)));



