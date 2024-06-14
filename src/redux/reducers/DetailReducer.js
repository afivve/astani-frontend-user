 import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";

const initialState = {
  courseDetail: [],
  contentDetail: [],
  checkCourse: [],
  courseProgress: [],
  testimonial: [],
  error: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setCourseDetail: (state, action) => {
      state.courseDetail = action.payload;
    },
    setContentDetail: (state, action) => {
      state.contentDetail = action.payload;
    },
    setCheckCourse: (state, action) => {
      state.checkCourse = action.payload;
    },
    setCourseProgress: (state, action) => {
      state.courseProgress = action.payload;
    },
    setTestimonial: (state, action) => {
      state.testimonial = action.payload;
    },
    resetContentDetail: (state) => {
      state.contentDetail = initialState.contentDetail;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCourseDetail,
  setContentDetail,
  setCheckCourse,
  setCourseProgress,
  resetContentDetail,
  setTestimonial,
  setError,
} = detailSlice.actions;

export default detailSlice.reducer;
