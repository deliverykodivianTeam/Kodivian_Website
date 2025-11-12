import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:5000/admin/visitors", {
        password,
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Background glow circles */}
      <div className="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl top-[-200px] left-[-200px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-2xl bottom-[-100px] right-[-100px]" />

      {/* Login Card */}
      <div className="relative bg-white/25 backdrop-blur-lg border border-white/40 shadow-2xl p-10 rounded-3xl w-96 text-center animate-fade-in">
        <div className="text-5xl mb-4 text-white drop-shadow-lg">🔐</div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Admin Portal
        </h2>
        <p className="text-white/90 mb-6 text-sm">
          Secure access to visitor insights
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-white/50 bg-white/80 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-indigo-500 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-200 mt-4 text-sm font-medium">{error}</p>
        )}

        <p className="text-xs text-white/70 mt-6">
          © {new Date().getFullYear()} Visitor Analytics Dashboard
        </p>
      </div>
    </div>
  );
}

export default Adminlogin;
