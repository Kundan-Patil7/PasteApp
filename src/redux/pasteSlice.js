import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Safe parsing of localStorage data
const getPastesFromLocalStorage = () => {
  try {
    const storedPastes = localStorage.getItem("pastes");
    return storedPastes ? JSON.parse(storedPastes) : [];
  } catch (error) {
    console.error("Error parsing pastes from localStorage:", error);
    return []; // Fallback to an empty array if JSON is invalid
  }
};

const initialState = {
  pastes: getPastesFromLocalStorage(),
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);

      // Save to localStorage correctly
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste created successfully!");
    },

    updateToPastes: (state, action) => {
      const { id, updatedPaste } = action.payload;
      const index = state.pastes.findIndex((paste) => paste._id === id); // ✅ Fixed `_id`
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes have been reset!");
    },

    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((paste) => paste._id !== pasteId); // ✅ Fixed `_id`
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste removed successfully!");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
