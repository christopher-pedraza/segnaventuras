import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EnvironmentList from "../components/EnvironmentList";

function HomePage() {
  const navigate = useNavigate();
  const { envName, categoryName } = useParams();
  const [environments, setEnvironments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnvironments = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/isla/withNiveles");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);
        setEnvironments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <EnvironmentList
        environments={environments}
        setEnvironments={setEnvironments}
        navigate={navigate}
      />
      <div className="w-9/12 p-4">
        <h1 className="text-2xl font-bold">Contenido de la Categoría</h1>
        <p className="text-xl">Entorno: {envName || "No especificado"}</p>
        <p className="text-xl">
          Categoría: {categoryName || "No especificada"}
        </p>
      </div>
    </div>
  );
}

export default HomePage;
