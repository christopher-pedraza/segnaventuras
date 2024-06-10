import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";

function BotonTarjetaActividadVideo({ handlePress, icon, color, variant }) {
    return (
        <Button
            isIconOnly={true}
            color={color}
            variant={variant}
            onPress={() => {
                handlePress();
            }}
            className="mr-4"
        >
            <FontAwesomeIcon icon={icon} />
        </Button>
    );
}

BotonTarjetaActividadVideo.propTypes = {
    handlePress: propTypes.func.isRequired,
    icon: propTypes.object.isRequired,
    color: propTypes.string.isRequired,
    variant: propTypes.string.isRequired,
};

export default BotonTarjetaActividadVideo;
