import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
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
                        to="/niveles"
                        className="text-white text-xl hover:text-gray-300 hover:underline"
                    >
                        Niveles
                    </NavLink>
                </div>
                <div className="mx-4">
                    <NavLink
                        to="/categories"
                        className="text-white text-xl hover:text-gray-300 hover:underline"
                    >
                        Categorías
                    </NavLink>
                </div>
                <div className="mx-4">
                    <NavLink
                        to="/quiz"
                        className="text-white text-xl hover:text-gray-300 hover:underline"
                    >
                        Quiz
                    </NavLink>
                </div>
                <div className="mx-4">
                    <NavLink
                        to="/videos"
                        className="text-white text-xl hover:text-gray-300 hover:underline"
                    >
                        Videos
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
