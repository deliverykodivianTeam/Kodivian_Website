import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const BASE_URL = "https://kodivian-website-5.onrender.com";

function VisitorDetails() {
  const [visitors, setVisitors] = useState([]);

  const fetchVisitors = async () => {
    const res = await axios.get(`${BASE_URL}/visitors`);
    setVisitors(res.data);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const deleteVisitor = async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    setVisitors(visitors.filter(v => v.id !== id));
  };

  return (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Visitors</h1>

    <table className="min-w-full border border-gray-300 rounded-lg">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 border">IP</th>
          <th className="p-3 border">City</th>
          <th className="p-3 border">Country</th>
          <th className="p-3 border">IST</th>
          <th className="p-3 border text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {visitors.map((v) => (
          <tr key={v.id} className="hover:bg-gray-100 transition">
            <td className="p-3 border">{v.ip}</td>
            <td className="p-3 border">{v.city}</td>
            <td className="p-3 border">{v.country}</td>
            <td className="p-3 border">{v.timestamp_ist}</td>

            <td className="p-3 border text-center">
              <button
                onClick={() => deleteVisitor(v.id)}
                className="p-2 bg-black hover:bg-gray-100 text-white rounded shadow-md"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default VisitorDetails;

