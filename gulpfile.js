var gulp = require('gulp'),
  serverFactory = require('spa-server'),
  favicon = require('serve-favicon');


gulp.task('serve', function() {
  var server = serverFactory.create({
    path: '.',
    port: 3000,
    fallback: {
    'text/html' : '/index.html'
    },
    middleware: [
      favicon(__dirname + '/favicon.ico')
    ]
  });

  server.start();
});
