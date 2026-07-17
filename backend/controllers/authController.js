const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username dan Password wajib diisi"
            });
        }

        const user = await authModel.findByUsername(username);
        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Username tidak ditemukan"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user[0].password
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Password salah"
            });
        }

        const token = jwt.sign(
            {
                id: user[0].id,
                username: user[0].username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            success: true,
            message: "Login berhasil",
            token,
            data: {
                id: user[0].id,
                nama: user[0].nama,
                username: user[0].username
            }
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}