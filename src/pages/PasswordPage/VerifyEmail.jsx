import { useState } from "react";
import { useDispatch } from "react-redux";
import { RequestPassword } from "../../redux/actions/AuthActions";
import ArrowIcon from "../../assets/arrow_left_black.svg";
import { Link } from "react-router-dom";
import SpinnerLoading from "../../utils/SpinnerLoading";

const VerifyEmail = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(RequestPassword(email, setIsLoading));
  };

  return (
    <div className="flex min-h-screen bg-WHITE05 justify-center ">
      <div className="w-[100%] lg:w-[60%]  flex justify-start items-center mx-[23px] lg:px-[145px] relative ">
        <form
          onSubmit={handleSubmit}
          className="w-full border-2 rounded-lg shadow-xl px-6 py-8"
        >
          <Link as={Link} to="/login">
            <img src={ArrowIcon} />
          </Link>
          <h1 className="text-[24px] font-bold  font-Montserrat mb-8 mt-4">
            Verifikasi Email
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="font-Poppins text-[15px] mb-[4px]">
                  Masukkan Email
                </label>
              </div>
              <input
                type="email"
                className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                placeholder="Contoh: wynn@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full font-Poppins bg-YELLOW05 font-bold text-white py-[10px] rounded-2xl mt-5 "
          >
            {isLoading ? <SpinnerLoading /> : <span>Kirim</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
