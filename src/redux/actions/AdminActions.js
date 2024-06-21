import {
  setDisease,
  setHandlingDisease,
  setLiteraturDisease,
  setYoutubeDisease,
  setNameDisease,
  setHistoryUser,
  setTotalUser,
  setTotalUserActive,
  setTotalPredict,
  setTotalPersentasePredict,
  setDiseaseId,
  setHandlingDiseaseId,
  setLiteraturDiseaseId,
  setYoutubeDiseaseId,
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
export const HandlingDiseaseIdData = (idPenanganan) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/disease-solution/${idPenanganan}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { action } = response.data.value;
    dispatch(setHandlingDiseaseId(action));
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
export const EditSolutionData =
  (name, id, idPenanganan) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axios.put(
        `${VITE_API_URL}/disease-solution/${idPenanganan}`,
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
export const LiteraturIdData = (idLiteratur) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(
      `${VITE_API_URL}/disease-literatur/${idLiteratur}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { link } = response.data.value;

    dispatch(setLiteraturDiseaseId(link));
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
export const EditLiteraturData =
  (name, idLiteratur, id) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axios.put(
        `${VITE_API_URL}/disease-literatur/${idLiteratur}`,
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
export const GetYoutubeDataId = (idYt) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/disease-youtube/${idYt}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { link } = response.data.value;
    dispatch(setYoutubeDiseaseId(link));
  } catch (error) {
    toastify({
      message: error.response.data.message,
      type: "error",
    });
  }
};

export const DashboardTotalUser = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/dashboard/total-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setTotalUser(response.data.value.totalUser));
  } catch (error) {
    console.log(error);
  }
};

export const DashboardUserActive = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/dashboard/last-seven-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setTotalUserActive(response.data.value.totalUser));
  } catch (error) {
    console.log(error);
  }
};
export const DashboardTotalIdentifikasi = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/dashboard/total-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setTotalUser(response.data.value.message));
  } catch (error) {
    console.log(error);
  }
};

export const DashboardPredict = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/dashboard/result-precentage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;

    dispatch(setTotalPredict(response.data.totalPredict));
    dispatch(setTotalPersentasePredict(value));
  } catch (error) {
    console.log(error);
  }
};

export const DisaeseByIdData = (id) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/disease/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { name, symtomps, caused } = response.data.value;

    const data = { name, symtomps, caused };
    dispatch(setDiseaseId(data));
  } catch (error) {
    console.log(error);
  }
};

export const EditeDiseaseData =
  (name, cause, solution, id, setModal) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axios.put(
        `${VITE_API_URL}/disease/${id}`,
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

      if (response.data.status === "success") {
        setModal(false);
      }
    } catch (error) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
    }
  };
