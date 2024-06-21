import axios from "axios";
import { toastify } from "../../utils/toastify";
import { VITE_API_URL } from "../../config/config";
import {
  setCategory,
  setPopular,
  setHistory,
  setNotification,
  setHasil,
  setFilter,
  setData,
  setErrors,
  setPage,
  setMyCourse,
  setTotalPage,
  setGetData,
  setDiscussion,
  setDetailDiscussion,
  setComentar,
  setCoursePromo,
  setDiscussionToEdit,
} from "../reducers/CourseReducer";

export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/course-categories`);

    const { value } = response.data;
    dispatch(setCategory(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response.data.message);
    }
  }
};

export const getPopular = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?popular=true`);

    const { value } = response.data;

    dispatch(setPopular(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response.data.message);
    }
  }
};

export const HistoryUser = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;
    dispatch(setHistory(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response.data.message);
    }
  }
};

export const NotificationUser = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    dispatch(setNotification(data.value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response.data.message);
    }
  }
};

export const getCourse = (pageNumber) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?page=${pageNumber}`);
    const { data } = response;
    dispatch(setHasil(data.value));
    const pageArray = [];
    for (let index = 1; index <= data.totalPage; index++) {
      pageArray.push(index);
    }
    dispatch(setPage(pageArray));
  } catch (error) {
    if (error.response.status === 404) {
      dispatch(setErrors("Tidak ada kelas yang diambil"));
    } else {
      console.log(error?.response?.data?.message);
    }
  }
};

export const getSearchCourse = (pageNumber, nameCourse) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?search=${nameCourse}`);
    const { data } = response;
    dispatch(setData(data.value));
    const pageArray = [];
    for (let index = 1; index <= data.totalPage; index++) {
      pageArray.push(index);
    }
    dispatch(setPage(pageArray));
  } catch (error) {
    if (error.response.status === 404) {
      dispatch(setErrors("Tidak ada kelas yang diambil"));
    } else {
      console.log(error.response.data.message);
    }
  }
};

export const filterData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/course-categories`);
    const { data } = response;
    dispatch(setFilter(data.value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    toastify({
      message: error?.message,
      type: "error",
    });
  }
};

export const getDiscussion = (search, pageNumber) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const response = await axios.get(`${VITE_API_URL}/discussions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: search,
        page: pageNumber,
      },
    });
    const { value } = response.data;
    dispatch(setGetData(response.data));

    dispatch(setDiscussion(value));
    // const pageArray = [];
    // for (let index = 1; index <= data.totalPage; index++) {
    //   pageArray.push(index);
    // }
    dispatch(setPage(response.data.totalPage));
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setErrors("Silahkan login untuk melihat kelas yang diambil"));
    } else if (error.response.status === 404) {
      dispatch(setErrors("Tidak ada kelas yang diambil"));
    }
  }
};
export const getDetailDiscussion = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const response = await axios.get(`${VITE_API_URL}/discussions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { commentars } = response.data.value;
    const { title, urlPhoto, question } = response.data.value;

    const edite = { title, urlPhoto, question };
    dispatch(setDetailDiscussion(response.data.value));
    dispatch(setComentar(commentars));
    dispatch(setDiscussionToEdit(edite));
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setErrors("Silahkan login untuk melihat kelas yang diambil"));
    } else if (error.response.status === 404) {
      dispatch(setErrors("Tidak ada kelas yang diambil"));
    }
  }
};
export const editDiscussion = (id, discussionId) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const response = await axios.get(`${VITE_API_URL}/discussions/${discussionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response;
    dispatch(setDiscussionToEdit(data.value));
  } catch (error) {
    console.log(error);
  }
};
export const addDiscussion =
  (judul, pertanyaan, gambar) => async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const formData = new FormData();
      formData.append("title", judul);
      formData.append("question", pertanyaan);
      formData.append("photoDiscussion", gambar);
      console.log(gambar);
      await axios.post(
        `${VITE_API_URL}/discussions`,
        {
          title: judul,
          question: pertanyaan,
          photoDiscussion: gambar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toastify({
        message: "Pertanyaan berhasil di buat ",
        type: "success",
      });
      dispatch(getDiscussion());
    } catch (error) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
    }
  };
