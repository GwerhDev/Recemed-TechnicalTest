export const PrescriptionCard = (props) => {
  const { prescription } = props || null;

  return (
    <article className="bg-[#d1f0f9] p-4 rounded-[5px] shadow-md flex flex-col">
      <span className="flex justify-between text-[12px] border-b-2 border-rm-blue-100">
        <p>Folio: <span className="font-semibold">{prescription.code}</span></p>
        <h3 className="font-bold text-rm-blue-100">Receta de Medicamentos</h3>
      </span>
      <small className="text-[9px] mt-2">{prescription.inserted_at}</small>
      <ul className="flex flex-col gap-1">
        <span className="font-bold text-rm-blue-100">
          Dr: {prescription.doctor.first_name}
        </span>
        <p className="text-[12px] font-semibold">
          {prescription.doctor.speciality}
        </p>
        <p className="text-[12px]">
          código: <span className="font-semibold">{prescription.code}</span>
        </p>
      </ul>
    </article>
  );
};
