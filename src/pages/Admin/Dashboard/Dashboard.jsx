import SideBar from "../../../components/SideBar/SideBar";
import HeaderAdmin from "../../../components/Navbar/HeaderAdmin";

const Dashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-[100%] lg:w-[85%] mb-14  bg-white ">
        <HeaderAdmin />
      </div>
    </div>
  );
};

export default Dashboard;
