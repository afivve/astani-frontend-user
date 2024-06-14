import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input";
import { useState, useEffect } from "react";
import { resendOtp, verify } from "../../redux/actions/AuthActions";
import SpinnerLoading from "../../utils/SpinnerLoading";

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(300); // Hitungan mundur awal
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingresend, setIsLoadingResend] = useState(false);

  const email = localStorage.getItem("registeredEmail"); //ambil value email sebelumnya

  // fungsi merubah format email
  const maskEmail = (email) => {
    if (!email) return null; // Handle null or undefined email
    const [localPart, domain] = email.split("@");
    const maskedLocalPart =
      localPart.slice(0, 2) + "*".repeat(localPart.length - 1);
    return `${maskedLocalPart}@${domain}`;
  };
  const maskedEmail = maskEmail(email);

  const validateOtp = (otpValue) => {
    // membatasi input berupa angka
    const numberValue = otpValue.replace(/[^\d]/g, "");

    // membatasi inputan nomor menjadi 6
    const maxLength = 6;
    const truncatedValue = numberValue.slice(0, maxLength);

    setOtp(truncatedValue);
  };

  //  Mengubah format menit dan detik
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    // Menunda hitungan mundur selama 3 detik sebelum dimulai
    const initialTimer = setTimeout(() => {
      // Mengecek apakah hitungan mundur sudah 0
      if (resendTimer > 0) {
        const timer = setInterval(() => {
          setResendTimer((prev) => prev - 1); // Mengurangi hitungan mundur setiap detik
        }, 1000);

        // Membersihkan timer setelah hitungan mundur mencapai 0
        return () => clearInterval(timer);
      }
    }, 2500);

    return () => clearTimeout(initialTimer);
  }, [resendTimer]);

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    dispatch(verify(otp, setIsLoading, navigate));
  };

  const handleResendOtp = () => {
    dispatch(resendOtp(setIsLoadingResend));
  };

  return (
    <>
      <div className="flex min-h-screen bg-WHITE05 justify-center">
        <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] relative ">
          <form
            onSubmit={handleSubmitOtp}
            className="w-full border-2 rounded-lg shadow-xl px-6 py-6 bg-YELLOW04"
          >
            <div>
              <h1 className="text-[26px] self-center font-bold text-ALERTRED my-5  text-center">
                Masukkan OTP
              </h1>
            </div>

            {email ? (
              // Render OTP input dan tombol resend button
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label className="font-Poppins text-[14px] my-[20px] text-center">
                    Ketik 6 digit kode yang dikirimkan ke{" "}
                    <span className="font-bold">{maskedEmail}</span>
                  </label>
                  <OTPInput
                    value={otp}
                    onChange={validateOtp}
                    numInputs={6}
                    containerStyle="my-6 flex justify-center items-center gap-[6px] lg:gap-[16px]"
                    inputStyle={{
                      width: "42px",
                      height: "42px",
                      border: "1px solid #10b981",
                      borderRadius: "16px",
                    }}
                    renderInput={(props, index) => (
                      <input {...props} value={otp[index] || ""} />
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  {resendTimer > 0 ? (
                    <label className="font-Poppins text-[13px] mb-[20px] text-center">
                      Kirim Ulang OTP dalam{" "}
                      <span className="font-bold">
                        {formatTime(resendTimer)} detik
                      </span>
                    </label>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleResendOtp()}
                      className="font-Poppins text-[13px] text-ALERTRED font-bold underline mb-[20px] text-center cursor-pointer"
                    >
                      {isLoadingresend ? "Loading...." : "Kirim Ulang OTP"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              // Merender jika email tidak ada di local storage
              <div className="mt-[65px] font-Poppin text-[18px] font-medium text-center text-ALERTRED">
                Data diri tidak ditemukan.
                <p>Silahkan melengkapi data diri terlebih dahulu!</p>
                <div className="mt-[45px]">
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-1 font-Poppin font-bold text-[14px] text-blue-500 hover:underline hover:border-DARKBLUE05"
                  >
                    Halaman Masuk
                  </Link>
                  <div className="relative mt-4 flex w-full items-center justify-center border border-t">
                    <div className="absolute text-black font-Poppin text-[13px] px-5 bg-YELLOW04">
                      atau
                    </div>
                  </div>
                  <Link
                    to="/register"
                    className="mt-4 flex items-center justify-center px-4 py-1 font-Poppin font-bold text-[14px] text-blue-500 hover:underline hover:border-DARKBLUE05"
                  >
                    Halaman Daftar
                  </Link>
                </div>
              </div>
            )}

            {/* Render the button only if email is present */}
            {email && (
              <button className="flex items-center justify-center w-full font-Poppin text-[16px] font-semibold bg-YELLOW05  text-white py-[10px] rounded-xl mt-5 ">
                {isLoading ? <SpinnerLoading /> : "Verifikasi"}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;
