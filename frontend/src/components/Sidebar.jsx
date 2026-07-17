import { useState } from "react";

import { NavLink } from "react-router-dom";

import {

    FaHome,

    FaBoxOpen,

    FaUsers,

    FaCalendarAlt,

    FaMoneyBillWave,

    FaChartBar,

    FaFolder,

    FaSignOutAlt,

    FaChevronDown,

    FaChevronRight

} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {

    const [inputOpen, setInputOpen] = useState(true);

    const [prosesOpen, setProsesOpen] = useState(true);

    return (

        <aside className="sidebar">

            <div className="logo">

                <h3>TOKO MALAU</h3>

                <small>Sistem Informasi Booking</small>

            </div>

            <NavLink
                to="/dashboard"
                className="menu-link"
            >

                <FaHome />

                Dashboard

            </NavLink>

            <div
                className="menu-group"
                onClick={() => setInputOpen(!inputOpen)}
            >

                <div>

                    <FaFolder />

                    Input Data

                </div>

                {
                    inputOpen ?

                    <FaChevronDown />

                    :

                    <FaChevronRight />

                }

            </div>

            {
                inputOpen &&

                <>

                    <NavLink
                        to="/barang"
                        className="submenu"
                    >

                        <FaBoxOpen />

                        Data Barang

                    </NavLink>

                    <NavLink
                        to="/pelanggan"
                        className="submenu"
                    >

                        <FaUsers />

                        Data Pelanggan

                    </NavLink>

                </>

            }

            <div
                className="menu-group"
                onClick={() => setProsesOpen(!prosesOpen)}
            >

                <div>

                    <FaMoneyBillWave />

                    Proses

                </div>

                {
                    prosesOpen ?

                    <FaChevronDown />

                    :

                    <FaChevronRight />

                }

            </div>

            {
                prosesOpen &&

                <>

                    <NavLink
                        to="/booking"
                        className="submenu"
                    >

                        <FaCalendarAlt />

                        Booking

                    </NavLink>

                    <NavLink
                        to="/transaksi"
                        className="submenu"
                    >

                        <FaMoneyBillWave />

                        Transaksi

                    </NavLink>

                    <NavLink
                        to="/laporan"
                        className="submenu"
                    >

                        <FaChartBar />

                        Laporan

                    </NavLink>

                </>

            }

            <NavLink
                to="/logout"
                className="logout"
            >

                <FaSignOutAlt />

                Logout

            </NavLink>

        </aside>

    );

};

export default Sidebar;