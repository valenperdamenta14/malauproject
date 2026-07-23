import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Barang from "../pages/barang/Index";
import Pelanggan from "../pages/pelanggan/Index";
import Booking from "../pages/booking/Index";
import Transaksi from "../pages/transaksi/Index";
import Laporan from "../pages/laporan/Index";
import Logout from "../pages/Logout";

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
            path="/pelanggan"
            element={
                <PrivateRoute>
                    <Pelanggan />
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
            path="/transaksi"
            element={
                <PrivateRoute>
                    <Transaksi />
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

        <Route
            path="/logout"
            element={
                <PrivateRoute>
                    <Logout />
                </PrivateRoute>
            }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;