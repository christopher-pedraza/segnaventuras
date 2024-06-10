import propTypes from "prop-types";

// Components
import BotonTarjetaActividadVideo from "./components/BotonTarjetaActividadVideo";
import IndexButtons from "./components/IndexButtons";
import ModalEliminarParte from "./components/ModalEliminarParte";
import ModalViewVideo from "./components/ModalViewVideo";

// Trash icon
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// Pencil icon
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// Youtube icon
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

// Hooks
import { useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TarjetaActividadVideo({ parte, partes_length, id_nivel, setRefresh }) {
    const { id_parte_video_cuestionario, nombre, url_video, indice } = parte;

    // ID de la parte seleccionada que se quiere eliminar
    const [idToDelete, setIdToDelete] = useState(null);
    // ID del video a desplegar
    const [idVideo, setIdVideo] = useState(null);

    // Disclosures para el modal
    const deleteDisclosure = useDisclosure();
    const videoDisclosure = useDisclosure();

    const navigate = useNavigate();

    const handleViewVideo = (id_video) => {
        setIdVideo(id_video);
        videoDisclosure.onOpen();
    };

    const handleEdit = (id_parte) => {
        navigate(`/videos/${id_nivel}/parte/${id_parte}`);
        console.log("Editando: ", id_parte);
    };

    const handleDelete = (id_parte) => {
        setIdToDelete(id_parte);
        deleteDisclosure.onOpen();
    };

    return (
        <>
            <div
                key={id_parte_video_cuestionario}
                className="flex items-center justify-between p-4 my-4 bg-white rounded-md shadow-md"
            >
                <div>
                    <h3 className="text-xl">{nombre}</h3>
                    <p>{url_video}</p>
                    <p>Índice: {indice}</p>
                </div>
                <div className="flex justify-end">
                    <div className="flex items-center">
                        <BotonTarjetaActividadVideo
                            handlePress={() => {
                                handleViewVideo(url_video);
                            }}
                            icon={faYoutube}
                            color="primary"
                            variant="light"
                        />
                        <BotonTarjetaActividadVideo
                            handlePress={() => {
                                handleEdit(id_parte_video_cuestionario);
                            }}
                            icon={faPencilAlt}
                            color="secondary"
                            variant="light"
                        />
                        <BotonTarjetaActividadVideo
                            handlePress={() => {
                                handleDelete(id_parte_video_cuestionario);
                            }}
                            icon={faTrash}
                            color="danger"
                            variant="solid"
                        />
                    </div>
                    <IndexButtons
                        setRefresh={setRefresh}
                        id_nivel={id_nivel}
                        id_parte={id_parte_video_cuestionario}
                        index={indice}
                        partes_length={partes_length}
                    />
                </div>
            </div>
            <ModalEliminarParte
                isOpen={deleteDisclosure.isOpen}
                onOpenChange={deleteDisclosure.onOpenChange}
                onClose={deleteDisclosure.onClose}
                setIdToDelete={setIdToDelete}
                idToDelete={idToDelete}
                setRefresh={setRefresh}
            />
            <ModalViewVideo
                isOpen={videoDisclosure.isOpen}
                onOpenChange={videoDisclosure.onOpenChange}
                idVideo={idVideo}
            />
        </>
    );
}

TarjetaActividadVideo.propTypes = {
    parte: propTypes.object.isRequired,
    partes_length: propTypes.number.isRequired,
    id_nivel: propTypes.number.isRequired,
    setRefresh: propTypes.func.isRequired,
};

export default TarjetaActividadVideo;
