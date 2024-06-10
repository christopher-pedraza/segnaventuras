import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "../components/NavbarLogin";
import axios from "axios";

import { post } from "../utils/ApiRequests";

export default function SigninPage() {
    const navigate = useNavigate();

    // Estado para controlar los valores del formulario de inicio de sesión
    const [loginData, setLoginData] = useState({
        usuario: "",
        contrasegna: "",
        es_administrador: true,
    });

    // Destructuring del loginData
    const { usuario, contrasegna } = loginData;

    // Función que se ejecuta cada vez que se cambia el valor de un input
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Función que se ejecuta cuando se da click en el botón de Iniciar Sesión
    const handleLogin = (e) => {
        e.preventDefault();
        if (usuario.length > 1 && contrasegna.length > 1) {
            post("miembro/registro", loginData)
                .then((res) => {
                    navigate("/login");
                    console.log(res);
                    // alert("Usuario creado con exito");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al crear usuario");
                });
            // console.log("Iniciando sesión con:", loginData);
        }
    };

    return (
        <>
            <NavbarLogin />

            <div className="max-w-lg m-auto p-8 mt-20">
                <h2 className="text-3xl mb-4 text-center">Registrarse</h2>

                <form>
                    <label
                        htmlFor="usuario"
                        className="block text-lg font-bold mb-2"
                    >
                        Usuario
                    </label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Ingresa tu usuario"
                        className="w-full rounded-lg border border-slate-400 p-2 my-2"
                        required
                        value={usuario}
                        onChange={handleChange}
                    />

                    <label
                        htmlFor="contrasegna"
                        className="block text-lg font-bold mb-2"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="contrasegna"
                        name="contrasegna"
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-slate-400 p-2 my-2"
                        required
                        value={contrasegna}
                        onChange={handleChange}
                    />

                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="rounded-lg border border-slate-400 px-4 py-2 text-white w-full transform hover:scale-105 hover:text-gray-300"
                            style={{ background: "#8712E0" }}
                            type="submit"
                            onClick={handleLogin}
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
