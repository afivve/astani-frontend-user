import { useState } from "react";

export const useModal = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [id, setId] = useState(null);

  const handleOpenModal = (modalType, id) => {
    setActiveModal(modalType);
    setId(id);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setId(null);
  };

  return {
    activeModal,
    handleOpenModal,
    handleCloseModal,
    id,
  };
};
