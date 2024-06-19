import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddDiseaseData } from "../../redux/actions/IdentifyActions";
// import { addDataCategory } from "../../redux/Actions/CourseActions";

const AddDisease = ({ modal, setModal }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [solution, setSolution] = useState("");
  const [cause, setCause] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AddDiseaseData(name, cause, solution));
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>Tambah Data Penyakit</Modal.Header>
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
              value={cause}
              onChange={(e) => setCause(e.target.value)}
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
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            ></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Tambah</Button>
      </Modal.Footer>
    </Modal>
  );
};

AddDisease.propTypes = {
  modal: PropTypes.string,
  setModal: PropTypes.func,
};

export default AddDisease;
