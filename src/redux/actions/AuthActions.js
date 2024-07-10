import axios from "axios";
import { setToken, setUser } from "../reducers/AuthReducer";
import { VITE_API_URL } from "../../config/config";
import { toastify } from "../../utils/toastify";

// import { toastify } from "../../utils/toastify";

export const login = (email, password, setIsLoading, navigate) => async (dispatch) => {
  try {
    setIsLoading(true);
    const response = await axios.post(`${VITE_API_URL}/auth/login`, {
      email,
      password,
    });
    const { data } = response;
    const { token, role } = data.value;

    dispatch(setToken(token));
    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "user") {
      navigate("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response.data.message ===
        "Akun belum terverifikasi. Periksa email masuk untuk verifikasi kode Otp"
      ) {
        toastify({
          message: error.response.data.message,
          type: "error",
        });
        localStorage.setItem("registeredEmail", email);
        // Navigate to "/otp"
        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      } else {
        toastify({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
    setIsLoading(false);
    // toastify({
    //   message: error?.message,
    //   type: "Error",
    // });
  }
  setIsLoading(false);
};

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const profile =
  (navigate, navigatePathSuccess, navigatePathError) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;

      const response = await axios.get(`${VITE_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data.value);
      const { value } = response.data;
      const data = value;

      dispatch(setUser(data));

      // if navigatePath params is false/null/undefined, it will not executed
      if (navigatePathSuccess) navigate(navigatePathSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If token is not valid
        if (error.response.status === 401) {
          dispatch(logout());
          // if navigatePathError params is false/null/undefined, it will not executed
          if (navigatePathError) navigate(navigatePathError);
          // console.log("eror 401");
          return;
        }
      }
      // toastify({
      //   message: error?.message,
      //   type: "error",
      // });
    }
  };

export const RequestPassword = (email, setIsLoading) => async () => {
  try {
    setIsLoading(true);
    const response = await axios.post(`${VITE_API_URL}/auth/request-reset-password`, {
      email,
    });
    toastify({
      message: response.data.message,
      type: "success",
    });

    setIsLoading(false);
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
    }
    setIsLoading(false);
  }
};

export const register =
  (
    name,
    email,
    phone,
    age,
    gender,
    province,
    city,
    password,
    confPassword,
    setIsLoading,
    navigate
  ) =>
    async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`${VITE_API_URL}/auth/register`, {
          name,
          email,
          phone,
          age,
          gender,
          province,
          city,
          password,
          confPassword,
        });

        if (response.status === 201) {
          const { email } = response.data.value;

          // Menyimpan email ke dalam localStorage
          localStorage.setItem("registeredEmail", email);

          toastify({
            message: response.data.message,
            type: "success",
          });
          setTimeout(() => {
            // Menunggu 2 detik sebelum navigasi ke halaman OTP
            navigate("/otp");
          }, 2000);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toastify({
            message: error.response.data.message,
            type: "error",
          });
        }
        setIsLoading(false);
      }
    };

export const verify = (otp, setIsLoading, navigate) => async () => {
  try {
    setIsLoading(true);
    const registeredEmail = localStorage.getItem("registeredEmail");

    const response = await axios.post(`${VITE_API_URL}/auth/verify-user`, {
      email: registeredEmail, // Menggunakan nilai yang diambil dari local storage
      otp,
    });

    // Check for successful registration
    if (response.status === 200) {
      toastify({
        message: response.data.message,
        type: "success",
      });
      setTimeout(() => {
        // Menunggu 3 detik sebelum navigasi ke halaman Login
        localStorage.removeItem("registeredEmail");
        navigate("/login");
      }, 2000);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
    }
    setIsLoading(false);
  }
};

export const resendOtp = (setIsLoadingResend) => async () => {
  try {
    setIsLoadingResend(true);
    const registeredEmail = localStorage.getItem("registeredEmail");
    const response = await axios.post(`${VITE_API_URL}/auth/resend-otp`, {
      email: registeredEmail, // Menggunakan nilai yang diambil dari local storage
    });

    // Jika suksess akan menampilkan respon
    if (response.status === 200) {
      toastify({
        message: response.data.message,
        type: "success",
      });

      setIsLoadingResend(false);
    }

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
    }
    setIsLoadingResend(false);
  }
};

export const ResetPasswordUser =
  (token, password, confPassword, navigate) => async () => {
    try {
      await axios.post(`${VITE_API_URL}/auth/reset-password`, {
        resetToken: token,
        password,
        confPassword,
      });

      // console.log(token);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastify({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };

export const ChangePasswordUser =
  (oldPassword, newPassword, confPassword) => async (_, getState) => {
    try {
      let { token } = getState().auth;
      // console.log(passwordOld);
      const response = await axios.put(
        `${VITE_API_URL}/auth/change-password`,
        {
          oldPassword,
          newPassword,
          confPassword,
        },
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
          message: error.response.data.message,
          type: "error",
        });
      }
      // toastify({
      //   message: error.message,
      //   type: "error",
      // });
    }
  };

export const UpdateProfile =
  (name, email, phone, city, province, gender, age) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axios.put(
        `${VITE_API_URL}/profile`,
        {
          name,
          email,
          phone,
          city,
          province,
          gender,
          age,
        },
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
      if (token) {
        dispatch(profile());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastify({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };

export const UpdatePicture = (selectedFile) => async (_, getState) => {
  try {
    let { token } = getState().auth;
    const formData = new FormData();
    formData.append("photoProfile", selectedFile);
    await axios.put(
      `${VITE_API_URL}/profile/images`,
      {
        photoProfile: selectedFile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    window.location.reload();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
    }
  }
};

export const registerLoginWithGoogleAction =
  (accessToken, navigate) => async (dispatch) => {
    try {
      const data = JSON.stringify({
        accessToken: accessToken,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${VITE_API_URL}/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.value;

      dispatch(setToken(token));

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastify({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
