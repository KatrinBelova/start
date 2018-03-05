const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');


gulp.task('views', function () {
	return gulp.src('./src/index.pug')
		.pipe(pug())
		.on('error', function(error) {
     		gutil.log(gutil.colors.red('Error: ' + error.message));
     		this.emit('end');
  		});
		.pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
	gulp.watch('./src/index.pug', gulp.series('views'));
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
	'views'
));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel(
		'serve',
		'watch'
)));



