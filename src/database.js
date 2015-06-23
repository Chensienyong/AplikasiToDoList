var mysql  = require('mysql'),
    pool   = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'appToDoList',
        connectionLimit: 2
    });

function queryDatabase(query, data, callback) {
    pool.getConnection(function (poolErr, connection) {
        if (poolErr) {
            console.log(poolErr);
            callback(poolErr);
            return;
        }

        connection.query(query, data, function (connErr, results) {
            connection.release();
            if (connErr) {
                console.log(connErr);
                callback(connErr);
                return;
            }

            callback(false, results);
        });
    });
};

exports.GetToDo = function (callback) {
    var query = "SELECT * FROM list";
    
    queryDatabase(query, null, callback);
};