export const RecipeCard = (props) => {
  const { prescriptions } = props || null;

  return (
    <article className="">
      <h2>{prescriptions.code}</h2>
      <p>{prescriptions.inserted_at}</p>
      <p>{prescriptions.doctor.first_name}</p>
    </article>
  );
};
