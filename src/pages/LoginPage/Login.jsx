import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/AuthActions";
import GoogleLogin from "../../components/GoogleLogin/Google";
import SpinnerLoading from "../../utils/SpinnerLoading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //fungsi show/hidden password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(email, password, setIsLoading, navigate));
  };

  return (
    <>
      <div className="flex min-h-screen bg-WHITE05  justify-center">
        <div className="w-[100%] md:w-[60%] flex justify-center items-center mx-[23px] lg:px-[145px] relative   ">
          <div
            // onSubmit={handleLogin}
            className="w-full border-2 rounded-lg shadow-xl px-6 py-8 "
          >
            <form onSubmit={handleLogin}>
              <h1 className="text-[24px] font-bold text-YELLOW05 font-Montserrat mb-8">
                Masuk
              </h1>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label className="font-Poppins text-[15px] mb-[4px]">
                    Email/No Telepon
                  </label>
                  <input
                    type="email"
                    className="border w-full py-3 px-4 rounded-2xl"
                    placeholder="Contoh: johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <label className="font-Poppins text-[15px] mb-[4px]">
                      Password
                    </label>
                  </div>
                  <div className="relative ">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 "
                    >
                      {showPassword ? (
                        <FiEyeOff className="border-none" />
                      ) : (
                        <FiEye className="border-none" />
                      )}
                    </button>
                  </div>
                  <Link to="/verify-email" className="w-full text-end">
                    <span className="font-Poppins text-end text-[11px] text-DARKBLUE05 transition duration-300 ease-in-out hover:underline hover:border-DARKBLUE05">
                      Lupa Kata Sandi
                    </span>
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full font-Poppins bg-YELLOW05 text-white py-[10px] rounded-xl mt-5 hover:bg-YELLOW05 font-bold shadow-md"
              >
                {isLoading ? <SpinnerLoading /> : <span>Masuk</span>}
              </button>
            </form>
            <div className="flex justify-center items-center gap-2 mt-6">
              <h1 className="font-Poppins text-[14px] font-normal">
                Belum punya akun?
              </h1>
              <Link
                to="/register"
                className="font-Poppins text-DARKBLUE05 text-[14px] font-bold transition duration-300 ease-in-out hover:underline hover:border-DARKBLUE05"
              >
                Daftar di sini
              </Link>
            </div>
            <div className="relative mt-6 flex w-full items-center justify-center border border-t">
              <div className="absolute bg-WHITE05 px-5">or</div>
            </div>

            <div className="flex cursor-pointer shadow-md border-YELLOW05 font-semibold rounded-lg mt-5 flex-row py-2 gap-1 justify-center items-center w-full border-2">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
