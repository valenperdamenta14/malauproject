const db = require("../config/database");

exports.findByUsername = async (username) => {

    const [rows] = await db.execute(
        "SELECT * FROM admin WHERE username = ?",
        [username]
    );

    return rows;

};