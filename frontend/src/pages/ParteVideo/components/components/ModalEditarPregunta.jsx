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
import { put } from "src/utils/ApiRequests";

// Hooks
import { useState, useEffect } from "react";

import propTypes from "prop-types";

function ModalEditarPregunta({
    isOpen,
    onOpenChange,
    onClose,
    id_pregunta,
    array_index,
    setPreguntas,
    preguntaActual,
}) {
    const [pregunta, setPregunta] = useState("");

    const confirmEdit = (e) => {
        e.preventDefault();

        put(`preguntaVideo/${id_pregunta}`, {
            pregunta: pregunta,
        }).then((res) => {
            setPreguntas((prev) => {
                const newPreguntas = [...prev];
                // Copiar los atributos de la pregunta anterior
                const oldPregunta = newPreguntas[array_index];
                // Crear un nuevo objeto pregunta con los atributos de la
                // pregunta anterior y los nuevos atributos
                const newPregunta = {
                    ...oldPregunta,
                    ...res,
                };
                newPreguntas[array_index] = newPregunta;
                return newPreguntas;
            });
        });
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        setPregunta(preguntaActual);
    }, [preguntaActual]);

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
                            Editar pregunta
                        </ModalHeader>
                        <form onSubmit={confirmEdit}>
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
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

ModalEditarPregunta.propTypes = {
    isOpen: propTypes.bool,
    onOpenChange: propTypes.func,
    onClose: propTypes.func,
    id_pregunta: propTypes.number,
    array_index: propTypes.number,
    setPreguntas: propTypes.func,
    preguntaActual: propTypes.string,
};

export default ModalEditarPregunta;
