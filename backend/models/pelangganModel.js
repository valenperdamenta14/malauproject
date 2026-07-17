const db = require("../config/database");

const Pelanggan = {

    getAll: async () => {
        const [rows] = await db.query(`
            SELECT *
            FROM pelanggan
            ORDER BY id DESC
        `);

        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT *
            FROM pelanggan
            WHERE id = ?
        `, [id]);

        return rows[0];
    },

    create: async (data) => {
        const {
            nama,
            no_hp,
            alamat
        } = data;

        const [result] = await db.query(`
            INSERT INTO pelanggan
            (
                nama,
                no_hp,
                alamat
            )
            VALUES (?, ?, ?)
        `, [
            nama,
            no_hp,
            alamat
        ]);

        return result;
    },

    update: async (id, data) => {
        const {
            nama,
            no_hp,
            alamat
        } = data;

        const [result] = await db.query(`
            UPDATE pelanggan
            SET
                nama = ?,
                no_hp = ?,
                alamat = ?
            WHERE id = ?
        `, [
            nama,
            no_hp,
            alamat,
            id
        ]);

        return result;
    },

    delete: async (id) => {
        const [result] = await db.query(`
            DELETE FROM pelanggan
            WHERE id = ?
        `, [id]);

        return result;
    }

};

module.exports = Pelanggan;