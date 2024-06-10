import propTypes from "prop-types";
import { Button } from "@nextui-org/react";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { put } from "src/utils/ApiRequests";

function IndexButtons({
    setRefresh,
    id_nivel,
    id_parte,
    index,
    partes_length,
}) {
    const handleMoveUp = () => {
        put(`parteVideo/cambiarIndice/${id_parte}`, {
            direccion: "up",
            id_nivel: id_nivel,
        }).then(() => {
            setRefresh((prev) => !prev);
        });
    };

    const handleMoveDown = () => {
        put(`parteVideo/cambiarIndice/${id_parte}`, {
            direccion: "down",
            id_nivel: id_nivel,
        }).then(() => {
            setRefresh((prev) => !prev);
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
                isDisabled={index === partes_length - 1}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </Button>
        </div>
    );
}

IndexButtons.propTypes = {
    setRefresh: propTypes.func.isRequired,
    id_nivel: propTypes.number.isRequired,
    id_parte: propTypes.number.isRequired,
    index: propTypes.number.isRequired,
    partes_length: propTypes.number.isRequired,
};

export default IndexButtons;
