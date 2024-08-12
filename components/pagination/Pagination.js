const Pagination = (props) => {
  const { currentPage, totalPages, onPageChange } = props || null;

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-rm-blue-100 text-white rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="mx-2 text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-rm-blue-100 text-white rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
