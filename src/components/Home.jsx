import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice"; // Adjust the import path as needed

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId"); 
  const dispatch = useDispatch();

  function creatPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes({ id: pasteId, updatedPaste: paste }));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({})
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      <input
        type="text"
        className="p-3 rounded-2xl border border-gray-400 w-full text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="rounded-2xl min-h-[150px] p-4 border border-gray-400 w-full text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>

      <button
        className="p-3 bg-blue-500 text-white font-semibold text-lg rounded-2xl shadow-lg hover:bg-blue-600 transition-all"
        onClick={creatPaste}
      >
        {pasteId ? "Update My Paste" : "Create My Paste"}
      </button>
    </div>
  );
};

export default Home;
