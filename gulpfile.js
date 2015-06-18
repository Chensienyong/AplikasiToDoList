var gulp   = require('gulp'),
    server = require('gulp-express');

gulp.task('server', function () {
    server.run(['index.js']);

    gulp.watch(['src/**/*'], server.notify);
    gulp.watch(['index.js'], [server.run]);
});
