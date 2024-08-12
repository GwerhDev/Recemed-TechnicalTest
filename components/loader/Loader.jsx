import loader from "../../assets/svg/loading.svg";

export function Loader() {
  return (
    <div className="flex flex-col items-center mt-4 mb-8">
      <img src={loader} alt="" width={60} />
    </div>
  )
}