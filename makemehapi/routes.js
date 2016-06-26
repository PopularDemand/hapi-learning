var Hapi = require('hapi');
var Inert = require('inert');

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
  path: '/{name}',
  handler: function(request, reply){
    reply("Hello " + encodeURIComponent(request.params.name));
  }
});

// Call start to get server listening on assigned port
server.start(function(){
  console.log('Server running at: ' + server.info.uri);
})