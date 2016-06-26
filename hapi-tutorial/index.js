var Hapi = require('hapi')

var server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 3000
})

server.route({
  method: 'GET',
  path: '/hello',
  handler: function(request, reply) {
    reply('hello world')
  }
})

server.start(function() {
  console.log("app running on: ", server.info.uri)
})