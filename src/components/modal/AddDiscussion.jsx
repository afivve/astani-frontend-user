import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { BiImage } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  addDiscussion,
  updateDiscussion,
} from "../../redux/actions/CourseActions";

export default function AddDiscussion({
  showModal,
  setShowModal,
  id,
  idDiskusi,
  setIdDiskusi,
}) {
  const [editing, setEditing] = useState(false);
  const [judul, setJudul] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [gambar, setGambar] = useState(null);
  const [hasil, setHasil] = useState(null);
  const dispatch = useDispatch();
  const [notif, setNotif] = useState("");
  const img = useRef();
  const { discussionToEdit } = useSelector((state) => state.course);
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setHasil(URL.createObjectURL(file));

    const selectedFile = e.target.files[0];

    setGambar(selectedFile);
  };
  const handleHapus = () => {
    setJudul("");
    setPertanyaan("");
    setHasil(null);
    setGambar(null);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (pertanyaan === "" || judul === "") {
      setNotif("Judul Pertanyaan dan Pertanyaan wajib diisi");
    } else {
      setShowModal(false);

      if (editing) {
        dispatch(updateDiscussion(idDiskusi, id, judul, pertanyaan, gambar));
      } else {
        dispatch(addDiscussion(id, judul, pertanyaan, gambar));
      }
      handleHapus();
    }
  };
  useEffect(() => {
    if (showModal) {
      if (idDiskusi) {
        setEditing(true);
        setJudul(discussionToEdit.title || "");
        setPertanyaan(discussionToEdit.question || "");
        setHasil(discussionToEdit.urlPhoto || null);
        setGambar(discussionToEdit.urlPhoto || null);
      } else {
        setEditing(false);
        if (judul != "" && pertanyaan != "") {
          setNotif("");
        }
      }
    } else if (!showModal) {
      setIdDiskusi(null);
      setNotif("");
      handleHapus();
    }
  }, [id, showModal, discussionToEdit]);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden z-50 overflow-y-auto fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-[75%] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t items-center">
                  <h3 className="text-3xl font-semibold">Membuat Diskusi</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {notif && (
                    <div className="bg-red-400 text-white rounded-sm p-1 text-center font-semibold">
                      {notif}
                    </div>
                  )}
                  <label htmlFor="" className="font-semibold text-lg">
                    Judul Pertanyaan
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-black-200 rounded-lg outline-none p-1"
                    placeholder="Tulis Judul Pertanyaan Anda Mengenai Apa"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                  />
                  <label htmlFor="" className="font-semibold text-lg">
                    Pertanyaan
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-black-200 rounded-lg outline-none p-1"
                    placeholder="Tulis Pertanyaan Anda Di Sini"
                    value={pertanyaan}
                    onChange={(e) => setPertanyaan(e.target.value)}
                  />
                  <label htmlFor="gambar" className="flex flex-wrap gap-3">
                    <BiImage className="text-3xl" />
                    <p className="text-gray-400">sertakan gambar jika ada</p>

                    <input
                      type="file"
                      className="w-full border-2 border-black-200 rounded-lg outline-none p-1 hidden"
                      ref={img}
                      id="gambar"
                      onChange={handleImageChange}
                    />
                    {hasil && (
                      <div className="mb-4">
                        <img
                          src={hasil}
                          alt="Preview"
                          className="max-w-[25%] h-auto rounded-lg"
                        />
                      </div>
                    )}
                  </label>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleHapus}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
AddDiscussion.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  id: PropTypes.string,
  idDiskusi: PropTypes.number,
  setIdDiskusi: PropTypes.func,
};
