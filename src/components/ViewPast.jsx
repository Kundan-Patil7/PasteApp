import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewPast() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get paste by ID
  const paste = useSelector((state) =>
    state.pastes.pastes.find((p) => p._id === id)
  );

  // Handle copy content
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    alert("Content copied to clipboard! 📋✅");
  };

  if (!paste) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-500">Paste Not Found! ❌</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/pastes")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg bg-white mt-10">
      <h1 className="text-3xl font-bold text-gray-800">{paste.title}</h1>
      <p className="text-gray-500 mt-1">
        Created on: {new Date(paste.createdAt).toLocaleString()} 🗓️
      </p>

      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
        <p className="text-gray-700 whitespace-pre-wrap">{paste.content}</p>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleCopy}
        >
          Copy Content 📋
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/pastes")}
        >
          Back to Pastes 🔙
        </button>
      </div>
    </div>
  );
}

export default ViewPast;
