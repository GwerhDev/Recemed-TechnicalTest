export const CustomInput = (props) => {
  const { name, placeholder, type, required } = props || null;

  return (
    <input
      className="border-[1.5px] border-rm-blue-100 rounded-[10px] p-2 w-full h-[22px] 
      text-[10px] text-center placeholder:text-center font-semibold"
      name={name}
      placeholder={placeholder}
      type={type}
      required={required}
    />
  );
};
