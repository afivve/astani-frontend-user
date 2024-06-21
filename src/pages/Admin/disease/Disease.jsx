import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import { HeadTabel } from "../../../data/Dashboard";
import HeaderAdmin from "../../../components/Navbar/HeaderAdmin";
import { useDispatch, useSelector } from "react-redux";
import { DiseaseData } from "../../../redux/actions/AdminActions";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import AddDisease from "../../../components/modal/AddDisaese";
import { useModal } from "../../../hooks/useModal";
import { DeleteDeseaseById } from "../../../redux/actions/IdentifyActions";

const Disease = () => {
  const dispatch = useDispatch();

  const { disease } = useSelector((state) => state.admin);
  const [id, setId] = useState(null);
  const [message, setMessage] = useState("Tambah Data Penyakit");
  const [type, setType] = useState("add");

  const { activeModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    dispatch(DiseaseData());
  }, [dispatch]);

  const handleDeleteDisease = (id) => {
    dispatch(DeleteDeseaseById(id));
  };

  const handleOpenEditModal = (id) => {
    setId(id);
    handleOpenModal("editDisease");
    setMessage("Ubah Data Penyakit");
    setType("edit");
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-[100%] lg:w-[85%] mb-14  bg-white ">
        <div>
          <HeaderAdmin />
        </div>
        <div className="flex flex-col  justify-center items-center container mt-10 mx-auto">
          <div className="flex flex-col md:flex-row mt-2 justify-between w-full mb-4 items-center gap-2">
            <div>
              <h1 className="font-bold text-3xl">Data Penyakit</h1>
            </div>
            <div>
              <button
                onClick={() => handleOpenModal("addDisease")}
                className="bg-GREEN01 flex flex-row justify-center items-center p-[6px] rounded-lg gap-1 text-white font-bold font-Montserrat "
              >
                {/* <img src={AddIcon} /> */}
                <p>Tambah Data</p>
              </button>
              {/* <AddCourse
                  addCourse={activeModal === "addCourse"}
                  setAddCourse={handleCloseModal}
                /> */}
            </div>
          </div>

          <div className="overflow-x-auto w-full ">
            <table className="table table-striped w-full text-left ">
              <thead className="font-Montserrat text-xs whitespace-nowrap">
                <tr>
                  {HeadTabel.map((data) => (
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
                {disease.map((data) => (
                  <tr key={data.id} className="bg-white border-b font-Montserrat  ">
                    <td scope="row" className="  pl-2 md:pl-4 whitespace-nowrap">
                      {data.name}
                    </td>
                    <td className=" py-4   px-2 md:px-4 whitespace-nowrap">
                      {data.symtomps ?? "-"}
                    </td>
                    <td className=" py-4    px-2 md:px-4 whitespace-nowrap">
                      {data.caused ?? "-"}
                    </td>

                    <td className="pr-4  px-2 md:px-4 whitespace-nowrap">
                      <div className="flex flex-row gap-2 font-bold text-white">
                        <div>
                          <button
                            onClick={() => handleOpenEditModal(data.id)}
                            className="p-1 bg-DARKBLUE05 rounded-md "
                          >
                            <AiFillEdit className="text-lg" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteDisease(data.id)}
                          className="p-1 bg-red-500 rounded-md"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                    <td className="pr-4  px-2 py-2 md:px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1 font-bold">
                        <Link
                          to={`/penyakit/penanganan/${data.id}`}
                          className="hover:underline"
                        >
                          <span>Penanganan</span>
                        </Link>
                        <Link
                          to={`/penyakit/literatur/${data.id}`}
                          className="hover:underline"
                        >
                          <span>Literatur</span>
                        </Link>
                        <Link
                          to={`/penyakit/youtube/${data.id}`}
                          className="hover:underline"
                        >
                          <span>Youtube</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AddDisease
              modal={activeModal}
              setModal={handleCloseModal}
              id={id}
              message={message}
              type={type}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disease;
