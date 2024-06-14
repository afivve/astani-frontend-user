import axios from "axios";
import { VITE_API_URL } from "../../config/config";
import { toastify } from "../../utils/toastify";
import {
  setCourseDetail,
  setCheckCourse,
  setContentDetail,
  setTestimonial,
  setError,
} from "../reducers/DetailReducer";
import {} from "../reducers/DetailReducer";

export const getCourseDetail =
  (courseId, isLoggedIn) => async (dispatch, getState) => {
    try {
      let response;
      let { token } = getState().auth;

      if (isLoggedIn) {
        response = await axios.get(`${VITE_API_URL}/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.get(`${VITE_API_URL}/courses/${courseId}`);
      }

      const { value } = response.data;
      const data = value;
      dispatch(setCourseDetail(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setCourseDetail([]));
      }
    }
  };

export const getContentDetail =
  (courseId, moduleId, contentId, isLoggedIn) => async (dispatch, getState) => {
    try {
      let response;
      let { token } = getState().auth;

      if (isLoggedIn) {
        response = await axios.get(
          `${VITE_API_URL}/courses/${courseId}/modules/${moduleId}/contents/${contentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("================================", response)
      } else {
        response = await axios.get(
          `${VITE_API_URL}/courses/${courseId}/modules/${moduleId}/contents/${contentId}`
        );
      }

      const { value } = response.data;
      const data = value;
      dispatch(setContentDetail(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setContentDetail(null));
        if (error.response.status === 401) {
          dispatch(setError(error.response.data.message));
        }
        if (error.response.status === 403) {
          dispatch(setError(error?.response?.data?.message));
        }
      }
    }
  };

export const getCheckCourse = (courseId) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(
      `${VITE_API_URL}/check/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    dispatch(setCheckCourse(data));
  } catch (error) {
    dispatch(setCheckCourse(null));
  }
};

export const getTestimonial = (courseId) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(
      `${VITE_API_URL}/course-testimonials/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { value } = response.data;
    const data = value;
    dispatch(setTestimonial(data));
  } catch (error) {
    dispatch(setTestimonial([]));
  }
};

export const postTestimonial =
  (courseId, testimonial, rating) => async (_, getState) => {
    try {
      let { token } = getState().auth;

      const response = await axios.post(
        `${VITE_API_URL}/course-testimonials/${courseId}`,
        { testimonial, rating: Number(rating) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toastify({
        message: response.data.message,
        type: "success",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastify({
          message: error?.response?.data?.message,
          type: "error",
        });
      }
    }
  };

export const postCertificate = (courseId) => async (_, getState) => {
  try {
    let { token } = getState().auth;

    await axios.post(
      `${VITE_API_URL}/courses/${courseId}/certificates`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
  }
};
