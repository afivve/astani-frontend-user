import chat from "../../../assets/chating.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selesai, getDiscussion } from "../../../redux/actions/CourseActions";
import { Link, useParams } from "react-router-dom";
import Header from "../../../components/Navbar/Header";
import Discussion from "../../../components/modal/Discussion";
import { useModal } from "../../../hooks/useModal";
import { Pagination } from "flowbite-react";
import { toastify } from "../../../utils/toastify";

export default function DiscussionPage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { getData, totalPage, discussion } = useSelector((state) => state.course);

  // const [closed, setClosed] = useState([]);
  // const [active, setActive] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  // const [showModal, setShowModal] = useState(false);

  const [idDiskusi, setIdDiskusi] = useState(null);
  const [message, setMessage] = useState("Membuat Diskusi");
  const [type, setType] = useState("add");
  const { user } = useSelector((state) => state.auth);

  const { activeModal, handleOpenModal, handleCloseModal } = useModal();

  const handleModal = (discussionId, type) => {
    if (token) {
      if (type === "add") {
        setMessage("Buat Diskusi");
        setType("add");
        handleOpenModal("addDiscussion");
      } else if (type === "edit") {
        setIdDiskusi(discussionId);
        setMessage("Edit Diskusi");
        setType("edit");
        handleOpenModal("editDiscussion");
      }
    } else {
      toastify({
        message: "Silahkan Login Terlebih Dahulu",
        type: "error",
      });
    }
  };

  const handleSelesai = (id, idDiskusi) => {
    dispatch(Selesai(id, idDiskusi));
  };

  useEffect(() => {
    dispatch(getDiscussion(search, currentPage));
  }, [dispatch, search, currentPage]);

  return (
    <>
      <Header />
      <div>
        <div className="justify-center flex bg-gradient-to-r bg-white/50 drop-shadow-lg z-[20]">
          <div className="container m-8">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-5">
                <img className="w-20 fill-white" src={chat} alt="" />
                <div>
                  <div className="text-gray-600 text-2xl font-bold">
                    {getData?.courseDiscussionName}
                  </div>
                  <h3 className="text-gray-800 text-xl font-semibold">
                    Selamat Datang Di Forum Diskusi AsTani
                  </h3>
                  <p className="text-gray-600">
                    Konsultasi seputar penyakit tanaman anda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="container">
            <div className="p-5 flex flex- md:justify-between gap-8 ">
              <div className="hidden w-1/5 md:flex flex-col gap-y-4  top-[3vh] h-[10vh] ">
                <button
                  className="w-full bg-GREEN01 text-white p-2 rounded-lg  drop-shadow-xl font-semibold"
                  type="button"
                  onClick={() => handleModal(null, "add")}
                >
                  Buat Diskusi Baru
                </button>
                <Discussion
                  modal={activeModal}
                  setModal={handleCloseModal}
                  id={id}
                  idDiskusi={idDiskusi}
                  setIdDiskusi={setIdDiskusi}
                  message={message}
                  type={type}
                />
              </div>
              <div className="w-full md:w-4/5 flex flex-col gap-y-4">
                <div className="md:flex flex-row w-full justify-between gap-3  md:top-0 h-auto z-0 pt-2 backdrop-blur bg-white/30">
                  <div className="flex flex-row gap-3 font-bold text-YELLOW05 items-center justify-between">
                    <div className="flex flex-row gap-3">
                      <button
                        className="md:hidden w-auto bg-GREEN01 text-white p-1 rounded-lg  drop-shadow-xl font-semibold"
                        type="button"
                        onClick={() => handleModal(null, "add")}
                      >
                        Buat Diskusi Baru
                      </button>
                    </div>
                  </div>

                  <input
                    className="active:ring-YELLOW05 focus:ring-YELLOW05 ring-2 ring-gray-200 outline-none rounded-lg w-full md:w-2/5 p-2 mt-2 "
                    type="text"
                    placeholder="Pencarian...."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div>
                  {discussion.map((item) => (
                    <div key={item.discussionId}>
                      <div className="border-y-2 p-5 gap-5">
                        <div className="flex justify-between">
                          <div className="flex flex-row items-center gap-3">
                            <img
                              className="w-8 rounded-full bg-blue-200 object-top object-cover h-8"
                              src={item.userPhoto}
                              alt=""
                            />
                            <h3 className="font-semibold text-lg">{item.username}</h3>
                            <p className="font-gray-100 text-xs">{item.createdAt}</p>
                          </div>
                          <div>
                            {item.closed ? (
                              <p className="text-xs p-1 text-green-600 rounded-lg border-green-500 border-2 bg-green-200">
                                Selesai
                              </p>
                            ) : (
                              <p className="text-xs p-1 text-gray-600 rounded-lg border-gray-500 border-2 bg-gray-200">
                                Pembahasan
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="font-sm text-current">{item.question}</p>
                        </div>
                        <div className="flex flex-wrap mt-6 gap-5">
                          <div className="flex flex-row gap-2 items-center">
                            {item.closed == false && user?.name === item.username && (
                              <button
                                type="button"
                                className="text-white text-xs font-Montserrat font-bold flex flex-row gap-1 items-center bg-GREEN01 border-2 p-1 border-YELLOW05 rounded-sm w-auto "
                                onClick={() => handleSelesai(id, item.discussionId)}
                              >
                                Selesai
                              </button>
                            )}
                            {user?.id === item.userId && (
                              <>
                                <button
                                  type="button"
                                  className="text-YELLOW05 text-xs font-Montserrat font-bold flex flex-row gap-1 items-center bg-GREEN01/20 border-2 p-1 border-YELLOW05 rounded-sm w-auto "
                                  onClick={() => {
                                    handleModal(item.id, "edit");
                                  }}
                                >
                                  Edit
                                </button>
                              </>
                            )}
                            <div className="flex flex-row gap-1 items-center font-semibold">
                              <img className="w-5" src={chat} alt="" />
                              <Link to={`/detailDiscussion/${item.id}`}>
                                <p className="text-gray-500">
                                  {item.totalComments} Pembahasan
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
      </div>
    </>
  );
}
