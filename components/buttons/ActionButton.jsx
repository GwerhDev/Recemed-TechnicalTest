export function ActionButton(props) {
  const { text, action } = props || null;

  return (
    <form method="GET" action={action}>
      <button className="uppercase">
        {text}
      </button>
    </form>
  );
}
