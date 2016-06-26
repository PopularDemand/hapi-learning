var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    reply("Hello hapi");
  }
});

// Call start to get server listening on assigned port
server.start(function(){
  console.log('Server running at: ' + server.info.uri);
})