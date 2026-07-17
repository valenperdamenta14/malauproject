import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Barang from "../pages/barang/Index";
import TambahBarang from "../pages/barang/Tambah";
import EditBarang from "../pages/barang/Edit";
import Pelanggan from "../pages/pelanggan/Index";
import TambahPelanggan from "../pages/pelanggan/Tambah";
import EditPelanggan from "../pages/pelanggan/Edit";
import Booking from "../pages/booking/Index";
import TambahBooking from "../pages/booking/Tambah";
import Transaksi from "../pages/transaksi/Index";
import TambahTransaksi from "../pages/transaksi/Tambah";
import Laporan from "../pages/laporan/Index";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
            path="/barang"
            element={
                <PrivateRoute>
                    <Barang />
                </PrivateRoute>
            }
        />

        <Route
            path="/barang/tambah"
            element={
                <PrivateRoute>
                    <TambahBarang />
                </PrivateRoute>
            }
        />

        <Route
            path="/barang/edit/:id"
            element={
                <PrivateRoute>
                    <EditBarang />
                </PrivateRoute>
            }
        />

        <Route
            path="/pelanggan"
            element={
                <PrivateRoute>
                    <Pelanggan />
                </PrivateRoute>
            }
        />

        <Route
            path="/pelanggan/tambah"
            element={
                <PrivateRoute>
                    <TambahPelanggan />
                </PrivateRoute>
            }
        />

        <Route
            path="/pelanggan/edit/:id"
            element={
                <PrivateRoute>
                    <EditPelanggan />
                </PrivateRoute>
            }
        />

        <Route
            path="/booking"
            element={
                <PrivateRoute>
                    <Booking />
                </PrivateRoute>
            }
        />

        <Route
            path="/booking/tambah"
            element={
                <PrivateRoute>
                    <TambahBooking />
                </PrivateRoute>
            }
        />

        <Route
            path="/transaksi"
            element={
                <PrivateRoute>
                    <Transaksi />
                </PrivateRoute>
            }
        />

        <Route
            path="/transaksi/tambah"
            element={
                <PrivateRoute>
                    <TambahTransaksi />
                </PrivateRoute>
            }
        />

        <Route
            path="/laporan"
            element={
                <PrivateRoute>
                    <Laporan />
                </PrivateRoute>
            }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;