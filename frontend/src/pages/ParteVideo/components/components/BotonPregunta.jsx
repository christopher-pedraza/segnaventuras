import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";

function BotonPregunta({ handlePress, icon, color, variant, classes }) {
    return (
        <Button
            isIconOnly={true}
            color={color}
            variant={variant}
            onPress={() => {
                handlePress();
            }}
            className={classes}
        >
            <FontAwesomeIcon icon={icon} />
        </Button>
    );
}

BotonPregunta.propTypes = {
    handlePress: propTypes.func.isRequired,
    icon: propTypes.object.isRequired,
    color: propTypes.string.isRequired,
    variant: propTypes.string.isRequired,
    classes: propTypes.string,
};

export default BotonPregunta;
