const db = require("../config/database");

const Barang = {

    getAll: async () => {
        const [rows] = await db.query(`
            SELECT *
            FROM barang
            ORDER BY id DESC
        `);

        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT *
            FROM barang
            WHERE id = ?
        `, [id]);

        return rows[0];
    },

    create: async (data) => {
        const {
            nama_barang,
            harga,
            stok
        } = data;

        const [result] = await db.query(`
            INSERT INTO barang
            (
                nama_barang,
                harga,
                stok
            )
            VALUES (?, ?, ?)
        `, [
            nama_barang,
            harga,
            stok
        ]);

        return result;
    },

    update: async (id, data) => {
        const {
            nama_barang,
            harga,
            stok
        } = data;

        const [result] = await db.query(`
            UPDATE barang
            SET
                nama_barang = ?,
                harga = ?,
                stok = ?
            WHERE id = ?
        `, [
            nama_barang,
            harga,
            stok,
            id
        ]);

        return result;
    },

    delete: async (id) => {
        const [result] = await db.query(`
            DELETE FROM barang
            WHERE id = ?
        `, [id]);

        return result;
    }

};

module.exports = Barang;