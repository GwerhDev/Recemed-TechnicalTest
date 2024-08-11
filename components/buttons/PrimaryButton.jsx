export const PrimaryButton = (props) => {
  const { text } = props || null;

  return (
    <button type="submit"
      className="bg-rm-blue-100 text-white hover:bg-rm-blue-200 rounded-lg 
      uppercase border rounded-[30px] font-semibold w-full">
      {text}
    </button>
  );
};
