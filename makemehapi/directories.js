var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');

var server = new Hapi.Server();
server.register(Inert, function(err){
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  method: 'GET',
  path: '/foo/bar/baz/{file}',
  handler: {
    directory: {
      path: Path.join(__dirname, "public")
    }
  }
});

// Call start to get server listening on assigned port
server.start(function(){
  console.log('Server running at: ' + server.info.uri);
})