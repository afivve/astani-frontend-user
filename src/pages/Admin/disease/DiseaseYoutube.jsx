import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../../components/SideBar/SideBar";
import HeaderAdmin from "../../../components/Navbar/HeaderAdmin";
import { Link, useParams } from "react-router-dom";
import {
  DeleteYoutubeData,
  YoutubeDiseaseData,
} from "../../../redux/actions/AdminActions";
import { LiteraturPenyakit } from "../../../data/DataPenyakit";
import AddYoutube from "../../../components/modal/AddYoutube";
import { useModal } from "../../../hooks/useModal";

const DiseaseYoutube = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { youtubeDisease, nameDisease } = useSelector((state) => state.admin);
  const { activeModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    dispatch(YoutubeDiseaseData(id));
  }, [dispatch, id]);

  const handleDeleteYoutube = (idYT) => {
    dispatch(DeleteYoutubeData(idYT, id));
  };
  return (
    <div className="flex  ">
      <SideBar />

      <div className="w-[100%] lg:w-[85%] mb-14  bg-white ">
        <div>
          <HeaderAdmin />
        </div>
        <div className="flex flex-col  justify-center items-center container mt-10 mx-auto">
          <div className="flex flex-col mt-2 justify-between w-full mb-4 items-center gap-2">
            <div className="w-full text-start text-xl font-bold gap-2  flex flex-row items-center ">
              <h1>Data Penyakit:</h1>

              <span>
                {""}
                {nameDisease}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full mt-4 items-end gap-3">
              <Link
                to="/penyakit"
                //   onClick={() => handleOpenModal("addCourse")}
                className="bg-red-500 flex flex-row justify-center items-center p-[6px] rounded-lg gap-1 text-white font-bold font-Montserrat "
              >
                {/* <img src={AddIcon} /> */}
                <p>Kembali</p>
              </Link>
              <button
                onClick={() => handleOpenModal("addYoutube")}
                className="bg-GREEN01 flex flex-row justify-center items-center p-[6px] rounded-lg gap-1 text-white font-bold font-Montserrat "
              >
                {/* <img src={AddIcon} /> */}
                <p>Tambah</p>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full ">
            <table className="table table-striped w-full text-left ">
              <thead className="font-Montserrat text-xs whitespace-nowrap">
                <tr>
                  {LiteraturPenyakit.map((data) => (
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
                {youtubeDisease.map((data) => (
                  <tr key={data?.id} className="bg-white border-b font-Montserrat  ">
                    <td scope="row" className="  pl-2 md:pl-4 whitespace-nowrap">
                      {data?.id}
                    </td>
                    <td className=" py-4   px-2 md:px-4 whitespace-nowrap">
                      {data?.link ?? "-"}
                    </td>

                    <td className="pr-4  px-2 md:px-4 whitespace-nowrap">
                      <div className="flex flex-row gap-2 font-bold text-white">
                        <div>
                          <button
                            //   onClick={() => handleOpenModal("editeCourse", data.id)}
                            className="p-1 bg-DARKBLUE05 rounded-md "
                          >
                            <AiFillEdit className="text-lg" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteYoutube(data.id)}
                          className="p-1 bg-red-500 rounded-md"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AddYoutube modal={activeModal} setModal={handleCloseModal} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseYoutube;
