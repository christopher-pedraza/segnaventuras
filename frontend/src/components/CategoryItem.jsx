/* eslint-disable react/prop-types */
import { FaEdit, FaTrash } from "react-icons/fa";

function CategoryItem({ category, environment, setEnvironments, navigate }) {
  const deleteCategory = async (catId) => {
    try {
      const response = await fetch(`http://localhost:3000/niveles/${catId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      setEnvironments((prev) =>
        prev.map((env) => {
          if (env.id_isla === environment.id_isla) {
            return {
              ...env,
              categories: env.categories
                ? env.categories.filter((cat) => cat.id_nivel !== catId)
                : [],
            };
          }
          return env;
        })
      );

      // Recargamos la página para reflejar los cambios antes de la redirección
      window.location.reload();

      // Redirección usando navigate a home
      navigate("/home");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error al eliminar la categoría");
    }
  };

  const editCategory = async (catId) => {
    const newName = prompt("Editar el nombre de la categoría:");
    if (newName) {
      try {
        const response = await fetch(`http://localhost:3000/niveles/${catId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_isla: environment.id_isla,
            nombre: newName,
          }),
        });
        const updatedCategory = await response.json();
        if (!response.ok) throw new Error("Failed to update category");
        setEnvironments((prev) =>
          prev.map((env) => {
            if (env.id_isla === environment.id_isla) {
              return {
                ...env,
                categories: env.categories
                  ? env.categories.map((cat) =>
                      cat.id_nivel === catId
                        ? { ...cat, nombre: updatedCategory.nombre }
                        : cat
                    )
                  : [],
              };
            }
            return env;
          })
        );

        // Recargamos la página para reflejar los cambios antes de la redirección
        window.location.reload();

        // Redirección usando navigate a home
        navigate("/home");
      } catch (error) {
        console.error("Error updating category:", error);
        alert("Error al actualizar la categoría");
      }
    }
  };

  return (
    <div className="flex items-center justify-between py-1">
      <span
        className="text-xs cursor-pointer"
        onClick={() => navigate(`/${environment.id_isla}/${category.id_nivel}`)}
      >
        {category.nombre}
      </span>
      <div className="flex space-x-2">
        <button
          className="p-1 bg-green-500 text-white rounded"
          onClick={() => editCategory(category.id_nivel)}
          title="Editar Categoría"
        >
          <FaEdit />
        </button>
        <button
          className="p-1 bg-red-500 text-white rounded"
          onClick={() => deleteCategory(category.id_nivel)}
          title="Eliminar Categoría"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default CategoryItem;
