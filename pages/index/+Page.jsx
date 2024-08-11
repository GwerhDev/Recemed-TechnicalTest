import { useEffect, useState } from "react";
import { getRecipes } from "../../services/fetch-recipes";
import { RecipeCard } from "../../components/cards/RecipeCard";

function Page() {
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes();
        setRecipes(response);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Inicio</h1>
      <ul>
        {
          error
            ? <p>{error}</p>
            : recipes?.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))
        }
      </ul>
    </div>
  );
}

export { Page };
