const express = require("express");


const router = express.Router();


const controller =
require("../controllers/laporanController");



router.get(

    "/transaksi",

    controller.transaksi

);



module.exports = router;