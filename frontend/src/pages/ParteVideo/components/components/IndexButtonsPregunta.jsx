import propTypes from "prop-types";
import { Button } from "@nextui-org/react";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { put } from "src/utils/ApiRequests";

function IndexButtonsPregunta({
    id_parte,
    id_pregunta,
    index,
    preguntas_length,
    setPreguntas,
}) {
    const handleMoveUp = () => {
        put(`preguntaVideo/cambiarIndice/${id_pregunta}`, {
            direccion: "up",
            id_parte: id_parte,
        }).then(() => {
            setPreguntas((prev) => {
                const copy = [...prev];
                const temp = copy[index];
                copy[index] = copy[index - 1];
                copy[index - 1] = temp;
                return copy;
            });
        });
    };

    const handleMoveDown = () => {
        put(`preguntaVideo/cambiarIndice/${id_pregunta}`, {
            direccion: "down",
            id_parte: id_parte,
        }).then(() => {
            setPreguntas((prev) => {
                const copy = [...prev];
                const temp = copy[index];
                copy[index] = copy[index + 1];
                copy[index + 1] = temp;
                return copy;
            });
        });
    };

    return (
        <div className="flex flex-col">
            <Button
                isIconOnly={true}
                size="sm"
                variant="light"
                onPress={() => {
                    handleMoveUp();
                }}
                isDisabled={index === 0}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <Button
                isIconOnly={true}
                size="sm"
                variant="light"
                onPress={() => {
                    handleMoveDown();
                }}
                isDisabled={index === preguntas_length - 1}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </Button>
        </div>
    );
}

IndexButtonsPregunta.propTypes = {
    id_parte: propTypes.number,
    id_pregunta: propTypes.number,
    index: propTypes.number,
    preguntas_length: propTypes.number,
    setPreguntas: propTypes.func,
};

export default IndexButtonsPregunta;
