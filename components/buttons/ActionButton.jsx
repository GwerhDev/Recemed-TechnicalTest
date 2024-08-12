export function ActionButton(props) {
  const { text, action } = props || null;

  return (
    <form method="GET" action={action} className="flex">
      <button className="bg-rm-blue-100 text-white hover:bg-rm-blue-200 rounded-lg 
      uppercase border text-[9px] rounded-[30px] font-semibold w-full p-1 pl-4 pr-4">
        {text}
      </button>
    </form>
  );
}
