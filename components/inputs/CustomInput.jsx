export const CustomInput = (props) => {
  const { name, placeholder, type, required } = props || null;

  return (
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      required={required}
    />
  );
};
