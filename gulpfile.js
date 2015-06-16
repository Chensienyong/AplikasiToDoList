var gulp   = require('gulp'),
    server = require('gulp-express');

gulp.task('server', function () {
    server.run(['server.js']);

    gulp.watch(['src/**/*'], server.notify);
    gulp.watch(['server.js'], [server.run]);
});
