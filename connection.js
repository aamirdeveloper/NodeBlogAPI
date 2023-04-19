let mysql = require('./node_modules/mysql2');


let connection = mysql.createConnection({
    host: '156.67.222.148',
    user: 'u498357097_nodeAPI',
    password: 'X;5lu068!nK',
    database: 'u498357097_nodeAPI'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });
