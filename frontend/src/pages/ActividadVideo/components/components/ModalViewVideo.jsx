// Nextui components
import { Modal, ModalContent } from "@nextui-org/react";

import propTypes from "prop-types";

function ModalViewVideo({ isOpen, onOpenChange, idVideo }) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="opaque"
            size="3xl"
        >
            <ModalContent>
                <iframe
                    width={"100%"}
                    height={"432px"}
                    src={`https://www.youtube.com/embed/${idVideo}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </ModalContent>
        </Modal>
    );
}

ModalViewVideo.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onOpenChange: propTypes.func.isRequired,
    idVideo: propTypes.string,
};

export default ModalViewVideo;
