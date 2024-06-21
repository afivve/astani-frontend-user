import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDiseaseData } from "../../redux/actions/IdentifyActions";
import { DisaeseByIdData, EditeDiseaseData } from "../../redux/actions/AdminActions";
// import { addDataCategory } from "../../redux/Actions/CourseActions";

const AddDisease = ({ modal, setModal, type, id, message }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [solution, setSolution] = useState("");
  const [cause, setCause] = useState("");

  const { diseaseId } = useSelector((state) => state.admin);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "edit" && id) {
      dispatch(EditeDiseaseData(name, cause, solution, id, setModal));
    } else {
      dispatch(AddDiseaseData(name, cause, solution));
    }
  };

  useEffect(() => {
    if (type === "edit" && id) {
      dispatch(DisaeseByIdData(id));
    }
  }, [dispatch, id, type]);

  useEffect(() => {
    if (type === "edit" && id) {
      setName(diseaseId.name || "");
      setSolution(diseaseId.symtomps || "");
      setCause(diseaseId.caused || "");
    } else if (type === "add") {
      setName("");
      setSolution("");
      setCause("");
    }
  }, [id, diseaseId, type]);

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
          <div className="flex flex-col">
            <label className="font-Poppins text-[15px] mb-[4px]">Penyebab</label>
            <input
              type="text"
              className="border w-full py-3 px-4 rounded-2xl"
              placeholder="Text"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-Poppins text-[15px] mb-[4px]">Solusi</label>
            <textarea
              className="border w-full py-3 px-4 rounded-2xl"
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              placeholder="text"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
            ></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>{type === "add" ? "Tambah" : "Edit"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

AddDisease.propTypes = {
  modal: PropTypes.string,
  setModal: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.number,
  message: PropTypes.string,
};

export default AddDisease;
