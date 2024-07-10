import { useParams } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import HeaderAdmin from "../../../components/Navbar/HeaderAdmin";
import { PenangananPenyakit } from "../../../data/DataPenyakit";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  DeleteSolutionData,
  HandlingDiseaseData,
} from "../../../redux/actions/AdminActions";
import { Link } from "react-router-dom";
import AddSolution from "../../../components/modal/AddSolution";
import { useModal } from "../../../hooks/useModal";

const DiseaseHandling = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [idPenanganan, setIdPenanganan] = useState(null);
  const [message, setMessage] = useState("Tambah Solusi Penyakit");
  const [type, setType] = useState("add");

  const { handlingDisease, nameDisease } = useSelector((state) => state.admin);
  const { activeModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    dispatch(HandlingDiseaseData(id));
  }, [dispatch, id]);

  const handleDeleteSolution = (idSolution) => {
    dispatch(DeleteSolutionData(idSolution, id));
  };

  const handleModal = (id, type) => {
    if (type === "add") {
      handleOpenModal("addSolution");
      setMessage("Tambah Solusi Penyakit");
      setType(type);
    } else if (type === "edit") {
      setIdPenanganan(id);
      handleOpenModal("editSolution");
      setMessage("Ubah Solusi Penyakit");
      setType("edit");
    }
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
            <div className="w-full text-start flex flex-row text-xl  font-bold ">
              <h1>Data Penanganan Penyakit {nameDisease}</h1>
            </div>
            <div className="flex flex-row justify-between w-full mt-4 items-end gap-3">
              <Link
                to="/penyakit"
                //   onClick={() => handleOpenModal("addCourse")}
                className="bg-red-500 flex flex-row justify-center items-center p-[6px] rounded-lg gap-1 text-white font-bold font-Montserrat "
              >
                <p>Kembali</p>
              </Link>
              <button
                onClick={() => handleModal(null, "add")}
                className="bg-GREEN01 flex flex-row justify-center items-center p-[6px] rounded-lg gap-1 text-white font-bold font-Montserrat "
              >
                <p>Tambah</p>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full ">
            <table className="table table-striped w-full text-left ">
              <thead className="font-Montserrat text-xs whitespace-nowrap">
                <tr>
                  {PenangananPenyakit.map((data) => (
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
                {handlingDisease.map((data) => (
                  <tr key={data.id} className="bg-white border-b font-Montserrat  ">
                    <td scope="row" className="  pl-2 md:pl-4 whitespace-nowrap">
                      {data.id}
                    </td>
                    <td className=" py-4   px-2 md:px-4 whitespace-nowrap">
                      {data.action ?? "-"}
                    </td>

                    <td className="pr-4  px-2 md:px-4 whitespace-nowrap">
                      <div className="flex flex-row gap-2 font-bold text-white">
                        <div>
                          <button
                            onClick={() => handleModal(data.id, "edit")}
                            className="p-1 bg-DARKBLUE05 rounded-md "
                          >
                            <AiFillEdit className="text-lg" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteSolution(data.id)}
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
            <AddSolution
              modal={activeModal}
              setModal={handleCloseModal}
              id={id}
              idPenanganan={idPenanganan}
              type={type}
              message={message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseHandling;
