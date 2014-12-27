// ===================================
// `tail -f` in Node.js and WebSockets
// ===================================

(function() {

  'use strict';

  var socketIO = require('socket.io');
  var optimist = require('optimist');
  var connect = require('connect');
  var stylus  = require('stylus');

  var http = require('http');
  var fs = require('fs');
  var path = require('path');

  var argv = optimist.usage('Usage: $0 file file file')
                     .argv;

  console.log("Argv="+JSON.stringify(argv._))
  // Directory to watch
  var logDir = argv.watch;

  // Create an connect app
  var app = connect();

  // Setup Socket.IO
  var httpServer = http.createServer(app);
  var io = socketIO.listen(httpServer);
  io.set('log level', 1);


  // Stylesheets
  var baseDir = path.join(__dirname, 'public');
  app.use(stylus.middleware({
    'src': baseDir
  }));

  // Other static content
  app.use('/logs', connect['static'](baseDir));


  // Fetch list of files & start watching
  //require('./lib/list-files')(logDir, function(err, logFiles) {

 // Fix the Array
      var files = Array.prototype.sort.apply(argv._,[]);
       var logFiles = [];

      files.forEach(function(file) {
        //var filePath = path.join(logDir, file);
        var isFile = fs.statSync(file).isFile();
        if(isFile) {
          logFiles.push(file);
        }
      });

console.log('logfile=');
console.log(logFiles)


    io.sockets.on('connection', require('./lib/io-handler')('', logFiles));

    var port = parseInt(process.env.PORT || 8000, 10);
    httpServer.listen(port);

    console.log('Log Server running now \n\thttp://0.0.0.0:' + port + '/');
  //});

  module.exports = httpServer;

}).call();
