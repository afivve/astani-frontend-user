import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="hidden  lg:flex gap-12   flex-col bg-GREEN01 w-[15%] min-h-screen py-12 font-Montserrat">
      <div className="flex flex-row justify-center text-4xl font-bold ">
        <p className="text-BLUE05">As</p>
        <p className="text-white">Tani</p>
      </div>
      <div className="flex flex-col text-base font-semibold text-white font-Montserrat ">
        <Link as={Link} to="/dashboard" className="text-start  w-full px-10 py-1 ">
          Dashboard
        </Link>
        <Link as={Link} to="/penyakit" className="text-start  w-full px-10 py-1 mt-2">
          Data Penyakit
        </Link>
        <Link as={Link} to="/history-user" className="text-start  w-full px-10 py-1 mt-2">
          Riwayat Aktif
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
