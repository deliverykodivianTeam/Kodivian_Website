import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

function VisitorDetails() {
  const [visitors, setVisitors] = useState([]);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("visitorsData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const sorted = parsed.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setVisitors(sorted);
    }
  }, []);

  // Delete one visitor
  const handleDeleteVisitor = async (timestamp) => {
    if (!window.confirm("Delete this visitor record?")) return;
    try {
      await axios.delete(`http://127.0.0.1:5000/delete/${timestamp}`);
      const updated = visitors.filter((v) => v.timestamp !== timestamp);
      setVisitors(updated);
      localStorage.setItem("visitorsData", JSON.stringify(updated));
    } catch (err) {
      alert("❌ Error deleting visitor");
    }
  };

  // Clear all data
  const handleClearData = async () => {
    if (!window.confirm("Are you sure you want to clear all records?")) return;
    try {
      setClearing(true);
      await axios.delete("http://127.0.0.1:5000/clear");
      setVisitors([]);
      localStorage.removeItem("visitorsData");
      alert("✅ All data cleared");
    } catch (err) {
      alert("❌ Error clearing data");
    } finally {
      setClearing(false);
    }
  };

  if (!visitors.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100">
        <h2 className="text-2xl text-indigo-800 font-semibold mb-2">
          No visitor data found
        </h2>
        <p className="text-gray-600">
          Try visiting the website to generate records.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-indigo-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">
            👥 Website Visitor Records
          </h1>
          <button
            onClick={handleClearData}
            disabled={clearing}
            className="bg-gradient-to-r from-red-500 to-pink-500  px-6 py-2 hover:from-red-600 hover:to-pink-600 shadow-md transition font-medium"
          >
            {clearing ? "Clearing..." : "🧹 Clear All"}
          </button>
        </div>

        {/* Most recent visitor */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl mb-8 shadow-md">
          <h2 className="text-xl font-semibold mb-3">✨ Most Recent Visitor</h2>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <b>IP:</b> {visitors[0].ip}
            </p>
            <p>
              <b>City:</b> {visitors[0].city}
            </p>
            <p>
              <b>Country:</b> {visitors[0].country}
            </p>
            <p>
              <b>Visited:</b> {visitors[0].timestamp}
            </p>
          </div>
        </div>

        {/* Visitor Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-indigo-700">
              <tr>
                <th className="d-3">#</th>
                <th className="p-3">IP</th>
                <th className="d-3">City</th>
                <th className="p-3">Country</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v, index) => (
                <tr
                  key={v.timestamp}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition-all duration-200`}
                >
                  <td className="p-3 text-indigo-800 font-semibold">
                    {index + 1}
                  </td>
                  <td className="p-3">{v.ip}</td>
                  <td className="p-3">{v.city}</td>
                  <td className="p-3">{v.country}</td>
                  <td className="p-3">{v.timestamp}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteVisitor(v.timestamp)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition transform hover:scale-110 shadow-md"
                      title="Delete visitor"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VisitorDetails;
