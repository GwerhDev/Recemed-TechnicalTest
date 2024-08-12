const LoadMoreButton = (props) => {
  const { onClick, hasMore } = props || null;

  return (
    <div className="flex flex-col items-center mt-4 mb-8">
      <button
        onClick={onClick}
        disabled={!hasMore}
        className="px-4 py-2 bg-rm-blue-100 text-white rounded disabled:opacity-50"
      >
        Mostrar más
      </button>
    </div>
  );
};

export default LoadMoreButton;
