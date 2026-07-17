import api from "./api";


const laporanService = {



    transaksi:(awal,akhir)=>{


        return api.get(

            `/laporan/transaksi?awal=${awal}&akhir=${akhir}`

        );


    }



};


export default laporanService;