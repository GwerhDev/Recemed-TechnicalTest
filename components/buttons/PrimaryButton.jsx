export const PrimaryButton = (props) => {
  const { text } = props || null;

  return (
    <button type="submit"
      className="bg-rm-blue-100 text-white hover:bg-rm-blue-200 h-[22px] rounded-lg 
      uppercase border rounded-[25px] text-[9px] font-semibold w-full">
      {text}
    </button>
  );
};
