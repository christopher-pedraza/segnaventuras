import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavbarLogin() {
    return (
        <nav
            className="flex items-center justify-between bg-black p-5"
            style={{ background: "#080945" }}
        >
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo Dilo en señas"
                    width="60"
                    height="60"
                    className="mr-4"
                />
                <p className="text-4xl font-bold text-white">Dilo en Señas</p>
            </div>

            <div className="flex">
                <div className="mx-4">
                    <NavLink
                        to="/login"
                        className="text-white text-xl hover:text-gray-300 hover:underline"
                    >
                        Iniciar Sesión
                    </NavLink>
                </div>
                <div className="mx-4">
                    <NavLink
                        to="/signin"
                        className="text-white text-xl hover:text-gray-300 hover:underline"
                    >
                        Registrarse
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
