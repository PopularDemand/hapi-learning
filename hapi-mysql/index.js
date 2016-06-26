var Hapi = require('hapi')

/// MySQL config
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '[REDACTED]', //it worked
  database: 'hapi'
})

var server = new Hapi.Server()
server.connection({ port: 3000 })
connection.connect();

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    connection.query('SELECT * FROM People', function(err, rows, fields) {
      if (err) throw err;
      console.log(rows[0]);
      reply('the name of the first user is ' + rows[0].Name);
    });
  }
})

server.start(function() {
  console.log('server running on ' + server.info.uri)
})
