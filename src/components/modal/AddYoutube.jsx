import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddYoutubeData, GetYoutubeDataId } from "../../redux/actions/AdminActions";

// import { addDataCategory } from "../../redux/Actions/CourseActions";

const AddYoutube = ({ modal, setModal, id, idYt, type, message }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const { youtubeDiseaseId } = useSelector((state) => state.admin);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AddYoutubeData(name, id));
  };

  useEffect(() => {
    if (type === "edit" && idYt) {
      dispatch(GetYoutubeDataId(idYt));
    }
  }, [dispatch, type, idYt]);

  useEffect(() => {
    if (type === "edit") {
      setName(youtubeDiseaseId || "");
    } else if (type === "add") {
      setName("");
    }
  }, [type, youtubeDiseaseId]);

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-Poppins text-[15px] mb-[4px]">Nama</label>
            <input
              type="text"
              className="border w-full py-3 px-4 rounded-2xl"
              placeholder="Text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Tambah</Button>
      </Modal.Footer>
    </Modal>
  );
};

AddYoutube.propTypes = {
  modal: PropTypes.string,
  setModal: PropTypes.func,
  id: PropTypes.number,
  idYt: PropTypes.number,
  type: PropTypes.string,
  message: PropTypes.string,
};

export default AddYoutube;
