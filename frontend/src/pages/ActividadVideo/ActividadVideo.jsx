import { useEffect, useState } from "react";

// Llamadas a la API
import { get } from "src/utils/ApiRequests";

// Enrutamiento
import { useParams } from "react-router-dom";

// Components
import Navbar from "../../components/Navbar";
import ModalCreateParteVideo from "./components/ModalCreateParteVideo";
import TarjetaActividadVideo from "./components/TarjetaActividadVideo";

// Fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Plus icon
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Nextui components
import { Button, useDisclosure } from "@nextui-org/react";

function NewActividadVideo() {
    const [partes, setPartes] = useState([]);
    // Variable para que se actualice la lista de partes cuando se elimina una
    const [refresh, setRefresh] = useState(false);
    // Disclosures para el modal
    const createDisclosure = useDisclosure();

    let { id_nivel } = useParams();
    id_nivel = parseInt(id_nivel);

    useEffect(() => {
        get(`parteVideo/byNivel/${id_nivel}`).then((data) => {
            // Ordenar las partes por el índice
            data.sort((a, b) => a.indice - b.indice);
            setPartes(data);
        });
    }, [id_nivel, refresh]);

    const handleCreate = () => {
        createDisclosure.onOpen();
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl m-auto p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl">Actividad de Videos</h2>
                    <Button
                        startContent={<FontAwesomeIcon icon={faPlus} />}
                        color="success"
                        onPress={handleCreate}
                    >
                        Parte
                    </Button>
                </div>
                <div>
                    {partes.map((parte) => (
                        <TarjetaActividadVideo
                            key={parte.id_parte_video_cuestionario}
                            parte={parte}
                            partes_length={partes.length}
                            id_nivel={id_nivel}
                            setRefresh={setRefresh}
                        />
                    ))}
                </div>
            </div>
            <ModalCreateParteVideo
                isOpen={createDisclosure.isOpen}
                onOpenChange={createDisclosure.onOpenChange}
                onClose={createDisclosure.onClose}
                id_nivel={id_nivel}
                partes={partes}
                setPartes={setPartes}
            />
        </div>
    );
}

export default NewActividadVideo;
