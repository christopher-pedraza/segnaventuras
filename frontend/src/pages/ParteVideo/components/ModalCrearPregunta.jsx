// Nextui components
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from "@nextui-org/react";

// Api Requests
import { post } from "src/utils/ApiRequests";

// Hooks
import { useState } from "react";

import propTypes from "prop-types";

function ModalCrearPregunta({
    isOpen,
    onOpenChange,
    onClose,
    id_parte,
    setPreguntas,
    preguntas,
}) {
    const [pregunta, setPregunta] = useState("");

    const confirmCreate = (e) => {
        e.preventDefault();

        post("preguntaVideo", {
            id_parte: id_parte,
            pregunta: pregunta,
        }).then((res) => {
            setPreguntas([...preguntas, res]);
        });
        onClose();
        setPregunta("");
    };

    const handleClose = () => {
        onClose();
        setPregunta("");
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
                            Agregar nueva pregunta
                        </ModalHeader>
                        <form onSubmit={confirmCreate}>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Pregunta"
                                    variant="bordered"
                                    value={pregunta}
                                    onChange={(e) => {
                                        setPregunta(e.target.value);
                                    }}
                                />
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

ModalCrearPregunta.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onOpenChange: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired,
    id_parte: propTypes.number.isRequired,
    setPreguntas: propTypes.func.isRequired,
    preguntas: propTypes.array.isRequired,
};

export default ModalCrearPregunta;
