const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

db.getConnection((err, connection) => {

    if (err) {

        console.log("Database Gagal Terkoneksi");

        console.log(err);

    } else {

        console.log("Database Berhasil Terkoneksi");

        connection.release();

    }

});

module.exports = db.promise();