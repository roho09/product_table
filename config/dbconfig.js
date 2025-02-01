const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NewPassword',
    database: 'product_table'
});

db.connect((err) => { 
    if (err) { 
        console.log('Error connecting to database', err ); 
        return;
    } 
    console.log('Connected to database'); 
});

module.exports = db;