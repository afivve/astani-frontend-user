import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyUser: [],
  disease: [],
  diseaseId: [],
  handlingDisease: [],
  handlingDiseaseId: "",
  literaturDisease: [],
  literaturDiseaseId: "",
  youtubeDisease: [],
  youtubeDiseaseId: "",
  nameDisease: null || "",
  totalUser: null || "",
  totalUserActive: null || "",
  totalPredict: null || "",
  totalPersentasePredict: null || "",
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
    setTotalUser: (state, action) => {
      state.totalUser = action.payload;
    },
    setTotalUserActive: (state, action) => {
      state.totalUserActive = action.payload;
    },
    setTotalPredict: (state, action) => {
      state.totalPredict = action.payload;
    },
    setTotalPersentasePredict: (state, action) => {
      state.totalPersentasePredict = action.payload;
    },
    setDiseaseId: (state, action) => {
      state.diseaseId = action.payload;
    },
    setHandlingDiseaseId: (state, action) => {
      state.handlingDiseaseId = action.payload;
    },
    setLiteraturDiseaseId: (state, action) => {
      state.literaturDiseaseId = action.payload;
    },
    setYoutubeDiseaseId: (state, action) => {
      state.youtubeDiseaseId = action.payload;
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
  setTotalUser,
  setTotalUserActive,
  setTotalPersentasePredict,
  setTotalPredict,
  setDiseaseId,
  setHandlingDiseaseId,
  setLiteraturDiseaseId,
  setYoutubeDiseaseId,
} = adminSlice.actions;

export default adminSlice.reducer;
