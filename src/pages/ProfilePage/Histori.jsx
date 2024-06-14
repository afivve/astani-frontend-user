import { Link, useNavigate } from "react-router-dom";
import EditeIcon from "../../assets/edit.svg";
import SettingIcon from "../../assets/setting.svg";
import ShopIcon from "../../assets/shopping_card.svg";
import LogoutIcon from "../../assets/log_out.svg";
import CardHistori from "../../components/card/CardHistori";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/AuthActions";
import { useEffect } from "react";
import { HistoryUser } from "../../redux/actions/CourseActions";

const Histori = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { history } = useSelector((state) => state.course);

  useEffect(() => {
    if (token) {
      dispatch(HistoryUser());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="mx-auto w-full bg-white ">
        <div className="relative ">
          <div className="absolute  flex justify-center mt-6  top-0 left-0 right-0 bottom-0 ">
            <div className="container flex flex-col  ">
              <div className=" container flex flex-col  ">
                <div className="lg:hidden">
                  <div className="flex flex-row rounded-lg  bg-NEUTRAL02 border-2 border-DARKBLUE05">
                    <Link
                      as={Link}
                      to="/profile"
                      className=" py-[24px] w-full  border-r-2 border-DARKBLUE05 justify-center items-center flex"
                    >
                      <img src={EditeIcon} />
                    </Link>
                    <Link
                      as={Link}
                      to="/change-password"
                      className="py-[24px] w-full  justify-center items-center flex  border-r-2 border-DARKBLUE05"
                    >
                      <img src={SettingIcon} />
                    </Link>
                    <Link
                      as={Link}
                      to="/history"
                      className="py-[24px] bg-NEUTRAL05 w-full justify-center items-center flex  border-r-2 border-DARKBLUE05"
                    >
                      <img src={ShopIcon} />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-[24px] w-full  justify-center items-center flex  border-r-2 border-DARKBLUE05"
                    >
                      <img src={LogoutIcon} />
                    </button>
                  </div>
                </div>
                <div className=" flex flex-row gap-10   py-4 rounded-b-2xl mb-12 bg-white">
                  <div className="hidden lg:block lg:w-[40%] lg:pr-16 font-Montserrat">
                    <div className="flex flex-col ">
                      <Link
                        as={Link}
                        to="/profile"
                        className="flex flex-row py-3 gap-2 border-b-2"
                      >
                        <img src={EditeIcon} />
                        <div>Profile Saya</div>
                      </Link>
                      <Link
                        as={Link}
                        to="/change-password"
                        className="flex flex-row py-3 gap-2 border-b-2  "
                      >
                        <img src={SettingIcon} />
                        <div>Ubah Password</div>
                      </Link>
                      <Link
                        as={Link}
                        to="/history"
                        className="flex flex-row py-3 gap-2 border-b-2  font-bold text-YELLOW05"
                      >
                        <img src={ShopIcon} />
                        <div>Riwayat Pembelian</div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex flex-row py-3 gap-2 border-b-2"
                      >
                        <img src={LogoutIcon} />
                        <div>Keluar</div>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col lg:w-[60%]   py-4 w-full gap-6 lg:px-10 px-4 border-2 rounded-md shadow-lg">
                    <div className="border-b-2 pb-2 font-Montserrat font-bold text-xl">
                      Riwayat Pembayaran
                    </div>
                    {history.length > 0 ? (
                      history.map((data) => (
                        <CardHistori key={data.id} data={data} />
                      ))
                    ) : (
                      <p className="text-center font-Montserrat font-bold">
                        Tidak ada history pembelian
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Histori;
