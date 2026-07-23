import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
    FaChevronRight,
    FaUserCircle
} from "react-icons/fa";

import Swal from "sweetalert2";
import "./Sidebar.css";

const Sidebar = () => {

    const navigate = useNavigate();

    const [inputOpen, setInputOpen] = useState(true);

    const [prosesOpen, setProsesOpen] = useState(true);

    const handleLogout = async () => {

        const result = await Swal.fire({

            title: "Logout?",

            text: "Apakah Anda yakin ingin keluar dari sistem?",

            icon: "question",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#64748b",

            confirmButtonText: "Ya, Logout",

            cancelButtonText: "Batal"

        });

        if (!result.isConfirmed) return;

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <aside className="sidebar-modern">
            <div className="sidebar-profile">

                <FaUserCircle className="profile-avatar" />

                <div>

                    <h6 className="mb-0">Toko Malau</h6>

                    <small className="text-success">

                        ● Online

                    </small>

                </div>

            </div>

            {/* Menu */}

            <div className="sidebar-menu">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "menu-item active"
                            : "menu-item"
                    }
                >

                    <FaHome className="menu-icon" />

                    <span>Dashboard</span>

                </NavLink>

                {/* Input Data */}

                <button
                    className="menu-group-btn"
                    onClick={() => setInputOpen(!inputOpen)}
                >

                    <div className="menu-group-left">

                        <FaFolder className="menu-icon" />

                        <span>Input Data</span>

                    </div>

                    {
                        inputOpen
                            ? <FaChevronDown />
                            : <FaChevronRight />
                    }

                </button>

                <div className={`submenu-wrapper ${inputOpen ? "open" : ""}`}>

                    <NavLink
                        to="/barang"
                        className={({ isActive }) =>
                            isActive
                                ? "submenu-item active"
                                : "submenu-item"
                        }
                    >

                        <FaBoxOpen className="menu-icon" />

                        <span>Data Barang</span>

                    </NavLink>

                    <NavLink
                        to="/pelanggan"
                        className={({ isActive }) =>
                            isActive
                                ? "submenu-item active"
                                : "submenu-item"
                        }
                    >

                        <FaUsers className="menu-icon" />

                        <span>Data Pelanggan</span>

                    </NavLink>

                </div>

                {/* Proses */}

                <button
                    className="menu-group-btn"
                    onClick={() => setProsesOpen(!prosesOpen)}
                >

                    <div className="menu-group-left">

                        <FaMoneyBillWave className="menu-icon" />

                        <span>Proses</span>

                    </div>

                    {
                        prosesOpen
                            ? <FaChevronDown />
                            : <FaChevronRight />
                    }

                </button>

                <div className={`submenu-wrapper ${prosesOpen ? "open" : ""}`}>

                    <NavLink
                        to="/booking"
                        className={({ isActive }) =>
                            isActive
                                ? "submenu-item active"
                                : "submenu-item"
                        }
                    >

                        <FaCalendarAlt className="menu-icon" />

                        <span>Booking</span>

                    </NavLink>

                    <NavLink
                        to="/transaksi"
                        className={({ isActive }) =>
                            isActive
                                ? "submenu-item active"
                                : "submenu-item"
                        }
                    >

                        <FaMoneyBillWave className="menu-icon" />

                        <span>Transaksi</span>

                    </NavLink>

                    <NavLink
                        to="/laporan"
                        className={({ isActive }) =>
                            isActive
                                ? "submenu-item active"
                                : "submenu-item"
                        }
                    >

                        <FaChartBar className="menu-icon" />

                        <span>Laporan</span>

                    </NavLink>

                </div>

            </div>

            {/* Logout */}

            <div className="sidebar-footer">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt className="menu-icon" />

                    <span>Logout</span>

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;