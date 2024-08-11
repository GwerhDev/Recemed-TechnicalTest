import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";

function Page() {
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = getCookie('token') || '';
        const response = await fetch('http://rec-staging.recemed.cl/api/patients/prescriptions?page=1', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const { data } = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || 'Error fetching data');
        }

        setRecipes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Inicio</h1>
      {
        error &&
        <p>{error}</p>
      }
      {
        !error && recipes?.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.code}</h2>
            <p>{recipe.inserted_at}</p>
            <p>{recipe.doctor.first_name}</p>
          </div>
        ))}
    </div>
  );
}

export { Page };
