import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddLiteraturData } from "../../redux/actions/AdminActions";

// import { addDataCategory } from "../../redux/Actions/CourseActions";

const AddLiteratur = ({ modal, setModal, id }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AddLiteraturData(name, id));
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>Tambah Literatur Penyakit</Modal.Header>
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

AddLiteratur.propTypes = {
  modal: PropTypes.string,
  setModal: PropTypes.func,
  id: PropTypes.number,
};

export default AddLiteratur;
