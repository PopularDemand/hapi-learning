var Hapi = require('hapi');
var Vision = require('vision');

var server = new Hapi.Server();

server.register(Vision, function(err) {
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.views({
  engines: { html: require('handlebars') },
  relativeTo: __dirname,
  path: "templates",
  helpersPath: "helpers"
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: 'index.html'
  }
});

server.start(function(){
  console.log('Server running at: ' + server.info.uri);
})