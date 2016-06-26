var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var Path = require('path');

var server = new Hapi.Server();
server.register(Inert, function(err) {
  if (err) throw err;
});
server.register(Vision, function(err) {
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.views({
  engines: { html: require('handlebars') },
  path: Path.join(__dirname, "templates")
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: 'index.html'
  }
});

// Call start to get server listening on assigned port
server.start(function(){
  console.log('Server running at: ' + server.info.uri);
})