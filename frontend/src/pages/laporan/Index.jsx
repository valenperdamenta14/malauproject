import { useState } from "react";


import MainLayout from "../../layouts/MainLayout";


import laporanService from "../../services/laporanService";



const Laporan = () => {



    const tanggal =
    new Date()
    .toISOString()
    .split("T")[0];



    const [awal,setAwal] =
    useState(tanggal);



    const [akhir,setAkhir] =
    useState(tanggal);



    const [data,setData] =
    useState([]);





    const tampilkan = async()=>{


        try{


            const response =

            await laporanService.transaksi(

                awal,

                akhir

            );



            setData(

                response.data.data

            );



        }catch(error){


            console.log(error);


        }



    };




    const total =

    data.reduce(

        (sum,item)=>

        sum + Number(item.total),

        0

    );




    return (

        <MainLayout>


            <h3 className="mb-4">

                Laporan Transaksi

            </h3>



            <div className="card shadow-sm border-0">


                <div className="card-body">



                    <div className="row mb-4">



                        <div className="col-md-4">


                            <label className="form-label">

                                Tanggal Awal

                            </label>


                            <input

                                type="date"

                                className="form-control"

                                value={awal}

                                onChange={
                                    (e)=>
                                    setAwal(e.target.value)
                                }

                            />


                        </div>





                        <div className="col-md-4">


                            <label className="form-label">

                                Tanggal Akhir

                            </label>


                            <input

                                type="date"

                                className="form-control"

                                value={akhir}

                                onChange={
                                    (e)=>
                                    setAkhir(e.target.value)
                                }

                            />


                        </div>





                        <div className="col-md-4 d-flex align-items-end">


                            <button

                                className="btn btn-primary w-100"

                                onClick={tampilkan}

                            >

                                Tampilkan

                            </button>



                        </div>



                    </div>







                    <table className="table table-bordered table-hover">


                        <thead className="table-dark">


                            <tr>


                                <th width="60">

                                    No

                                </th>


                                <th>

                                    Tanggal

                                </th>


                                <th>

                                    Kode Booking

                                </th>


                                <th>

                                    Pelanggan

                                </th>


                                <th>

                                    Total

                                </th>


                                <th>

                                    Pembayaran

                                </th>


                            </tr>


                        </thead>




                        <tbody>


                        {


                            data.length > 0 ?


                            data.map((item,index)=>(


                                <tr key={item.id}>


                                    <td>

                                        {index+1}

                                    </td>


                                    <td>

                                        {item.tanggal_transaksi}

                                    </td>


                                    <td>

                                        {item.kode_booking}

                                    </td>


                                    <td>

                                        {item.nama}

                                    </td>


                                    <td>

                                        Rp {Number(item.total)
                                        .toLocaleString("id-ID")}

                                    </td>


                                    <td>

                                        {item.metode_pembayaran}

                                    </td>


                                </tr>


                            ))



                            :


                            <tr>


                                <td

                                colSpan="6"

                                className="text-center"

                                >

                                    Belum ada data

                                </td>


                            </tr>


                        }



                        </tbody>




                        <tfoot>


                            <tr>


                                <th colSpan="4">

                                    Total Pendapatan

                                </th>


                                <th colSpan="2">


                                    Rp {total
                                    .toLocaleString("id-ID")}


                                </th>


                            </tr>


                        </tfoot>


                    </table>



                </div>


            </div>



        </MainLayout>

    );


};



export default Laporan;