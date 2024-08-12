import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { getPrescriptions } from "../../services/fetch-prescriptions";
import { PrescriptionCard } from "../../components/cards/PrescriptionCard";
import { Loader } from "../../components/loader/Loader";
import LoadMoreButton from "../../components/buttons/LoadMoreButton";
import Pagination from "../../components/pagination/Pagination";

function Page() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [totalPrescriptions, setTotalPrescriptions] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleLoadMore = () => {
    if (hasMore) {
      setIsLoadMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePageChange = (newPage) => {
    setIsLoadMore(false);
    setPage(newPage);
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        if (isLoadMore) {
          setShowButtonLoader(true);
          const response = await getPrescriptions(page);
          setShowButtonLoader(false);
          setTotalPrescriptions(response?.meta?.total_count);
          setTotalPages(response?.meta?.total_pages);

          const hasNextPage = response?.meta["has_next_page?"];
          setHasMore(hasNextPage);

          setPrescriptions((prev) => [
            ...prev,
            ...response.data.filter((prescription) => !prev.some(p => p.id === prescription.id)),
          ]);
        } else {
          setShowLoader(true);
          const response = await getPrescriptions(page);
          setShowLoader(false);
          setTotalPrescriptions(response?.meta?.total_count);
          setTotalPages(response?.meta?.total_pages);
          setPrescriptions(response.data);
          const hasNextPage = response?.meta["has_next_page?"];
          setHasMore(hasNextPage);
        }
      } catch (err) {
        setError(err.message);
        setShowLoader(false);
      }
    };

    fetchPrescriptions();
  }, [page, isLoadMore]);

  return (
    <div>
      <Header />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {
        error && <p>{error}</p>
      }
      {
        showLoader
          ?
          <Loader />
          :
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1440px] mx-auto">
            {
              prescriptions.map((prescription) => (
                <li key={prescription.id}>
                  <PrescriptionCard prescription={prescription} />
                </li>
              ))
            }
          </ul>
      }
      {
        showButtonLoader
          ?
          <Loader />
          :
          <div className="flex flex-col items-center mt-4 mb-8">
            <p className="mb-2 text-sm text-gray-600">
              Mostrando {prescriptions.length} de {totalPrescriptions} {totalPrescriptions === 1 ? 'resultado' : 'resultados'}
            </p>
            <LoadMoreButton onClick={handleLoadMore} hasMore={hasMore} />
          </div>
      }
    </div>
  );
}

export { Page };
