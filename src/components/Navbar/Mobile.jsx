import { NavLink, Link, useLocation } from "react-router-dom";

import { IoMdNotificationsOutline } from "react-icons/io";

import PropTypes from "prop-types";
import LoginIcon from "../../assets/log_in.svg";
import { FaHome } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

const Mobile = ({ user }) => {
  const location = useLocation();

  const path = location.pathname;

  return (
    <>
      {path !== "/notification" &&
        path !== "/profile" &&
        path !== "/change-password" &&
        path !== "/history" &&
        path !== "/dashboard" &&
        path !== "/penyakit" && (
          <form
            className="sticky top-0 p-3 sm:p-0 bg-white shadow-lg z-[50] "
            action="search"
          >
            <div
              className="relative mx-auto w-full flex flex-row justify-between sm:hidden "
              style={{ maxWidth: "600px" }}
            >
              <Link as={Link} to="/" className="flex flex-row ">
                <div className="text-xl font-bold flex flex-row">
                  <p className="text-BLUE05">As</p>
                  <p className="text-GREEN01">Tani</p>
                </div>
              </Link>
              <div className="flex flex-row gap-4 mr-[7px]">
                {user ? (
                  <>
                    <Link as={Link} to="/notification" className=" p-[2px]">
                      <IoMdNotificationsOutline className="text-3xl self-center" />
                    </Link>
                  </>
                ) : (
                    <span></span>
                )}
              </div>

              {/* {openSearch && (
                <>
                  <div className=" sm:hidden absolute flex flex-row gap-2 h-full w-full border-0 outline-none rounded-lg  ">
                    <form className="flex flex-row relative  w-full">
                      <input
                        name="search"
                        className=" text-black w-full py-1.5 pr-12 pl-4 border-0 outline-none rounded-lg focus:outline-none 
                                        ring-2  ring-gray-700/50 focus:ring-blue-500 duration-200"
                        type="text"
                        placeholder="Cari Kelas ..."
                        value={keyword}
                        onChange={onKeywordChangeHandler}
                      />
                      <button className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-DARKBLUE05 p-[1px]">
                        <img src={Search} />
                      </button>
                    </form>
                    <button
                      className="bg-white px-2 rounded-lg "
                      onClick={() => setOpenSearch(false)}
                    >
                      <GoX className="text-xl " />
                    </button>
                  </div>
                </>
              )} */}
            </div>
          </form>
        )}

      {path !== "/dashboard" && path !== "/penyakit" && (
        <nav className="sm:hidden flex items-center fixed bg-white border-t z-[50] drop-shadow-2xl shadow-outline border-gray-300 w-full bottom-0 py-4 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex justify-between gap-2.5 items center flex-col text-blue-500"
                : "flex justify-between gap-2.5 items center flex-col"
            }
            style={{ flex: "1" }}
          >
            <FaHome className="text-3xl self-center" />
            <p className="self-center text-sm font-medium h-full align-bottom leading-none">
              Beranda
            </p>
          </NavLink>

          <NavLink
            to="/identifikasi"
            className={({ isActive }) =>
              isActive
                ? "flex justify-between gap-2.5 items center flex-col text-blue-500 "
                : "flex justify-between gap-2.5 items center flex-col"
            }
            style={{ flex: "1" }}
          >
            <FaCamera className="text-3xl self-center" />

            <p className="self-center text-sm font-medium h-full align-bottom leading-none">
              Identifikasi
            </p>
          </NavLink>

          <NavLink
            to="/discussion"
            className={({ isActive }) =>
              isActive
                ? "flex justify-between gap-2.5 items center flex-col text-blue-500 "
                : "flex justify-between gap-2.5 items center flex-col"
            }
            style={{ flex: "1" }}
          >
            <MdForum className="text-3xl self-center" />

            <p className="self-center text-sm font-medium align-bottom leading-none">
              Forum
            </p>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "flex justify-between gap-2.5 items center flex-col text-blue-500 "
                : "flex justify-between gap-2.5 items center flex-col"
            }
            style={{ flex: "1" }}
          >
            <BsFillPersonFill className="text-3xl self-center" />
            <p className="self-center text-sm font-medium align-bottom leading-3">
              Akun
            </p>
          </NavLink>
        </nav>
      )}
    </>
  );
};

Mobile.propTypes = {
  user: PropTypes.object,
};

export default Mobile;
