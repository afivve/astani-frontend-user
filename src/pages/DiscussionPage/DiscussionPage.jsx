import chat from "../../assets/chating.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Selesai,
  editDiscussion,
  getDiscussion,
} from "../../redux/actions/CourseActions";
import { Link, useParams } from "react-router-dom";
import AddDiscussion from "../../components/modal/AddDiscussion";
import PaginationDiscussion from "./PaginationDiscussion";
import { BiFilter } from "react-icons/bi";
export default function DiscussionPage() {
  const { getData } = useSelector((state) => state.course);
  const { discussion } = useSelector((state) => state.course);
  const [closed, setClosed] = useState([]);
  const [active, setActive] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [idDiskusi, setIdDiskusi] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleClosed = (value) => {
    setClosed((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
    setActive([]);
  };
  const handleEdit = (discussionId) => {
    setShowModal(true);
    dispatch(editDiscussion(id, discussionId));
    setIdDiskusi(discussionId);
  };
  const handleActive = (value) => {
    setActive((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
    setClosed([]);
  };
  const handleSelesai = (id, idDiskusi) => {
    dispatch(Selesai(id, idDiskusi));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getDiscussion(closed, active, search, id, pageNumber));
    }
  }, [dispatch, closed, active, search, id, pageNumber]);

  return (
    <div>
      <div className="justify-center flex bg-gradient-to-r bg-white/50 drop-shadow-lg">
        <div className="container m-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-5">
              <img className="w-20 fill-white" src={chat} alt="" />
              <div>
                <div className="text-gray-600 text-2xl font-bold">
                  {getData.courseDiscussionName}
                </div>

                <h3 className="text-gray-800 text-xl font-semibold">
                  Selamat Datang Di Forum Diskusi Kelas
                </h3>
                <p className="text-gray-600">Konsultasi seputar materi anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container">
          <div className="p-5 flex flex-row md:justify-between gap-8 ">
            <div className="hidden w-1/5 md:flex flex-col gap-y-4 sticky top-[3vh] h-[10vh]">
              <button
                className="w-full bg-YELLOW05 text-white p-2 rounded-lg hover:bg-yellow-500 drop-shadow-xl font-semibold"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Buat Diskusi Baru
              </button>
              <AddDiscussion
                showModal={showModal}
                setShowModal={setShowModal}
                id={id}
                idDiskusi={idDiskusi}
                setIdDiskusi={setIdDiskusi}
              />
              <div className="rounded-lg border-black-200 border-2 p-2 divide-y divide-slate-200 ">
                <div>
                  <p className="font-semibold">Filter Berdasarkan</p>
                  <div className="my-2">
                    <ul className="gap-2 flex items-center">
                      <input
                        type="checkbox"
                        id="selesai"
                        className="appearance-none rounded-full border-2 border-gray-300 h-4 w-4 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300"
                        checked={closed.includes(true)}
                        onChange={() => handleClosed(true)}
                      />
                      <label className="text-sm text-gray-600">
                        Diskusi Sudah Selesai
                      </label>
                    </ul>
                    <ul className="gap-2 flex items-center">
                      <input
                        type="checkbox"
                        id="belumSelesai"
                        className="appearance-none rounded-full border-2 border-gray-300 h-4 w-4 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300"
                        checked={active.includes(true)}
                        onChange={() => handleActive(true)}
                      />
                      <label className="text-sm text-gray-600">
                        Diskusi Belum Selesai
                      </label>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/5 flex flex-col gap-y-4">
              {showModal == false && (
                <div className="md:flex flex-row w-full justify-between gap-3 sticky md:top-0 h-auto z-0 pt-2 backdrop-blur bg-white/30">
                  <div className="flex flex-row gap-3 font-bold text-YELLOW05 items-center justify-between">
                    <div className="flex flex-row gap-3">
                      <PaginationDiscussion
                        setPageNumber={setPageNumber}
                        pageNumber={pageNumber}
                      />
                    </div>
                    <div className="flex flex-row gap-3">
                      <button
                        className="md:hidden w-auto bg-YELLOW05 text-white p-1 rounded-lg hover:bg-yellow-500 drop-shadow-xl font-semibold"
                        type="button"
                        onClick={() => setShowModal(true)}
                      >
                        Buat Diskusi Baru
                      </button>
                      <button
                        className="flex items-center md:hidden w-auto bg-white text-YELLOW05 p-1 rounded-lg hover:bg-yellow-100 border-2 border-YELLOW05 drop-shadow-xl font-semibold"
                        type="button"
                        onClick={() => setShowModal(true)}
                      >
                        <BiFilter /> filter
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
              )}
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
                          <h3 className="font-semibold text-lg">
                            {item.username}
                          </h3>
                          <p className="font-gray-100 text-xs">
                            {new Date(item.cretedAt).toLocaleString()}
                          </p>
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
                          {item.closed == false &&
                            user?.name === item.username && (
                              <button
                                type="button"
                                className="text-white text-xs font-Montserrat font-bold flex flex-row gap-1 items-center bg-YELLOW05 border-2 p-1 border-YELLOW05 rounded-sm w-auto "
                                onClick={() =>
                                  handleSelesai(id, item.discussionId)
                                }
                              >
                                Selesai
                              </button>
                            )}
                          {user?.name === item.username && (
                            <button
                              type="button"
                              className="text-YELLOW05 text-xs font-Montserrat font-bold flex flex-row gap-1 items-center bg-YELLOW05/20 border-2 p-1 border-YELLOW05 rounded-sm w-auto "
                              onClick={() => {
                                handleEdit(item.discussionId);
                              }}
                            >
                              Edit
                            </button>
                          )}
                          <div className="flex flex-row gap-1 items-center font-semibold">
                            <img className="w-5" src={chat} alt="" />
                            <Link
                              to={`/detailDiscussion/${id}/${item.discussionId}`}
                            >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
