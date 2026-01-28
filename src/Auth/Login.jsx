import React, { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../API/Base_Url";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${Base_Url}api/login`, {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🚀");
      navigate('/popup-content')

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/20">

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Holsol Admin
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Secure Admin Login
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-5">
              <label className="text-sm text-gray-300 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@holsolindia.com"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-cyan-400 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-sm text-gray-300 mb-1 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-cyan-400 transition"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl cursor-pointer hover:text-white transition"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold tracking-wide hover:scale-[1.02] transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            © {new Date().getFullYear()} Holsol India
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
