import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import "./App.css";
import Root from "./pages/Parents/Root";
import NotFound from "./pages/Rutas/NotFound";
import ProtectedRoutes from "./pages/Rutas/ProtectedRoutes";
import ActividadVideo from "./pages/ActividadVideo/ActividadVideo";
import ParteVideo from "./pages/ParteVideo/ParteVideo";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";

function secured(Component) {
    return function WrappedComponent(props) {
        return (
            <ProtectedRoutes>
                <Component {...props} />
            </ProtectedRoutes>
        );
    };
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="home" element={secured(HomePage)()} />
            <Route
                path="/:envName/:categoryName"
                element={secured(HomePage)()}
            />
            <Route
                path="videos/:id_nivel"
                element={secured(ActividadVideo)()}
            />
            <Route
                path="videos/:id_nivel/parte/:id_parte"
                element={secured(ParteVideo)()}
            />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
