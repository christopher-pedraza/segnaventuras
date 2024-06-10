/* eslint-disable react/prop-types */
import {
  FaEdit,
  FaTrash,
  FaCaretDown,
  FaCaretRight,
  FaPlus,
} from "react-icons/fa";
import CategoryList from "./CategoryList";

function EnvironmentItem({ environment, setEnvironments, navigate }) {
  const deleteEnvironment = async (envId) => {
    try {
      const response = await fetch(`http://localhost:3000/isla/${envId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete environment");
      setEnvironments((prev) => prev.filter((env) => env.id_isla !== envId));
    } catch (error) {
      console.error("Error deleting environment:", error);
      alert(
        "Error al eliminar el entorno, asegúrese de que todas las categorías han sido eliminadas primero."
      );
    }
  };

  const editEnvironment = async (envId) => {
    const newName = prompt("Editar el nombre del entorno:");
    if (newName) {
      try {
        const response = await fetch(`http://localhost:3000/isla/${envId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: newName,
            modelo_general: null,
            modelo_especifico: null,
          }),
        });
        const updatedEnv = await response.json();
        if (!response.ok) throw new Error("Failed to update environment");
        setEnvironments((prev) =>
          prev.map((env) =>
            env.id_isla === envId ? { ...env, nombre: updatedEnv.nombre } : env
          )
        );
      } catch (error) {
        console.error("Error updating environment:", error);
        alert("Error al actualizar el entorno");
      }
    }
  };
  const addCategory = async (envId) => {
    const name = prompt("Nombre de la nueva categoría:");
    if (name) {
      try {
        const response = await fetch(`http://localhost:3000/niveles/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_isla: envId, nombre: name }),
        });
        const newCategory = await response.json();
        if (!response.ok) throw new Error("Failed to add category");

        // Actualizamos el estado local tras la creación exitosa
        setEnvironments((prevEnvironments) =>
          prevEnvironments.map((env) => {
            if (env.id_isla === envId) {
              return {
                ...env,
                categories: [...(env.categories || []), newCategory], // Agregamos la nueva categoría
              };
            }
            return env;
          })
        );

        // Recargamos la página para reflejar los cambios antes de la redirección
        window.location.reload();

        // Redirección usando navigate con el id de la isla y el nivel recién creado
        navigate(`/${envId}/${newCategory.id_nivel}`);
      } catch (error) {
        console.error("Error adding category:", error);
        alert("Error al agregar la categoría");
      }
    }
  };

  const toggleCategories = () => {
    setEnvironments((prev) =>
      prev.map((env) =>
        env.id_isla === environment.id_isla
          ? { ...env, isOpen: !env.isOpen }
          : env
      )
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-start space-x-2">
        <button
          className="p-1 bg-blue-500 text-white rounded"
          onClick={toggleCategories}
          title="Toggle Categorías"
        >
          {environment.isOpen ? <FaCaretDown /> : <FaCaretRight />}
        </button>
        <span className="flex-grow text-sm font-bold">
          {environment.nombre}
        </span>
        <div className="flex space-x-2">
          <button
            className="p-1 bg-indigo-500 text-white rounded"
            onClick={() => addCategory(environment.id_isla)}
            title="Agregar Categoría"
          >
            <FaPlus />
          </button>
          <button
            className="p-1 bg-green-500 text-white rounded"
            onClick={() => editEnvironment(environment.id_isla)}
            title="Editar Entorno"
          >
            <FaEdit />
          </button>
          <button
            className="p-1 bg-red-500 text-white rounded"
            onClick={() => deleteEnvironment(environment.id_isla)}
            title="Eliminar Entorno"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      {environment.isOpen && (
        <CategoryList
          environment={environment}
          setEnvironments={setEnvironments}
          navigate={navigate}
        />
      )}
    </div>
  );
}

export default EnvironmentItem;
