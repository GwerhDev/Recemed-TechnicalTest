export const PrescriptionCard = (props) => {
  const { prescription } = props || null;
  const { type, doctor } = prescription || null;

  let backgroundColor;

  switch (type) {
    case "Receta Retenida":
      backgroundColor = "bg-[#d1f0f9]";
      break;
    case "Receta Simple":
      backgroundColor = "bg-green-100";
      break;
    default:
      backgroundColor = "bg-red-100";
  }

  return (
    <article className={`${backgroundColor} p-4 rounded-[5px] shadow-md flex flex-col`}>
      <span className="flex justify-between text-[12px] border-b-2 border-rm-blue-100">
        <p>Folio: <span className="font-semibold">{prescription.id}</span></p>
        <h3 className="font-bold text-rm-blue-100">Receta de Medicamentos</h3>
      </span>
      <small className="text-[9px] mt-2">{prescription.inserted_at}</small>
      <ul className="flex flex-col gap-1">
        <h2 className="font-bold text-rm-blue-100">
          Dr: {doctor.first_name} {doctor.last_name}
        </h2>
        <p className="text-[12px] font-semibold">
          {doctor.speciality}
        </p>
        <p className="text-[12px]">
          código: <span className="font-semibold">{prescription.code}</span>
        </p>
      </ul>
    </article>
  );
};
