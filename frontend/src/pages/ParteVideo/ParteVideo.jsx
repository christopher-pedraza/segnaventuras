// Hooks
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";

// Llamadas API
import { get } from "src/utils/ApiRequests";

// Enrutamiento
import { useParams, useNavigate } from "react-router-dom";

// Components
import Navbar from "../../components/Navbar";
import ModalEditarParteVideo from "./components/ModalEditarParteVideo";
import ModalCrearPregunta from "./components/ModalCrearPregunta";
import Pregunta from "./components/Pregunta";

// NextUI components
import { Button } from "@nextui-org/react";

// Fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Plus icon
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Pencil icon
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// Left arrow icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ParteVideo() {
    // Obtener del url el id de la parte de video
    let { id_nivel, id_parte } = useParams();
    id_parte = parseInt(id_parte);

    // Informacion de la parte
    const [data, setData] = useState({});
    const [preguntas, setPreguntas] = useState([]);

    // Historial de navegacion
    const navigate = useNavigate();

    // Disclosures para el modal
    const editDisclosure = useDisclosure();
    const createDisclosure = useDisclosure();

    useEffect(() => {
        get(`parteVideo/${id_parte}`).then((res) => {
            console.log("DATA", res);
            setData(res);
        });
    }, [id_parte]);

    useEffect(() => {
        get(`preguntaVideo/byParte/${id_parte}`).then((res) => {
            console.log("PREGUNTAS", res);
            setPreguntas(res);
        });
    }, [id_parte]);

    const handleReturn = () => {
        navigate(`/videos/${id_nivel}`);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl m-auto p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={handleReturn}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                        <h2 className="text-3xl">{data.nombre}</h2>
                    </div>
                    <div className="flex items-center">
                        <Button
                            startContent={
                                <FontAwesomeIcon icon={faPencilAlt} />
                            }
                            color="secondary"
                            onPress={editDisclosure.onOpen}
                            className="mr-2"
                        >
                            Editar datos
                        </Button>
                        <Button
                            startContent={<FontAwesomeIcon icon={faPlus} />}
                            color="success"
                            onPress={createDisclosure.onOpen}
                        >
                            Pregunta
                        </Button>
                    </div>
                </div>
                <div className="mt-4">
                    <iframe
                        width="100%"
                        height="400px"
                        src={`https://www.youtube.com/embed/${data.url_video}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mt-4">
                    {preguntas.map((pregunta, index) => (
                        <Pregunta
                            key={index}
                            array_index={index}
                            datos_pregunta={pregunta}
                            setPreguntas={setPreguntas}
                            preguntas_length={preguntas.length}
                            id_parte={id_parte}
                        />
                    ))}
                </div>
            </div>
            <ModalEditarParteVideo
                isOpen={editDisclosure.isOpen}
                onOpenChange={editDisclosure.onOpenChange}
                onClose={editDisclosure.onClose}
                id_parte={id_parte}
                data={data}
                setData={setData}
            />
            <ModalCrearPregunta
                isOpen={createDisclosure.isOpen}
                onOpenChange={createDisclosure.onOpenChange}
                onClose={createDisclosure.onClose}
                id_parte={id_parte}
                setPreguntas={setPreguntas}
                preguntas={preguntas}
            />
        </div>
    );
}

export default ParteVideo;
