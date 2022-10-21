import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import { deleteCow } from "../../redux/actions";

const ModalDelete = ({
  showModalDelete,
  setShowModalDelete,
  setIdDelete,
  idDelete,

  dispatch,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const onClose = () => {
    setShowModalDelete(false);
    setIdDelete("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteCow(idDelete));
    setIdDelete("");
    setShowModalDelete(false);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={showModalDelete}
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            El registro se eliminara de forma permanente
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={(e) => onSubmit(e)}>
              Eliminar
            </Button>
            <Button onClick={() => onClose()}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalDelete;
