import { useEffect, useState } from "react";
import { getPrescriptions } from "../../services/fetch-prescriptions";
import { RecipeCard } from "../../components/cards/PrescriptionCard";
import { Header } from "../../components/header/Header";

function Page() {
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getPrescriptions();
        setRecipes(response);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <Header />
      <ul className="">
        {
          error
            ? <p>{error}</p>
            : recipes?.map((prescriptions) => (
              <li key={prescriptions.id}>
                <RecipeCard prescriptions={prescriptions} />
              </li>
            ))
        }
      </ul>
    </div>
  );
}

export { Page };
