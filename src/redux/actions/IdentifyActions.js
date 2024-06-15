import axios from "axios";
import { VITE_API_URL } from "../../config/config";
// import { toastify } from "../../utils/toastify";
import {
  setHistoryIdentify,
  setDetailIdentify,
  setIdentify,
} from "../reducers/IdentifyReducer";

export const HistoryIdentify = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(`${VITE_API_URL}/predict-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;
    console.log(value);

    dispatch(setHistoryIdentify(value));
  } catch (error) {
    console.log(error);
  }
};

export const DetailIndentify = (id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(`${VITE_API_URL}/predict-history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;

    dispatch(setDetailIdentify(value));
  } catch (error) {
    console.log(error);
  }
};

export const Indentify = (fileObj, setLoading) => async (dispatch, getState) => {
  setLoading(true);
  try {
    setLoading(true);
    let { token } = getState().auth;

    const formData = new FormData();
    formData.append("file", fileObj);

    const response = await axios.post(
      `${VITE_API_URL}/predict-dummy`,
      {
        file: fileObj,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { value } = response.data;

    dispatch(setIdentify(value));
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};
