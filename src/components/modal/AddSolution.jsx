import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddSolutionData,
  EditSolutionData,
  HandlingDiseaseIdData,
} from "../../redux/actions/AdminActions";

// import { addDataCategory } from "../../redux/Actions/CourseActions";

const AddSolution = ({ modal, setModal, id, message, type, idPenanganan }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const { handlingDiseaseId } = useSelector((state) => state.admin);

  const handleSubmit = () => {
    if (type == "edit" && idPenanganan) {
      dispatch(EditSolutionData(name, id, idPenanganan));
    } else {
      dispatch(AddSolutionData(name, id));
    }
  };

  useEffect(() => {
    if (type === "edit" && idPenanganan) {
      dispatch(HandlingDiseaseIdData(idPenanganan));
    } else if (type === "add") {
      setName("");
    }
  }, [dispatch, idPenanganan, type]);

  useEffect(() => {
    if (idPenanganan) {
      setName(handlingDiseaseId || "");
    }
  }, [idPenanganan, handlingDiseaseId]);

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
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

AddSolution.propTypes = {
  modal: PropTypes.string,
  setModal: PropTypes.func,
  id: PropTypes.number,
  message: PropTypes.string,
  type: PropTypes.string,
  idPenanganan: PropTypes.number,
};

export default AddSolution;
