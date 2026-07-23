import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("/auth/login", {
                username,
                password
            });
            localStorage.setItem(
                "token",
                response.data.token
            );
            navigate("/dashboard", {
                replace: true
            });
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login gagal"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#2563eb,#1d4ed8,#1e3a8a)"
            }}
        >
            <div
                className="card border-0 shadow-lg"
                style={{
                    width: "420px",
                    borderRadius: "20px"
                }}
            >
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div
                            className="bg-primary rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                            style={{
                                width: "80px",
                                height: "80px"
                            }}
                        >
                            <i
                                className="bi bi-person-fill text-white"
                                style={{
                                    fontSize: "40px"
                                }}
                            ></i>
                        </div>

                        <h3 className="fw-bold">
                            Toko Malau
                        </h3>

                        <p className="text-muted mb-0">
                            Login
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">
                                Username
                            </label>

                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-person"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Masukkan username"
                                    value={username}
                                    onChange={(e)=>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">
                                Password
                            </label>

                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-lock"></i>
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e)=>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={()=>
                                        setShowPassword(!showPassword)
                                    }
                                >

                                    <i
                                        className={`bi ${
                                            showPassword
                                                ? "bi-eye-slash"
                                                : "bi-eye"
                                        }`}
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary w-100 py-2"
                            disabled={loading}
                        >
                            {
                                loading ?
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>
                                    Loading...
                                </>
                                :
                                <>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login
                                </>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;