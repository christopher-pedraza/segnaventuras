import Navbar from "../components/Navbar";
import { get } from "src/utils/ApiRequests";
import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setNivel, selectNivel } from "src/redux/Slices/nivelSlice";

function Niveles() {
    const [niveles, setNiveles] = useState([]);
    const [nivelSelecconado, setNivelSeleccionado] = useState("");
    const dispatch = useDispatch();
    const nivel = useSelector(selectNivel);

    useEffect(() => {
        get("niveles/getByIsla/1").then((data) => {
            console.log(data);
            setNiveles(data);
        });
    }, [setNiveles]);

    useEffect(() => {
        dispatch(setNivel(Number(nivelSelecconado)));
    }, [nivelSelecconado, dispatch]);

    const handleSelectionChange = (value) => {
        setNivelSeleccionado(value);
    };

    return (
        <div>
            <Navbar />
            <Autocomplete
                label="Selecciona un nivel"
                className="max-w-xs"
                defaultItems={niveles}
                selectedKey={nivelSelecconado}
                onSelectionChange={handleSelectionChange}
            >
                {(nivel) => (
                    <AutocompleteItem
                        key={nivel.id_nivel}
                        value={String(nivel.id_nivel)}
                        textValue={String(nivel.id_nivel)}
                    >
                        {nivel.id_nivel}
                    </AutocompleteItem>
                )}
            </Autocomplete>
            <span>
                <strong>Nivel seleccionado: </strong>
                {nivel}
            </span>
        </div>
    );
}

export default Niveles;
