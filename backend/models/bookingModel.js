const db = require("../config/database");

const Booking = {

    getAll: async () => {
        const [rows] = await db.query(`
            SELECT
                booking.id,
                booking.kode_booking,
                pelanggan.nama,
                booking.tanggal_booking,
                booking.status
            FROM booking
            INNER JOIN pelanggan
                ON booking.pelanggan_id = pelanggan.id
            ORDER BY booking.id DESC
        `);

        return rows;
    },

    getById: async (id) => {
        const [booking] = await db.query(`
            SELECT *
            FROM booking
            WHERE id = ?
        `, [id]);

        const [detail] = await db.query(`
            SELECT
                booking_detail.*,
                barang.nama_barang
            FROM booking_detail
            INNER JOIN barang
                ON booking_detail.barang_id = barang.id
            WHERE booking_detail.booking_id = ?
        `, [id]);

        return {
            booking: booking[0],
            detail
        };
    },

    create: async (data) => {

        const connection = await db.getConnection();

        try {

            await connection.beginTransaction();

            const {
                kode_booking,
                pelanggan_id,
                tanggal_booking,
                status,
                detail
            } = data;

            const [booking] = await connection.query(
                `
                INSERT INTO booking
                (
                    kode_booking,
                    pelanggan_id,
                    tanggal_booking,
                    status
                )
                VALUES (?, ?, ?, ?)
                `,
                [
                    kode_booking,
                    pelanggan_id,
                    tanggal_booking,
                    status
                ]
            );

            const bookingId = booking.insertId;

            for (const item of detail) {

                await connection.query(
                    `
                    INSERT INTO booking_detail
                    (
                        booking_id,
                        barang_id,
                        qty,
                        harga,
                        subtotal
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        bookingId,
                        item.barang_id,
                        item.qty,
                        item.harga,
                        item.subtotal
                    ]
                );

            }

            await connection.commit();

            return bookingId;

        } catch (error) {

            await connection.rollback();

            throw error;

        } finally {

            connection.release();

        }

    }

};

module.exports = Booking;