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

function ModalCreateParteVideo({
    isOpen,
    onOpenChange,
    onClose,
    id_nivel,
    partes,
    setPartes,
}) {
    // Datos de la parte que se quiere agregar
    const [nombreNuevo, setNombreNuevo] = useState("");
    const [urlVideoNuevo, setUrlVideoNuevo] = useState("");

    const confirmCreate = () => {
        post("parteVideo", {
            id_nivel: id_nivel,
            url_video: urlVideoNuevo,
            indice: 0,
            nombre: nombreNuevo,
        }).then((data) => {
            console.log(data);
            setPartes([...partes, data]);
        });
        onClose();
        setNombreNuevo("");
        setUrlVideoNuevo("");
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Agregar nueva parte
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Nombre"
                                variant="bordered"
                                value={nombreNuevo}
                                onChange={(e) => {
                                    setNombreNuevo(e.target.value);
                                }}
                            />
                            <Input
                                label="URL del video"
                                variant="bordered"
                                value={urlVideoNuevo}
                                onChange={(e) => {
                                    setUrlVideoNuevo(e.target.value);
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button color="success" onPress={confirmCreate}>
                                Agregar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

ModalCreateParteVideo.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onOpenChange: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired,
    id_nivel: propTypes.number.isRequired,
    partes: propTypes.array.isRequired,
    setPartes: propTypes.func.isRequired,
};

export default ModalCreateParteVideo;
