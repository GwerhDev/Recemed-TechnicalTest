export const RecipeCard = (props) => {
  const { recipe } = props || null;

  return (
    <article className="">
      <h2>{recipe.code}</h2>
      <p>{recipe.inserted_at}</p>
      <p>{recipe.doctor.first_name}</p>
    </article>
  );
};
