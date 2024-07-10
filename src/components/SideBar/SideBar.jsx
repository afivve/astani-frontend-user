import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="hidden lg:flex gap-12 flex-col bg-GREEN01 w-[15%] min-h-screen py-12 font-Montserrat">
      <NavLink to="/dashboard" className="flex flex-row justify-center text-4xl font-bold">
        <p className="text-BLUE05">As</p>
        <p className="text-white">Tani</p>
      </NavLink>
      <div className="flex flex-col text-base font-semibold text-white font-Montserrat">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-start w-full px-10 py-1 text-black" : "text-start w-full px-10 py-1"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/penyakit"
          className={({ isActive }) =>
            isActive ? "text-start w-full px-10 py-1 mt-2 text-black" : "text-start w-full px-10 py-1 mt-2"
          }
        >
          Data Penyakit
        </NavLink>
        <NavLink
          to="/history-user"
          className={({ isActive }) =>
            isActive ? "text-start w-full px-10 py-1 mt-2 text-black" : "text-start w-full px-10 py-1 mt-2"
          }
        >
          Riwayat User
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
