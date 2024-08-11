import { CustomInput } from "../inputs/CustomInput";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function RutForm(props) {
  const { errorMessage } = props || null;

  return (
    <form method="POST" action="/_auth/login/validate_rut" className="test">
      <ul className="flex flex-col">
        <p>Portal paciente</p>
        <h1>Ingresa a tu Portal</h1>
        <CustomInput
          name="rut"
          placeholder="Ingresa tu rut"
          type="text"
          required
        />
        <PrimaryButton text="siguiente" />
        {errorMessage && <h3>{errorMessage}</h3>}
      </ul>
    </form>
  );
}
