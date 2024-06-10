import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      {/*Agregar aqui elementos que se necesiten repetir en todas las pantallas (por ejemplo, el navbar)*/}
      <Outlet />
    </>
  );
}

export default Root;
