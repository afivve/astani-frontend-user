/* import { useState } from "react"; */
import {
  /* useNavigate, useSearchParams, */ NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";

import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import PropTypes from "prop-types";
import Persone from "../../assets/persone_plus.svg";
import { FaHome } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { MdForum } from "react-icons/md";

const Desktop = ({ user }) => {
  const location = useLocation();

  const path = location.pathname;

  return (
    <>
      {path !== "/dashboard" &&
        path !== "/penyakit" &&
        path !== "/penyakit/penanganan/:id" && (
          <nav className="hidden  sm:block bg-white drop-shadow-lg sticky top-0 right-0 left-0  z-[999]">
            {/* <div className="bg-DARKBLUE05"> */}
            <div className="container flex justify-between mx-auto py-4 bg-white">
              <NavLink to="/" className="flex flex-row text-2xl font-bold">
                <p className="text-BLUE05">As</p>
                <p className="text-GREEN01">Tani</p>
              </NavLink>

              {/*           <form action="search" onSubmit={onSubmitHandler}>
            <div className="relative md:w-64 lg:w-96">
              <svg
                // xmlns="http://www.w3.org/2000/svg"
                className="rounded-full hidden md:inline absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                name="search"
                className=" hidden sm:inline text-black w-36 md:w-full py-1.5 pr-12 pl-4 border-0 outline-none rounded-md   focus:outline-none 
                                        ring-2  ring-gray-700/50 focus:ring-YELLOW05 duration-200"
                type="text"
                placeholder="Cari Kelas ..."
                value={keyword}
                onChange={onKeywordChangeHandler}
              />
            </div>
          </form> */}
              <div>
                {user ? (
                  <div className="flex h-full items-center gap-4 font-Poppins text-sm font-medium">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-[4px] bg-GREEN01 text-white gap-1.5 h-full pl-2.5 pr-3.5 after:content-['Beranda']"
                          : "px-2"
                      }
                    >
                      <FaHome className="text-lg" />
                    </NavLink>
                    <NavLink
                      to="/identifikasi"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-[4px] bg-GREEN01 text-white gap-1.5 h-full pl-2.5 pr-3.5 after:content-['Identifikasi']"
                          : "px-2"
                      }
                    >
                      <FaCamera className="text-sm" />
                    </NavLink>
                    <NavLink
                      to="/discussion"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-[4px] bg-GREEN01 text-white gap-1.5 h-full pl-2.5 pr-3.5 after:content-['Forum']"
                          : "px-2"
                      }
                    >
                      <MdForum className="text-sm" />
                    </NavLink>
                    <NavLink
                      to="/notification"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-[4px] bg-GREEN01 text-white gap-1.5 h-full pl-2.5 pr-3.5 after:content-['Notifikasi']"
                          : "px-2"
                      }
                    >
                      <IoMdNotificationsOutline className="text-2xl" />
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-[4px] bg-GREEN01 text-white gap-2 h-full pl-2.5 pr-3.5 after:content-['Akun']"
                          : "px-2"
                      }
                    >
                      <BsFillPersonFill className="text-2xl" />
                    </NavLink>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <div className="">
                      <Link
                        to="/login"
                        className=" h-full flex bg-GREEN01 shadow-md text-white px-2 py-1 rounded-md items-center gap-2 text-base"
                        // onClick={onLogin}
                      >
                        <FaArrowRightToBracket />
                        <p className="font-semibold ">Masuk</p>
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        to="/register"
                        className=" h-full flex border-2 shadow-md bg-GREEN01 text-white px-2 py-1 rounded-md items-center gap-2 text-base"
                        // onClick={onLogin}
                      >
                        <img src={Persone} />
                        <p className="font-semibold text-YELLOW05 ">Gabung</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* </div> */}
          </nav>
        )}
    </>
  );
};

Desktop.propTypes = {
  user: PropTypes.object,
};

export default Desktop;
