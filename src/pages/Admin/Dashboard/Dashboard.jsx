import SideBar from "../../../components/SideBar/SideBar";
import HeaderAdmin from "../../../components/Navbar/HeaderAdmin";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  DashboardPredict,
  DashboardTotalUser,
  DashboardUserActive,
} from "../../../redux/actions/AdminActions";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { totalUser, totalUserActive, totalPredict, totalPersentasePredict } =
    useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(DashboardTotalUser());
    dispatch(DashboardPredict());
    dispatch(DashboardUserActive());
  }, [dispatch]);

  // const isCourseTypeAvailable =
  //   totalPersentasePredict && totalPersentasePredict.length > 0;

  // const dataCourseType = {
  //   labels: isCourseTypeAvailable
  //     ? totalPersentasePredict.map((data) => data.typeName.toString())
  //     : [],
  //   datasets: [
  //     {
  //       label: "Banyak Kelas",
  //       data: isCourseTypeAvailable
  //         ? totalPersentasePredict.map((data) => data.totalCourse)
  //         : [],
  //       backgroundColor: ["#00CF6C", "#FF0000"],
  //     },
  //   ],
  // };
  return (
    <div className="flex justify-center">
      <SideBar />
      <div className="w-[100%] lg:w-[85%] mb-14 md:mb-10  bg-white ">
        <HeaderAdmin />
        <div className="flex justify-center">
          <div className="grid sm:grid-cols-2 grid-cols-1 w-full container gap-10 mt-16">
            <div className="border-2 flex justify-center w-full  bg-[#F6F6F6] px-4 md:py-28 py-16 drop-shadow-xl">
              <div className="flex flex-col items-center">
                <h1 className="font-semibold text-2xl text-center">
                  Total Hasil Identifikasi
                </h1>
                <span className="font-bold text-7xl mt-6">{totalPredict}</span>
                <span className="font-semibold text-2xl mt-4 text-center">
                  Identifikasi
                </span>
              </div>
            </div>
            {/* <div className="border-2  flex justify-center  bg-[#F6F6F6] py-28 drop-shadow-xl">
            <Doughnut data={dataCourseType} />
            {totalPersentasePredict.map((data) => (
              <div key={data.count}>
                <div>{data.diseaseName}</div>
                <div>{data.percentage}%</div>
              </div>
            ))}
          </div> */}
            <div className="border-2  flex justify-center w-full  bg-[#F6F6F6] px-4 md:py-28 py-16 drop-shadow-xl">
              <div className="flex flex-col items-center text-center">
                <h1 className="font-semibold text-2xl ">Total User</h1>
                <span className="font-bold text-7xl mt-6">{totalUser}</span>
                <span className="font-semibold text-2xl mt-4">User</span>
              </div>
            </div>
            <div className="border-2  flex justify-center  bg-[#F6F6F6] px-4 md:py-28 py-16 drop-shadow-xl">
              <div className="flex flex-col items-center text-center">
                <h1 className="font-semibold text-2xl">User Aktif 7 Hari Terakhir</h1>
                <span className="font-bold text-7xl mt-6">{totalUserActive}</span>
                <span className="font-semibold text-2xl mt-4">User</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
