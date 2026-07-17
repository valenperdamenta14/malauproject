const express = require("express");

const router = express.Router();

const controller =
require("../controllers/transaksiController");

router.get(
    "/",
    controller.getAll
);

router.get(
    "/booking",
    controller.bookingPending
);

router.get(
    "/detail/:id",
    controller.detailBooking
);

router.post(
    "/",
    controller.create
);

router.delete(
    "/:id",
    controller.delete
);

module.exports = router;