export const addComment = (jawaban, gambar, id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const formData = new FormData();
    formData.append("photoCommentar", gambar);
    await axios.post(
      `${VITE_API_URL}/discussions/${id}/commentar`,
      {
        commentar: jawaban,
        photoCommentar: gambar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toastify({
      message: "Commentar berhasil di buat ",
      type: "success",
    });
    dispatch(getDetailDiscussion(id));
  } catch (error) {
    console.log(error);
  }
};
export const Selesai = (id, idDiskusi) => async (_, getState) => {
  const { token } = getState().auth;
  try {
    await axios.put(
      `${VITE_API_URL}/courses/${id}/discussions`,
      {
        discussionId: idDiskusi,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
    toastify({
      message: "Commentar berhasil di tutup ",

      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCourseFree = (courseId, navigate) => async (_, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.post(
      `${VITE_API_URL}/orders/${courseId}/free`,
      {},
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
    if (response.status === 201) {
      navigate("/my-course");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
  }
};

export const checkbox =
  (typeButton, selectedCheckboxes, selectedLevel, typeCourse, linkFilter, pageNumber) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/${linkFilter}?page=${pageNumber}`,
        {
          params: {
            type: typeButton,
            category: selectedCheckboxes,
            level: selectedLevel,
            ...typeCourse.reduce((acc, value) => {
              acc[value] = true;
              return acc;
            }, {}),
          },
        }
      );
      const { data } = response;
      dispatch(setData(data.value));
      const pageArray = [];
      for (let index = 1; index <= data.totalPage; index++) {
        pageArray.push(index);
      }
      dispatch(setTotalPage(data.totalPage));
      dispatch(setPage(pageArray));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setErrors("kelas yang di pilih tidak ada"));
      }
    }
  };

export const searchCheckbox =
  (typeButton, selectedLevel, typeCourse, nameCourse) => async (dispatch) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/courses?search=${nameCourse}`, {
        params: {
          type: typeButton,
          level: selectedLevel,
          ...typeCourse.reduce((acc, value) => {
            acc[value] = true;
            return acc;
          }, {}),
        },
      });
      const { data } = response;
      dispatch(setData(data.value));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setErrors("kelas yang di pilih tidak ada"));
      }
    }
  };

export const myCheckbox =
  (status, selectedCategory, selectedLevel, typeCourse, pageNumber) =>
  async (dispatch, getState) => {
    let { token } = getState().auth;
    try {
      const response = await axios.get(`${VITE_API_URL}/user-courses`, {
        params: {
          page: pageNumber,
          learningStatus: status,
          category: selectedCategory,
          level: selectedLevel,
          ...typeCourse.reduce((acc, value) => {
            acc[value] = true;
            return acc;
          }, {}),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const coursesData = response.data.value;
      dispatch(setMyCourse(coursesData));
      const { data } = response;
      const pageArray = [];
      for (let index = 1; index <= data.totalPage; index++) {
        pageArray.push(index);
      }
      dispatch(setTotalPage(data.totalPage));
      dispatch(setPage(pageArray));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setErrors("kelas yang di pilih tidak ada"));
      }
    }
  };
export const getCoursePromo = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(
      `${VITE_API_URL}/courses?limit=10&page=1&promo=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(setCoursePromo(response.data.value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error?.response?.data?.message);
    }
  }
};
export const getCoursePremium =
  (setIsLoading, navigate, paymentMethod, courseId) => async (_, getState) => {
    try {
      let { token } = getState().auth;
      setIsLoading(true);
      console.log(setIsLoading);
      console.log(navigate);
      console.log(paymentMethod);
      console.log(courseId);

      const response = await axios.post(
        `${VITE_API_URL}/orders/${courseId}/premium`,
        {
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/payment-success");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
          toastify({
            message: error?.response?.data?.message,
            type: "error",
          });
        }
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };
export const updateDiscussion =
  (idDiskusi, judul, pertanyaan, gambar) => async (_, getState) => {
    const { token } = getState().auth;
    try {
      const formData = new FormData();
      formData.append("photoDiscussion", gambar);
      await axios.put(
        `${VITE_API_URL}/discussions/${idDiskusi}`,
        {
          title: judul,
          question: pertanyaan,
          photoDiscussion: gambar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      toastify({
        message: "Berhasil Update Diskusi",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
