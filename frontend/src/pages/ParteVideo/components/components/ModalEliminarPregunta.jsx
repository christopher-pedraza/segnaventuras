// Nextui components
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";

// Api Requests
import { del } from "src/utils/ApiRequests";

import propTypes from "prop-types";

function ModalEliminarPregunta({
    isOpen,
    onOpenChange,
    onClose,
    id_pregunta,
    setPreguntas,
    id_parte,
}) {
    const confirmDelete = () => {
        if (id_pregunta !== null) {
            del(`preguntaVideo/${id_parte}/${id_pregunta}`).then(() => {
                setPreguntas((prev) => {
                    return prev.filter(
                        (pregunta) =>
                            pregunta.id_preguntas_video_cuestionario !==
                            id_pregunta
                    );
                });
            });
        }
        onClose(); // Close the delete confirmation modal
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Eliminar pregunta
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                ¿Estás seguro que deseas eliminar esta pregunta?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                variant="light"
                                onPress={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button color="danger" onPress={confirmDelete}>
                                Eliminar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

ModalEliminarPregunta.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onOpenChange: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired,
    id_pregunta: propTypes.number.isRequired,
    setPreguntas: propTypes.func.isRequired,
    id_parte: propTypes.number.isRequired,
};

export default ModalEliminarPregunta;
