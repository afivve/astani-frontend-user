import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: null,
  filesObj: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setFilesObj: (state, action) => {
      state.filesObj = action.payload;
    },
  },
});

export const { setFiles, setFilesObj } = imageSlice.actions;

export default imageSlice.reducer;
