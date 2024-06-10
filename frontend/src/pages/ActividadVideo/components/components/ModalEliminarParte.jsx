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

function ModalEliminarParte({
    isOpen,
    onOpenChange,
    onClose,
    setIdToDelete,
    idToDelete,
    setRefresh,
}) {
    const confirmDelete = () => {
        if (idToDelete !== null) {
            del(`parteVideo/${idToDelete}`).then(() => {
                setRefresh((prev) => !prev);
            });
        }
        onClose(); // Close the delete confirmation modal
        setIdToDelete(null); // Reset the id to delete
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Eliminar parte
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                ¿Estás seguro que deseas eliminar esta parte de
                                la actividad?
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

ModalEliminarParte.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onOpenChange: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired,
    setIdToDelete: propTypes.func.isRequired,
    idToDelete: propTypes.number,
    setRefresh: propTypes.func.isRequired,
};

export default ModalEliminarParte;
