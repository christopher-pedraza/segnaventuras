/* eslint-disable react/prop-types */
import EnvironmentItem from "./EnvironmentItem";
import { FaPlus } from "react-icons/fa";

function EnvironmentList({ environments, setEnvironments, navigate }) {
  const addEnvironment = async () => {
    const name = prompt("Nombre del nuevo entorno:");
    if (name) {
      try {
        const response = await fetch("http://localhost:3000/isla/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: name,
            modelo_general: null,
            modelo_especifico: null,
          }),
        });
        const newEnvironment = await response.json();
        if (response.ok) {
          setEnvironments([...environments, newEnvironment]);
        } else {
          throw new Error("Failed to create environment");
        }
      } catch (error) {
        console.error("Error creating environment:", error);
        alert("Error al crear el entorno");
      }
    }
  };

  return (
    <div className="w-3/12 p-4 space-y-4">
      <button
        className="p-2 rounded bg-blue-500 text-white"
        onClick={addEnvironment}
        title="Crear Entorno"
      >
        <div className="flex items-center gap-2">
          <FaPlus />
          <p>Agregar Entorno</p>
        </div>
      </button>
      {environments.map((environment) => (
        <EnvironmentItem
          key={environment.id_isla}
          environment={environment}
          setEnvironments={setEnvironments}
          navigate={navigate}
        />
      ))}
    </div>
  );
}

export default EnvironmentList;
