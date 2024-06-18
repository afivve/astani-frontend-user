import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identify: [],
  historyIdentify: [],
  detailIdentify: [],
  notification: [],
};

const identifySlice = createSlice({
  name: "identify",
  initialState,
  reducers: {
    setIdentify: (state, action) => {
      state.identify = action.payload;
    },
    setHistoryIdentify: (state, action) => {
      state.historyIdentify = action.payload;
    },
    setDetailIdentify: (state, action) => {
      state.detailIdentify = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setIdentify, setHistoryIdentify, setDetailIdentify, setNotification } =
  identifySlice.actions;

export default identifySlice.reducer;
