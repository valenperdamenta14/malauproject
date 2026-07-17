import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={handleLogin}
        className="border p-4 rounded shadow"
        style={{ width: "350px" }}
      >
        <h3 className="text-center mb-4">Login Admin</h3>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;