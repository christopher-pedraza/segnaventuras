// Nextui components
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Checkbox,
} from "@nextui-org/react";

// Api Requests
import { post } from "src/utils/ApiRequests";

// Hooks
import { useState } from "react";

import propTypes from "prop-types";

function ModalCrearRespuesta({
    isOpen,
    onOpenChange,
    onClose,
    id_pregunta,
    setRespuestas,
}) {
    const [respuesta, setRespuesta] = useState("");
    const [esCorrecta, setEsCorrecta] = useState(false);

    const confirmCreate = (e) => {
        e.preventDefault();

        post("preguntaVideo/respuesta", {
            id_pregunta: id_pregunta,
            respuesta: respuesta,
            es_correcta: esCorrecta,
        }).then((res) => {
            setRespuestas((prev) => {
                return [...prev, res];
            });
        });
        onClose();
        setRespuesta("");
        setEsCorrecta(false);
    };

    const handleClose = () => {
        onClose();
        setRespuesta("");
        setEsCorrecta(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleClose();
                }
                onOpenChange(isOpen);
            }}
            backdrop="blur"
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Agregar nueva respuesta
                        </ModalHeader>
                        <form onSubmit={confirmCreate}>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Pregunta"
                                    variant="bordered"
                                    value={respuesta}
                                    onChange={(e) => {
                                        setRespuesta(e.target.value);
                                    }}
                                />
                                <Checkbox
                                    isSelected={esCorrecta}
                                    onChange={(e) => {
                                        setEsCorrecta(e.target.checked);
                                    }}
                                >
                                    ¿Es correcta?
                                </Checkbox>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={handleClose}
                                >
                                    Cancelar
                                </Button>
                                <Button color="success" type="submit">
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

ModalCrearRespuesta.propTypes = {
    isOpen: propTypes.bool,
    onOpenChange: propTypes.func,
    onClose: propTypes.func,
    id_pregunta: propTypes.number,
    setRespuestas: propTypes.func,
};

export default ModalCrearRespuesta;
