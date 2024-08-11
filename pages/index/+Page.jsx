import { useEffect, useState } from "react";
import { getPrescriptions } from "../../services/fetch-prescriptions";
import { PrescriptionCard } from "../../components/cards/PrescriptionCard";
import { Header } from "../../components/header/Header";

function Page() {
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await getPrescriptions();
        setPrescriptions(response);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPrescriptions();
  }, []);

  return (
    <div>
      <Header />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {error
          ? <p>{error}</p>
          : prescriptions?.map((prescription) => (
              <li key={prescription.id}>
                <PrescriptionCard prescription={prescription} />
              </li>
            ))}
      </ul>
    </div>
  );
}

export { Page };
