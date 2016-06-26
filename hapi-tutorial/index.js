var Hapi = require('hapi')
// path is a node core module (no need to install)
var Path = require('path')

var server = new Hapi.Server()

server.connection({ port: 3000 })

// Note: vision require statement is HERE
// Binding the vision plugin to the hapi server
server.register(require('vision'), function(err) {
  if (err) throw err

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
      // Go find the index view with rules from server.views
      // view gets access data in the object
      reply.view('index', {name: 'Alexa'})
    }
  })

  server.route({
    method: 'GET',
    path: '/users/{userName}',
    handler: function(request, reply){
      var name = encodeURIComponent(request.params.userName)
      reply.view('user', {name: name})
    }
  })

  // How the server finds and handles views
  server.views({
    engines: {
      // handlebars require statement HERE
      html: require('handlebars')
    },
    relativeTo: __dirname,
    // In what path to look for templates (eg. __dirname/templates/[file].html)
    path: 'templates'
  })
})

server.start(function() {
  console.log("app running on: ", server.info.uri)
})