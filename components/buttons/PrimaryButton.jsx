export const PrimaryButton = (props) => {
  const { text } = props || null;
  
  return (
    <button type="submit" className="">
      {text}
    </button>
  );
};
