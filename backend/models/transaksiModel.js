const db = require("../config/database");

const Transaksi = {

    getAll: async () => {

        const [rows] = await db.query(`
            SELECT
                transaksi.id,
                transaksi.tanggal_transaksi,
                transaksi.total,
                transaksi.metode_pembayaran,
                booking.kode_booking,
                pelanggan.nama
            FROM transaksi
            INNER JOIN booking
                ON booking.id = transaksi.booking_id
            INNER JOIN pelanggan
                ON pelanggan.id = booking.pelanggan_id
            ORDER BY transaksi.id DESC
        `);

        return rows;

    },

    getBookingPending: async () => {

        const [rows] = await db.query(`
            SELECT
                booking.id,
                booking.kode_booking,
                pelanggan.nama,
                booking.tanggal_booking
            FROM booking
            INNER JOIN pelanggan
                ON pelanggan.id = booking.pelanggan_id
            WHERE booking.status='Pending'
            ORDER BY booking.id DESC
        `);

        return rows;

    },

    getDetailBooking: async (bookingId) => {

        const [rows] = await db.query(`
            SELECT
                bd.*,
                barang.nama_barang
            FROM booking_detail bd
            INNER JOIN barang
                ON barang.id = bd.barang_id
            WHERE bd.booking_id=?
        `,[bookingId]);

        return rows;

    },

    create: async (data)=>{

        const conn = await db.getConnection();

        try{

            await conn.beginTransaction();

            await conn.query(
                `
                INSERT INTO transaksi
                (
                    booking_id,
                    tanggal_transaksi,
                    total,
                    metode_pembayaran
                )
                VALUES (?,?,?,?)
                `,
                [
                    data.booking_id,
                    data.tanggal_transaksi,
                    data.total,
                    data.metode_pembayaran
                ]
            );

            await conn.query(
                `
                UPDATE booking
                SET status='Selesai'
                WHERE id=?
                `,
                [data.booking_id]
            );

            const [detail]=await conn.query(
                `
                SELECT *
                FROM booking_detail
                WHERE booking_id=?
                `,
                [data.booking_id]
            );

            for(const item of detail){

                await conn.query(
                    `
                    UPDATE barang
                    SET stok=stok-?
                    WHERE id=?
                    `,
                    [
                        item.qty,
                        item.barang_id
                    ]
                );

            }

            await conn.commit();

        }catch(error){

            await conn.rollback();

            throw error;

        }finally{

            conn.release();

        }

    },

    delete: async(id)=>{

        await db.query(
            "DELETE FROM transaksi WHERE id=?",
            [id]
        );

    }

};

module.exports = Transaksi;