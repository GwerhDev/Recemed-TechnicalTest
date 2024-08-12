import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { getPrescriptions } from "../../services/fetch-prescriptions";
import { PrescriptionCard } from "../../components/cards/PrescriptionCard";
import { Loader } from "../../components/loader/Loader";

function Page() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setShowLoader(true);
        const response = await getPrescriptions(page);
        setShowLoader(false);
        if (!response?.meta["has_next_page?"]) {
          setHasMore(false);
        } else {
          setPrescriptions((prev) => {
            const newPrescriptions = response.data.filter(
              (prescription) => !prev.some(p => p.id === prescription.id)
            );
            return [...prev, ...newPrescriptions];
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrescriptions();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) setPage(page + 1);
  };

  return (
    <div>
      <Header />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1440px] mx-auto">
        {error
          ? <p>{error}</p>
          : prescriptions.map((prescription) => (
            <li key={prescription.id}>
              <PrescriptionCard prescription={prescription} />
            </li>
          ))}
      </ul>
      {
        showLoader
          ?
          <Loader />
          :
          <div className="flex flex-col items-center mt-4 mb-8">
            <p className="mb-2 text-sm text-gray-600">
              Mostrando {prescriptions.length} {prescriptions.length === 1 ? 'resultado' : 'resultados'}
            </p>
            <button
              onClick={handleLoadMore}
              disabled={!hasMore}
              className="px-4 py-2 bg-rm-blue-100 text-white rounded disabled:opacity-50"
            >
              Mostrar más
            </button>
          </div>
      }
    </div>
  );
}

export { Page };
