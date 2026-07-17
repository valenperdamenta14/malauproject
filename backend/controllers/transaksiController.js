const Transaksi = require("../models/transaksiModel");

const transaksiController = {

    getAll: async(req,res)=>{

        try{

            const data =
                await Transaksi.getAll();

            res.json({

                success:true,

                data

            });

        }catch(error){

            res.status(500).json({

                success:false,

                message:error.message

            });

        }

    },

    bookingPending: async(req,res)=>{

        const data =
            await Transaksi.getBookingPending();

        res.json({

            success:true,

            data

        });

    },

    detailBooking: async(req,res)=>{

        const data =
            await Transaksi.getDetailBooking(
                req.params.id
            );

        res.json({

            success:true,

            data

        });

    },

    create: async(req,res)=>{

        try{

            await Transaksi.create(req.body);

            res.json({

                success:true,

                message:"Transaksi berhasil."

            });

        }catch(error){

            res.status(500).json({

                success:false,

                message:error.message

            });

        }

    },

    delete: async(req,res)=>{

        try{

            await Transaksi.delete(
                req.params.id
            );

            res.json({

                success:true,

                message:"Data berhasil dihapus."

            });

        }catch(error){

            res.status(500).json({

                success:false,

                message:error.message

            });

        }

    }

};

module.exports = transaksiController;