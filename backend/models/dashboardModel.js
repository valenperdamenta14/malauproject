const db = require("../config/database");

const Dashboard = {

    getSummary: async () => {

        const [[barang]] = await db.query(`
            SELECT COUNT(*) AS total
            FROM barang
        `);

        const [[pelanggan]] = await db.query(`
            SELECT COUNT(*) AS total
            FROM pelanggan
        `);

        const [[booking]] = await db.query(`
            SELECT COUNT(*) AS total
            FROM booking
        `);

        const [[pending]] = await db.query(`
            SELECT COUNT(*) AS total
            FROM booking
            WHERE status='Pending'
        `);

        const [[selesai]] = await db.query(`
            SELECT COUNT(*) AS total
            FROM booking
            WHERE status='Selesai'
        `);

        const [[pendapatan]] = await db.query(`
            SELECT
                IFNULL(SUM(total),0) AS total
            FROM transaksi
        `);

        return {
            barang: barang.total,
            pelanggan: pelanggan.total,
            booking: booking.total,
            pending: pending.total,
            selesai: selesai.total,
            pendapatan: pendapatan.total
        };

    }

};

module.exports = Dashboard;