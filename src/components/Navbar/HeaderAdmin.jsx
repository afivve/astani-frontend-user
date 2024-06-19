import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "../../assets/hamburger.svg";
import LeaveIcon from "../../assets/leave.svg";
import { useSelector } from "react-redux";

const HeaderAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //   const [dropDown, setDropDown] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="w-full shadow-xl">
      <div className="w-full mx-auto py-6 bg-LightBlue5 flex justify-center">
        <div className="flex flex-row justify-between container items-center">
          <div className="flex items-center font-Montserrat text-2xl text-GREEN01 font-bold gap-2">
            Hi {user?.name}
          </div>
          <button className="lg:hidden" onClick={handleToggleSidebar}>
            <img src={HamburgerIcon} alt="Hamburger Icon" />
          </button>
          <div className="hidden lg:block">
            <button
              //   onClick={handleLogout}
              className="flex flex-row font-Montserrat font-semibold gap-1"
            >
              <img src={LeaveIcon} />
              <p>Keluar</p>
            </button>
          </div>
          {/* Sidebar Content */}
          <div
            className={`lg:hidden lg:w-1/2 h-full  ${
              isSidebarOpen ? "block" : "hidden"
            } fixed top-0 right-0  bg-GREEN01 z-50 p-8 shadow-md`}
          >
            <div className="flex flex-col gap-6 w-full ">
              <div>
                <button
                  onClick={handleToggleSidebar}
                  className="flex flex-row justify-between font-Montserrat font-bold gap-1 text-black"
                >
                  <div className="flex flex-row justify-center text-4xl font-bold ">
                    <p className="text-BLUE05">As</p>
                    <p className="text-white">Tani</p>
                  </div>
                </button>
              </div>
              <div className="flex flex-col text-base font-semibold text-white font-Montserrat ">
                <Link as={Link} to="/" className="text-start  w-full  py-1 ">
                  Dashboard
                </Link>
                <Link
                  as={Link}
                  to="/data-payment"
                  className="text-start  w-full  py-1 mt-2"
                >
                  Data Penyakit
                </Link>
              </div>
              <div className="none lg:hidden absolute bottom-10">
                <button
                  //   onClick={handleLogout}
                  className="flex flex-row font-Montserrat font-semibold gap-1"
                >
                  {/* <img src={LeaveIcon} /> */}
                  <p className="text-RED05">Keluar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderAdmin;
