require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Booking Online API Running",
        version: "1.0.0"
    });
});

const authRoutes = require("./routes/authRoutes");
const barangRoutes = require("./routes/barangRoutes");
const pelangganRoutes = require("./routes/pelangganRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const laporanRoutes= require("./routes/laporanRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/barang", barangRoutes);
app.use("/api/pelanggan", pelangganRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/laporan", laporanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`====================================`);
    console.log(` Server Running`);
    console.log(` http://localhost:${PORT}`);
    console.log(`====================================`);
});