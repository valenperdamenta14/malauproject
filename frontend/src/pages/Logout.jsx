import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const logout = async () => {

            const result = await Swal.fire({

                title: "Logout",

                text: "Apakah Anda yakin ingin keluar?",

                icon: "question",

                showCancelButton: true,

                confirmButtonColor: "#dc3545",

                cancelButtonColor: "#6c757d",

                confirmButtonText: "Ya, Logout",

                cancelButtonText: "Batal"

            });

            if (result.isConfirmed) {

                localStorage.removeItem("token");

                localStorage.removeItem("user");

                sessionStorage.clear();

                Swal.fire({

                    icon: "success",

                    title: "Berhasil",

                    text: "Anda berhasil logout.",

                    timer: 1500,

                    showConfirmButton: false

                });

                navigate("/", {
                    replace: true
                });

            } else {

                navigate(-1);

            }

        };

        logout();

    }, []);

    return null;

};

export default Logout;