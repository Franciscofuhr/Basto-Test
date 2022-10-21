import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";

import { useState } from "react";
import { createCow, updateCows } from "../../redux/actions";

const ModalCreate = ({
  showModalCreate,
  setShowModalCreate,
  isCreating,
  toUpdateOrCreateCow,
  dispatch,
  setToUpdateOrCreateCow,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  
  const onChangeForm = (e) => {
    setToUpdateOrCreateCow({
      ...toUpdateOrCreateCow,
      [e.target.name]: e.target.value,
    });
    let errors = validator({
        ...toUpdateOrCreateCow,
      [e.target.name]: e.target.value,
    });

    setError(errors);
    
    return;
  };
  const [error, setError] = useState({
    idSENASA: "",
    type: "",
    weight: "",
    fieldName: "",
    device: "",
    deviceNumber: "",
});
const onSubmit = (e) => {
    e.preventDefault();
    if (
        toUpdateOrCreateCow.idSENASA.length &&
        !error.idSENASA &&
        !error.type &&
        !error.weight &&
        !error.fieldName &&
        !error.device &&
        !error.deviceNumber
        ) {
            if (isCreating) {
                dispatch(createCow(toUpdateOrCreateCow));
                toast({
                    title: "Animal registrado",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                dispatch(updateCows(toUpdateOrCreateCow));
                toast({
                    title: "Registro modificado.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            }
            
            onClose();
        } else {
            return;
        }
    };
    const validator = (cow) => {
        // function that validates all information in the form meet the requirments
    let validations = {};
    const beNumber = /(^\d{1,10}$)/;
    const beAlphanumeric = /[A-Za-z\d]/;

    if (!cow.idSENASA) {
      validations.idSENASA = "Ingrese el idSENASA";
    } else if (
        !beAlphanumeric.test(cow.idSENASA) ||
        cow.idSENASA.length !== 16
        ) {
            validations.idSENASA =
            "El idSENASA debe tener 16 caracteres alfanumericos";
        } else if (!cow.type) {
            validations.type = "Ingrese el tipo de animal";
        } else if (!beNumber.test(cow.weight) && cow.weight) {
            validations.weight = "Debe ingresar solo numeros";
        } else if (!cow.fieldName) {
            validations.fieldName = "Ingrese el nombre del potrero";
        } else if (cow.fieldName.length > 200) {
            validations.fieldName =
            "El nombre ingresado debe tener menos de 200 caracteres";
        } else if (!cow.device) {
            validations.device = "Ingrese el tipo de dispositivo";
        } else if (!cow.deviceNumber) {
            validations.deviceNumber = "Ingrese el numero del dispositivo";
        } else if (
            !beAlphanumeric.test(cow.deviceNumber) ||
      cow.deviceNumber.length !== 8
      ) {
      validations.deviceNumber =
      "El numero del dispositivo debe tener 8 caracteres alfanumericos";
    }
    return validations;
  };

  const onClose = () => {
    setToUpdateOrCreateCow({
      idSENASA: "",
      type: "",
      weight: "",
      fieldName: "",
      device: "",
      deviceNumber: "",
    });
    setError({
      idSENASA: "",
      type: "",
      weight: "",
      fieldName: "",
      device: "",
      deviceNumber: "",
    });
    setShowModalCreate(false);
  };
  return (
      <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={showModalCreate}
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          {isCreating ? (
            <ModalHeader>Nuevo animal</ModalHeader>
          ) : (
            <ModalHeader>Editar animal</ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel>id SENASA*</FormLabel>
            <Input
              ref={initialRef}
              name={"idSENASA"}
              onChange={(e) => onChangeForm(e)}
              value={toUpdateOrCreateCow.idSENASA}
              //   placeholder="id SENASA"
            />
            {error.idSENASA ? (
              <p style={{ color: "red" }}>{error.idSENASA}</p>
            ) : null}
            <FormLabel>Tipo animal*</FormLabel>

            <RadioGroup
              name="type"
              onClick={(e) => onChangeForm(e)}
              value={toUpdateOrCreateCow.type}
            >
              <Stack name="type" direction="row">
                <Radio name="type" value="Novillo">
                  Novillo
                </Radio>
                <Radio name="type" value="Toro">
                  Toro
                </Radio>
                <Radio name="type" value="Vaquillona">
                  Vaquillona
                </Radio>
              </Stack>
            </RadioGroup>
            {error.type ? <p style={{ color: "red" }}>{error.type}</p> : null}

            <FormLabel>Peso animal (kg)</FormLabel>
            <Input
              ref={initialRef}
              name={"weight"}
              onChange={(e) => onChangeForm(e)}
              placeholder="Peso animal"
              value={toUpdateOrCreateCow.weight}
            />
            {error.weight ? (
              <p style={{ color: "red" }}>{error.weight}</p>
            ) : null}

            <FormLabel>Nombre de potrero*</FormLabel>
            <textarea
              style={{ width: "100%" }}
              ref={initialRef}
              name={"fieldName"}
              onChange={(e) => onChangeForm(e)}
              placeholder="Nombre de potrero"
              value={toUpdateOrCreateCow.fieldName}
            />
            {error.fieldName ? (
              <p style={{ color: "red" }}>{error.fieldName}</p>
            ) : null}

            <FormLabel>Tipo de dispositivo*</FormLabel>

            <RadioGroup
              name="device"
              onClick={(e) => onChangeForm(e)}
              value={toUpdateOrCreateCow.device}
            >
              <Stack name="device" direction="row">
                <Radio name="device" value="Collar">
                  Collar
                </Radio>
                <Radio name="device" value="Caravana">
                  Caravana
                </Radio>
              </Stack>
            </RadioGroup>
            {error.device ? (
              <p style={{ color: "red" }}>{error.device}</p>
            ) : null}

            <FormLabel>Número de dispositivo*</FormLabel>
            <Input
              ref={initialRef}
              name={"deviceNumber"}
              value={toUpdateOrCreateCow.deviceNumber}
              onChange={(e) => onChangeForm(e)}
              placeholder="Numero de dispositivo"
            />
            {error.deviceNumber ? (
              <p style={{ color: "red" }}>{error.deviceNumber}</p>
            ) : null}
          </ModalBody>

          <ModalFooter>
            {isCreating ? (
              <Button colorScheme="blue" mr={3} onClick={(e) => onSubmit(e)}>
                Crear Registro
              </Button>
            ) : (
              <Button colorScheme="blue" mr={3} onClick={(e) => onSubmit(e)}>
                Actualizar Registro
              </Button>
            )}
            <Button onClick={() => onClose()}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalCreate;
