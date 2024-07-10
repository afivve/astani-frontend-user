import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddLiteraturData,
  EditLiteraturData,
  LiteraturIdData,
} from "../../redux/actions/AdminActions";

const AddLiteratur = ({ modal, setModal, id, idLiteratur, message, type }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { literaturDiseaseId } = useSelector((state) => state.admin);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "edit" && idLiteratur) {
      const result = dispatch(EditLiteraturData(name, id, idLiteratur));
      if (result) {
        setModal(false); 
      }
    } else {
      const result = dispatch(AddLiteraturData(name, id));
      if (result) {
        setModal(false); 
      }
    }
  };

  useEffect(() => {
    if (type === "edit") {
      dispatch(LiteraturIdData(idLiteratur));
    }
  }, [dispatch, idLiteratur, type]);

  useEffect(() => {
    if (type === "edit" && idLiteratur) {
      setName(literaturDiseaseId || "");
    } else if (type === "add") {
      setName("");
    }
  }, [idLiteratur, type, literaturDiseaseId]);

  const buttonText = type === "edit" ? "Perbarui" : "Tambah";

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
        <Button onClick={handleSubmit}>{buttonText}</Button>
      </Modal.Footer>
    </Modal>
  );
};

AddLiteratur.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  id: PropTypes.number,
  idLiteratur: PropTypes.number,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default AddLiteratur;
