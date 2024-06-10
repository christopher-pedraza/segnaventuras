/* eslint-disable react/prop-types */
import CategoryItem from "./CategoryItem";

function CategoryList({ environment, setEnvironments, navigate }) {
  return (
    <div className="ml-6">
      {environment.nivel.map((cat) => (
        <CategoryItem
          key={cat.id_nivel}
          category={cat}
          environment={environment}
          setEnvironments={setEnvironments}
          navigate={navigate}
        />
      ))}
    </div>
  );
}

export default CategoryList;
