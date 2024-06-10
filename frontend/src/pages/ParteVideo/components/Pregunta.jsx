// NextUi Components
import {
    Divider,
    Button,
    Checkbox,
    Input,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
} from "@nextui-org/react";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Components
import BotonPregunta from "./components/BotonPregunta";
import IndexButtonsPregunta from "./components/IndexButtonsPregunta";
import RespuestaVideo from "./components/RespuestaVideo";
import ModalEditarPregunta from "./components/ModalEditarPregunta";
import ModalEliminarPregunta from "./components/ModalEliminarPregunta";
import ModalCrearRespuesta from "./components/ModalCrearRespuesta";

import propTypes from "prop-types";

// Hooks
import { useState, useEffect } from "react";

function Pregunta({
    array_index,
    datos_pregunta,
    setPreguntas,
    preguntas_length,
    id_parte,
}) {
    const {
        id_preguntas_video_cuestionario,
        pregunta,
        respuestas_video_cuestionario,
    } = datos_pregunta;

    const [respuestas, setRespuestas] = useState([]);

    const editarPreguntaDisclosure = useDisclosure();
    const eliminarPreguntaDisclosure = useDisclosure();
    const crearRespuestaDisclosure = useDisclosure();

    useEffect(() => {
        setRespuestas(respuestas_video_cuestionario);
    }, [respuestas_video_cuestionario]);

    return (
        <div>
            <Card className="mb-4">
                <CardHeader className="flex items-center">
                    <Input
                        label="Pregunta"
                        isReadOnly
                        value={pregunta}
                        variant="underlined"
                        className="mr-4"
                    />
                    {/* </Card> */}
                    <BotonPregunta
                        handlePress={editarPreguntaDisclosure.onOpen}
                        icon={faPencilAlt}
                        color="secondary"
                        variant="light"
                        classes={"mr-4"}
                    />
                    <BotonPregunta
                        handlePress={eliminarPreguntaDisclosure.onOpen}
                        icon={faTrash}
                        color="danger"
                        variant="light"
                        classes={"mr-4"}
                    />
                    <IndexButtonsPregunta
                        id_parte={id_parte}
                        id_pregunta={id_preguntas_video_cuestionario}
                        index={array_index}
                        preguntas_length={preguntas_length}
                        setPreguntas={setPreguntas}
                    />
                </CardHeader>
                <CardBody>
                    {respuestas &&
                        respuestas.map((respuesta, index) => (
                            <RespuestaVideo
                                key={index}
                                datos_respuesta={respuesta}
                                setRespuestas={setRespuestas}
                                array_index={index}
                            />
                        ))}
                    <div className="w-full flex justify-center">
                        {/* <BotonPregunta
                            handlePress={crearRespuestaDisclosure.onOpen}
                            icon={faPlus}
                            color="success"
                            variant="ghost"
                            classes={"mt-4"}
                        /> */}
                        <Button
                            startContent={<FontAwesomeIcon icon={faPlus} />}
                            color="success"
                            variant="ghost"
                            className="mt-4"
                            onPress={crearRespuestaDisclosure.onOpen}
                        >
                            Respuesta
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <ModalEditarPregunta
                isOpen={editarPreguntaDisclosure.isOpen}
                onOpenChange={editarPreguntaDisclosure.onOpenChange}
                onClose={editarPreguntaDisclosure.onClose}
                id_pregunta={id_preguntas_video_cuestionario}
                array_index={array_index}
                setPreguntas={setPreguntas}
                preguntaActual={pregunta}
            />
            <ModalEliminarPregunta
                isOpen={eliminarPreguntaDisclosure.isOpen}
                onOpenChange={eliminarPreguntaDisclosure.onOpenChange}
                onClose={eliminarPreguntaDisclosure.onClose}
                id_pregunta={id_preguntas_video_cuestionario}
                setPreguntas={setPreguntas}
                id_parte={id_parte}
            />
            <ModalCrearRespuesta
                isOpen={crearRespuestaDisclosure.isOpen}
                onOpenChange={crearRespuestaDisclosure.onOpenChange}
                onClose={crearRespuestaDisclosure.onClose}
                id_pregunta={id_preguntas_video_cuestionario}
                setRespuestas={setRespuestas}
            />
        </div>
    );
}

Pregunta.propTypes = {
    array_index: propTypes.number,
    datos_pregunta: propTypes.object,
    setPreguntas: propTypes.func,
    preguntas_length: propTypes.number,
    id_parte: propTypes.number,
};

export default Pregunta;
