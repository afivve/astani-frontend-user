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
import { toastify } from "../../utils/toastify";

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

    dispatch(setHistoryUser(response.data.value));
  } catch (error) {
    console.log(error);
  }
};

export const AddSolutionData = (name, id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.post(
      `${VITE_API_URL}/disease/${id}/disease-solution`,
      {
        action: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(HandlingDiseaseData(id));

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

export const DeleteSolutionData = (idSolution, id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.delete(
      `${VITE_API_URL}/disease-solution/${idSolution}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(HandlingDiseaseData(id));

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

export const AddLiteraturData = (name, id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.post(
      `${VITE_API_URL}/disease/${id}/disease-literatur`,
      {
        link: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(LiteraturDiseaseData(id));

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

export const DeleteLiteraturData = (idLiteratur, id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.delete(
      `${VITE_API_URL}/disease-literatur/${idLiteratur}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(LiteraturDiseaseData(id));

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

export const AddYoutubeData = (name, id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.post(
      `${VITE_API_URL}/disease/${id}/disease-youtube`,
      {
        link: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(YoutubeDiseaseData(id));

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

export const DeleteYoutubeData = (idYT, id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.delete(`${VITE_API_URL}/disease-youtube/${idYT}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(YoutubeDiseaseData(id));

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
