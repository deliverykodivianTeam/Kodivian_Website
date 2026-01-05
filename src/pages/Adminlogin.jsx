import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://kodivian-website-5.onrender.com"

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/admin/visitors`, { password });
      if (res.status === 200) {
        localStorage.setItem("visitorsData", JSON.stringify(res.data));
        navigate("/visitors-list");
      }
    } catch (err) {
      setError("❌ Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#443C68] to-[#635985] relative overflow-hidden">

    {/* Glow Orbs */}
    <div className="absolute w-[550px] h-[550px] bg-purple-500/20 rounded-full blur-[130px] top-[-180px] left-[-180px]" />
    <div className="absolute w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-[110px] bottom-[-150px] right-[-150px]" />

    {/* Card */}
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)] p-10 rounded-3xl w-[380px] text-center animate-[fadeIn_0.8s_ease]">

      {/* Icon */}
      <div className="text-6xl mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
        🔐
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold  tracking-wide drop-shadow-lg mb-2">
        Admin Portal
      </h2>

      <p className="text-white/80 text-sm mb-8">
        Secure access to visitor analytics
      </p>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl border border-white/40 bg-white/80 
                     focus:bg-white text-gray-900 placeholder-gray-600 
                     shadow-md focus:outline-none focus:ring-2 
                     focus:ring-purple-500 transition-all"
          required
        />

       <button
        type="submit"
        disabled={loading}
     className="w-full py-3 rounded-lg 
           bg-violet-800 hover:bg-violet-700 
            font-semibold 
           shadow-md hover:shadow-lg 
           transition-all active:scale-95
           border-0 outline-none"

           >
          {loading ? "Logging in..." : "Login"}
         </button>



      </form>

      {/* Error message */}
      {error && (
        <p className="text-red-300 mt-4 text-sm font-semibold animate-[fadeIn_0.3s]">
          {error}
        </p>
      )}

      <p className="text-xs text-white/60 mt-8">
        © {new Date().getFullYear()} Visitor Analytics Dashboard
      </p>
    </div>
  </div>
);

}

export default AdminLogin;
