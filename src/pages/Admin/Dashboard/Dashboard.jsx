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
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { totalUser, totalUserActive, totalPredict, totalPersentasePredict } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(DashboardTotalUser());
    dispatch(DashboardPredict());
    dispatch(DashboardUserActive());
  }, [dispatch]);

  const isCourseTypeAvailable =
    totalPersentasePredict && totalPersentasePredict.length > 0;

  const dataCourseType = {
    datasets: [
      {
        label: "Persentase",
        data: isCourseTypeAvailable
          ? totalPersentasePredict.map((data) => data.percentage)
          : [],
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#800080",
          "#FFC0CB",
          "#00FFFF",
          "#FF00FF",
          "#00FF00",
          "#800000",
          "#000080",
          "#C0C0C0",
          "#808080",
          "#000000",
          "#FFFFFF",
          "#A52A2A",
          "#FFD700",
          "#F0E68C",
          "#00CF6C",
        ],
      },
    ],
    labels: isCourseTypeAvailable
      ? totalPersentasePredict.map((data) => data.diseaseName.toString())
      : [],
  };
  return (
    <div className="flex justify-center">
    <SideBar />
    <div className="w-full lg:w-[85%] mb-14 md:mb-10 bg-white">
      <HeaderAdmin />
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-2 grid-cols-1 w-full container gap-10 mt-16">
          <div className="border-2 flex justify-center w-full bg-[#F6F6F6] px-4 md:py-28 py-16 drop-shadow-xl">
            <div className="flex flex-col items-center">
              <h1 className="font-semibold text-4xl text-center">
                Total Hasil Identifikasi
              </h1>
              <span className="font-bold text-7xl mt-10">{totalPredict}</span>
              <span className="font-semibold text-4xl mt-10 text-center">
                Identifikasi
              </span>
            </div>
          </div>
          {/* <div className="border-2 px-4 py-8 flex flex-col justify-center items-center bg-[#F6F6F6] drop-shadow-xl">
  <h1 className="font-semibold text-4xl text-center mb-8">
    Presentase Hasil Identifikasi
  </h1>
  <div className="w-full flex justify-center items-center mb-8">
    <div className="w-64 h-64">
      <Doughnut data={dataCourseType} />
    </div>
  </div>
</div> */}

          
          <div className="border-2 flex justify-center bg-[#F6F6F6] px-4 md:py-28 py-16 drop-shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h1 className="font-semibold text-4xl">
                User Aktif 7 Hari Terakhir
              </h1>
              <span className="font-bold text-7xl mt-10">{totalUserActive}</span>
              <span className="font-semibold text-4xl mt-10">User</span>
            </div>
          </div>
          <div className="border-2 flex justify-center w-full bg-[#F6F6F6] px-4 md:py-28 py-16 drop-shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h1 className="font-semibold text-4xl">Total User</h1>
              <span className="font-bold text-7xl mt-10">{totalUser}</span>
              <span className="font-semibold text-4xl mt-10">User</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Dashboard;

{/* <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-full text-center">
              {totalPersentasePredict.map((data) => (
                <div key={data.count}> */}
                  {/* <div className="font-semibold">{data.diseaseName}</div> */}
                  {/* <div className="font-bold">{data.percentage}%</div> */}
                {/* </div>
              ))}
            </div> */}