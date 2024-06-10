// NextUi components
import { Checkbox, Input, useDisclosure } from "@nextui-org/react";

// Fontawesome icons
import { faPencilAlt, faXmark } from "@fortawesome/free-solid-svg-icons";

// Components
import BotonPregunta from "./BotonPregunta";
import ModalEditarRespuesta from "./components/ModalEditarRespuesta";
import ModalEliminarRespuesta from "./components/ModalEliminarRespuesta";

import propTypes from "prop-types";

function RespuestaVideo({ datos_respuesta, setRespuestas, array_index }) {
    const { id_respuestas_video_cuestionario, respuesta, es_correcta } =
        datos_respuesta;

    const editarRespuestaDisclosure = useDisclosure();
    const eliminarRespuestaDisclosure = useDisclosure();

    return (
        <div>
            <div className="flex items-center">
                <Checkbox
                    color="success"
                    radius="full"
                    isSelected={es_correcta}
                    isReadOnly
                    className="mr-1"
                />
                <Input
                    isReadOnly
                    value={respuesta}
                    variant="underlined"
                    className="mr-4"
                />
                <BotonPregunta
                    handlePress={editarRespuestaDisclosure.onOpen}
                    icon={faPencilAlt}
                    color="secondary"
                    variant="light"
                />
                <BotonPregunta
                    handlePress={eliminarRespuestaDisclosure.onOpen}
                    icon={faXmark}
                    color="danger"
                    variant="light"
                />
            </div>
            <ModalEditarRespuesta
                isOpen={editarRespuestaDisclosure.isOpen}
                onOpenChange={editarRespuestaDisclosure.onOpenChange}
                onClose={editarRespuestaDisclosure.onClose}
                id_respuesta={id_respuestas_video_cuestionario}
                array_index={array_index}
                setRespuestas={setRespuestas}
                respuestaActual={respuesta}
                esCorrectaActual={es_correcta}
            />
            <ModalEliminarRespuesta
                isOpen={eliminarRespuestaDisclosure.isOpen}
                onOpenChange={eliminarRespuestaDisclosure.onOpenChange}
                onClose={eliminarRespuestaDisclosure.onClose}
                id_respuesta={id_respuestas_video_cuestionario}
                setRespuestas={setRespuestas}
            />
        </div>
    );
}

RespuestaVideo.propTypes = {
    datos_respuesta: propTypes.object,
    setRespuestas: propTypes.func,
    array_index: propTypes.number,
};

export default RespuestaVideo;
