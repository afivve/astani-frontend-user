// import { MdDelete } from "react-icons/md";
// import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../../components/SideBar/SideBar";
import HeaderAdmin from "../../../components/Navbar/HeaderAdmin";
import { HistoryUser } from "../../../data/DataPenyakit";
import { HistoryUserData } from "../../../redux/actions/AdminActions";
import { Pagination } from "flowbite-react";

const HistooryUser = () => {
  const dispatch = useDispatch();

  const { historyUser, totalPage } = useSelector((state) => state.admin);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(HistoryUserData(currentPage));
  }, [dispatch, currentPage]);

  // const calculateRelativeTime = (time) => {
  //   const now = new Date();
  //   const differenceInMinutes = Math.floor((now - new Date(time)) / 60000); // difference in minutes

  //   if (differenceInMinutes < 1) return "Baru saja";
  //   if (differenceInMinutes < 60) return `${differenceInMinutes} menit yang lalu`;

  //   const differenceInHours = Math.floor(differenceInMinutes / 60);
  //   if (differenceInHours < 24) {
  //     const minutes = differenceInMinutes % 60;
  //     if (minutes === 0) return `${differenceInHours} jam yang lalu`;
  //     return `${differenceInHours} jam ${minutes} menit yang lalu`;
  //   }

  //   const differenceInDays = Math.floor(differenceInHours / 24);
  //   if (differenceInDays === 1) {
  //     const hours = differenceInHours % 24;
  //     return hours === 0 ? "1 hari yang lalu" : `1 hari ${hours} jam yang lalu`;
  //   }

  //   return `${differenceInDays} hari yang lalu`;
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newRelativeTimes = historyUser.map((data) =>
  //       calculateRelativeTime(data.time)
  //     );
  //     setRelativeTimes(newRelativeTimes);
  //   }, 60000); // update every 60 seconds

  //   // Set the initial relative times
  //   const initialRelativeTimes = historyUser.map((data) =>
  //     calculateRelativeTime(data.time)
  //   );
  //   setRelativeTimes(initialRelativeTimes);

  //   return () => clearInterval(interval);
  // }, [historyUser]);
  return (
    <div className="flex">
      <SideBar />
      <div className="w-[100%] lg:w-[85%] mb-14  bg-white ">
        <div>
          <HeaderAdmin />
        </div>
        <div className="flex flex-col  justify-center items-center container mt-10 mx-auto">
          <div className="flex flex-col mt-2 justify-between w-full mb-4 items-center gap-2">
            <div className="w-full text-start text-xl font-bold gap-2  flex flex-row items-center ">
              <h1>Riwayat Aktifitas User</h1>
            </div>
          </div>

          <div className="overflow-x-auto w-full ">
            <table className="table table-striped w-full text-left ">
              <thead className="font-Montserrat text-xs whitespace-nowrap">
                <tr>
                  {HistoryUser.map((data) => (
                    <th
                      key={data.id}
                      scope="col"
                      className="bg-LightBlue5 py-4 px-2 md:px-4"
                    >
                      {data.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-left text-xs">
                {historyUser.map((data) => (
                  <tr key={data?.id} className="bg-white border-b font-Montserrat  ">
                    <td scope="row" className="  pl-2 md:pl-4 whitespace-nowrap">
                      {data?.historyId}
                    </td>
                    <td className=" py-4   px-2 md:px-4 whitespace-nowrap">
                      {data?.username ?? "-"}
                    </td>
                    <td className=" py-4   px-2 md:px-4 whitespace-nowrap">
                      {data?.diseaseName ?? "-"}
                    </td>
                    <td className=" py-4   px-2 md:px-4 whitespace-nowrap">
                      {data?.confidence ?? "-"}
                    </td>

                    <td className="pr-4  px-2 md:px-4 whitespace-nowrap">
                      {" "}
                      {data.time ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            {totalPage > 1 && (
              <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPage}
                  onPageChange={(page) => setCurrentPage(page)}
                  showIcons
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistooryUser;
