import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyUser: [],
  disease: [],
  handlingDisease: [],
  literaturDisease: [],
  youtubeDisease: [],
  nameDisease: null || "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setDisease: (state, action) => {
      state.disease = action.payload;
    },
    setHandlingDisease: (state, action) => {
      state.handlingDisease = action.payload;
    },
    setLiteraturDisease: (state, action) => {
      state.literaturDisease = action.payload;
    },
    setYoutubeDisease: (state, action) => {
      state.youtubeDisease = action.payload;
    },
    setNameDisease: (state, action) => {
      state.nameDisease = action.payload;
    },
    setHistoryUser: (state, action) => {
      state.historyUser = action.payload;
    },
  },
});

export const {
  setDisease,
  setHandlingDisease,
  setLiteraturDisease,
  setYoutubeDisease,
  setNameDisease,
  setHistoryUser,
} = adminSlice.actions;

export default adminSlice.reducer;
