export const CustomInput = (props) => {
  const { name, placeholder, type, required } = props || null;

  return (
    <input
      className="border-[1.5px] border-rm-blue-100 rounded-[20px] w-full 
      text-center placeholder:text-center font-semibold"
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
    />
  );
};
