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
import { put } from "src/utils/ApiRequests";

// Hooks
import { useState, useEffect } from "react";

import propTypes from "prop-types";

function ModalEditarRespuesta({
    isOpen,
    onOpenChange,
    onClose,
    id_respuesta,
    array_index,
    setRespuestas,
    respuestaActual,
    esCorrectaActual,
}) {
    const [respuesta, setRespuesta] = useState("");
    const [esCorrecta, setEsCorrecta] = useState(false);

    const confirmEdit = (e) => {
        e.preventDefault();

        put(`preguntaVideo/respuesta/${id_respuesta}`, {
            respuesta: respuesta,
            es_correcta: esCorrecta,
        }).then((res) => {
            setRespuestas((prev) => {
                const newRespuestas = [...prev];
                newRespuestas[array_index] = res;
                return newRespuestas;
            });
        });
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        setRespuesta(respuestaActual);
        setEsCorrecta(esCorrectaActual);
    }, [respuestaActual, esCorrectaActual]);

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

ModalEditarRespuesta.propTypes = {
    isOpen: propTypes.bool,
    onOpenChange: propTypes.func,
    onClose: propTypes.func,
    id_respuesta: propTypes.number,
    array_index: propTypes.number,
    setRespuestas: propTypes.func,
    respuestaActual: propTypes.string,
    esCorrectaActual: propTypes.bool,
};

export default ModalEditarRespuesta;
