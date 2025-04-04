import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import { useNavigate } from "react-router-dom";

function Pastes() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting pastes safely
  const pastes = useSelector((state) => state.pastes.pastes) || [];

  // Filtering pastes based on search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete
  const handleDelete = (id) => {
    dispatch(removeFromPaste(id));
  };

  // Handle view (navigate to /pastes/:id)
  const handleView = (id) => {
    navigate(`/pastes/${id}`);
  };

  // Handle edit (navigate to edit form)
  const handleEdit = (id) => {
    navigate(`/?pasteId=${id}`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <input
        type="search"
        className="p-3 rounded-xl border border-gray-400 w-full text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="p-3 my-2 border rounded-lg shadow bg-white">
              <h3 className="text-lg font-semibold">{paste.title}</h3>
              <p className="text-gray-600 truncate">{paste.content}</p>
              <p className="text-sm text-gray-400">
                Created on: {new Date(paste.createdAt).toLocaleString()} 🗓️
              </p>

              {/* Buttons for actions */}
              <div className="mt-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleView(paste._id)} // View
                >
                  View
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded-lg"
                  onClick={() => navigator.clipboard.writeText(paste.content)}
                >
                  Copy
                </button>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                  onClick={() => handleEdit(paste._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  onClick={() => handleDelete(paste._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No pastes found</p>
        )}
      </div>
    </div>
  );
}

export default Pastes;
