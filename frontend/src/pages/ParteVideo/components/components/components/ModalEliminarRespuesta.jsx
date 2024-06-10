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

function ModalEliminarRespuesta({
    isOpen,
    onOpenChange,
    onClose,
    id_respuesta,
    setRespuestas,
}) {
    const confirmDelete = () => {
        if (id_respuesta !== null) {
            del(`preguntaVideo/respuesta/${id_respuesta}`).then(() => {
                setRespuestas((prev) => {
                    return prev.filter(
                        (respuesta) =>
                            respuesta.id_respuestas_video_cuestionario !==
                            id_respuesta
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
                                ¿Estás seguro que deseas eliminar esta
                                respuesta?
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

ModalEliminarRespuesta.propTypes = {
    isOpen: propTypes.bool,
    onOpenChange: propTypes.func,
    onClose: propTypes.func,
    id_respuesta: propTypes.number,
    setRespuestas: propTypes.func,
};

export default ModalEliminarRespuesta;
