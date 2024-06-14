// import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ResetPasswordUser } from "../../redux/actions/AuthActions";
import SpinnerLoading from "../../utils/SpinnerLoading";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ResetPasswordUser(token, password, confPassword, navigate));
  };
  console.log(token);
  //fungsi show/hidden password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  //animasi loading setelah button submit diklik
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-WHITE05 justify-center ">
      <div className="w-[100%] lg:w-[60%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
        <form
          onSubmit={handleSubmit}
          className="w-full border-2 rounded-lg shadow-xl px-6 py-8 "
        >
          <h1 className="text-[24px] font-bold  font-Montserrat mb-8">
            Reset Password
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="font-Poppins text-[15px] mb-[4px]">
                  Masukkan Password Baru
                </label>
              </div>
              <div className="relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                  placeholder="********"
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
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="font-Poppins text-[15px] mb-[4px]">
                  Ulangi Password Baru
                </label>
              </div>
              <div className="relative ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                  placeholder="********"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 "
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="border-none" />
                  ) : (
                    <FiEye className="border-none" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            type="submit"
            className="flex items-center justify-center w-full font-Poppins bg-YELLOW05  text-white py-[10px]  mt-5 rounded-xl font-bold"
          >
            {isLoading ? <SpinnerLoading /> : <span>Simpan</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
