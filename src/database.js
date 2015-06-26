var mysql  = require('mysql'),
    pool   = mysql.createPool({
        host: process.env.MYSQLDB_HOST,
        user: process.env.MYSQLDB_USER,
        password: process.env.MYSQLDB_PASSWORD,
        database: process.env.MYSQLDB_DB, //database appToDoList
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

exports.SetToDo = function (data, callback) {
    var query = "INSERT INTO list(`id`, `name`) VALUES (?,?);";

    queryDatabase(query, [null, data], callback);
}

exports.DeleteToDo = function(index, callback) {
    var query = "DELETE FROM list WHERE id = ?;";

    queryDatabase(query, [index], callback);
}