const Laporan = require("../models/laporanModel");


const laporanController = {


    transaksi: async (req,res)=>{


        try{


            const {

                awal,

                akhir

            } = req.query;



            const data = await Laporan.transaksi(

                awal,

                akhir

            );



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



    }


};



module.exports = laporanController;