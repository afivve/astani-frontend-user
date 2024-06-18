import {
  setDisease,
  setHandlingDisease,
  setLiteraturDisease,
  setYoutubeDisease,
  setNameDisease,
  setHistoryUser,
} from "../reducers/AdminReducers";
import { VITE_API_URL } from "../../config/config";
import axios from "axios";

export const DiseaseData = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/disease`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;

    dispatch(setDisease(value));
    dispatch(setNameDisease(response.data.diseaseName));
  } catch (error) {
    console.log(error);
  }
};

export const HandlingDiseaseData = (id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/disease/${id}/disease-solution`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;
    dispatch(setHandlingDisease(value));
    dispatch(setNameDisease(response.data.diseaseName));
  } catch (error) {
    console.log(error);
  }
};

export const LiteraturDiseaseData = (id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/disease/${id}/disease-literatur`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { value } = response.data;

    dispatch(setLiteraturDisease(value));
    dispatch(setNameDisease(response.data.diseaseName));
  } catch (error) {
    console.log(error);
  }
};

export const YoutubeDiseaseData = (id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/disease/${id}/disease-youtube`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;

    dispatch(setYoutubeDisease(value));
    dispatch(setNameDisease(response.data.diseaseName));
  } catch (error) {
    console.log(error);
  }
};

export const HistoryUserData = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(`${VITE_API_URL}/predict-histories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setHistoryUser(response.data));
  } catch (error) {
    console.log(error);
  }
};
