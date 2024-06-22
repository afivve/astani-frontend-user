import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { BiImage } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  addDiscussion,
  getDetailDiscussion,
  updateDiscussion,
} from "../../redux/actions/CourseActions";

const Discussion = ({ modal, setModal, id, idDiskusi, setIdDiskusi, message, type }) => {
  const [judul, setJudul] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [gambar, setGambar] = useState(null);
  const [hasil, setHasil] = useState(null);
  const dispatch = useDispatch();
  const [notif, setNotif] = useState("");
  const img = useRef();
  const { discussionToEdit } = useSelector((state) => state.course);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setHasil(URL.createObjectURL(file));

    setGambar(file);
  };

  const handleHapus = () => {
    setJudul("");
    setPertanyaan("");
    setHasil(null);
    setGambar(null);
  };

  const handleSubmit = () => {
    if (pertanyaan === "" || judul === "") {
      setNotif("Judul Pertanyaan dan Pertanyaan wajib diisi");
    } else {
      setModal(false);

      if (type === "edit" && idDiskusi && judul && pertanyaan && gambar) {
        const formData = new FormData();
        formData.append("file", gambar);

        dispatch(updateDiscussion(idDiskusi, judul, pertanyaan, gambar));
      } else {
        dispatch(addDiscussion(judul, pertanyaan, gambar));
      }
      handleHapus();
    }
  };

  useEffect(() => {
    if (type === "edit") {
      if (idDiskusi) {
        setJudul(discussionToEdit.title || "");
        setPertanyaan(discussionToEdit.question || "");
        setHasil(discussionToEdit.urlPhoto || null);
      } else {
        if (judul != "" && pertanyaan != "") {
          setNotif("");
        }
      }
    } else if (type === "add") {
      setIdDiskusi(null);
      setNotif("");
      handleHapus();
    }
  }, [id, discussionToEdit, type, idDiskusi, judul, pertanyaan, setIdDiskusi]);

  useEffect(() => {
    if (type === "edit" && idDiskusi) {
      dispatch(getDetailDiscussion(idDiskusi));
    }
  }, [dispatch, idDiskusi, type]);
  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 z-[999]">
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
                className="w-full border-2 border-black-200 rounded-lg outline-none p-1 hidden "
                ref={img}
                id="gambar"
                accept="image/*"
                onChange={handleImageChange}
              />
              {hasil && (
                <div className="mb-4">
                  <img
                    src={hasil}
                    alt="Preview"
                    className="max-w-[25%] h-auto rounded-lg "
                  />
                </div>
              )}
            </label>
          </div>
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
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={handleSubmit}>Tambah</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

Discussion.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  id: PropTypes.string,
  idDiskusi: PropTypes.number,
  setIdDiskusi: PropTypes.func,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Discussion;
