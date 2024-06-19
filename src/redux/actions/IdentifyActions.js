import axios from "axios";
import { VITE_API_URL } from "../../config/config";
import { toastify } from "../../utils/toastify";
import {
  setHistoryIdentify,
  setDetailIdentify,
  setIdentify,
  setNotification,
} from "../reducers/IdentifyReducer";
import { DiseaseData } from "./AdminActions";

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

export const Notications = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;
    dispatch(setNotification(value));
  } catch (error) {
    console.log(error);
  }
};

export const AddDiseaseData = (name, cause, solution) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.post(
      `${VITE_API_URL}/disease`,
      {
        name: name,
        caused: cause,
        symtomps: solution,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(DiseaseData());

    toastify({
      message: response.data.message,
      type: "success",
    });
  } catch (error) {
    toastify({
      message: error.response.data.message,
      type: "error",
    });
  }
};

export const DeleteDeseaseById = (id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.delete(`${VITE_API_URL}/disease/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(DiseaseData());
    alert(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
