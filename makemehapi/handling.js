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
  path: '/',
  handler: {
    file: Path.join(__dirname, "index.html")
  }
});

// Call start to get server listening on assigned port
server.start(function(){
  console.log('Server running at: ' + server.info.uri);
})

// Note on handlers: You can declare handlers as objects instead of functions. The object must
// contain one of the following: file (requires inert plugin), directory
// (requires inert plugin), proxy (requires h2o2 plugin), or view (requires
// vision plugin).