const db = require("../config/database");


const Laporan = {


    transaksi: async (awal, akhir) => {


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


            WHERE transaksi.tanggal_transaksi
            BETWEEN ? AND ?


            ORDER BY transaksi.id DESC


        `,

        [
            awal,
            akhir
        ]);


        return rows;


    }



};


module.exports = Laporan;