import React, { useEffect, useState } from "react";
import axios from "axios";

function VisitorsList() {
  const [visitors, setVisitors] = useState([]);

  const fetchVisitors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/visitors");
      setVisitors(res.data);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const clearVisitors = async () => {
    await axios.delete("http://127.0.0.1:5000/clear");
    setVisitors([]);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">🌍 Website Visitors</h2>
      <div className="text-end mb-3">
        <button className="btn btn-danger" onClick={clearVisitors}>
          Clear Visitors
        </button>
      </div>

      {visitors.length === 0 ? (
        <p>No visitors yet.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>IP</th>
              <th>City</th>
              <th>Country</th>
              <th>Visited At</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((v, i) => (
              <tr key={i}>
                <td>{v.ip}</td>
                <td>{v.city}</td>
                <td>{v.country}</td>
                <td>{v.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VisitorsList;
