import { CustomInput } from "../inputs/CustomInput";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function PasswordForm(props) {
  const { errorMessage } = props || null;
  
  return (
    <form method="POST" action="/_auth/login">
      <ul className="flex flex-col">
      <CustomInput
          name="password"
          placeholder="Ingresa tu contraseña"
          type="text"
          required
        />
        <PrimaryButton text="ingresar" />
        {errorMessage && <h3>{errorMessage}</h3>}
      </ul>
    </form>
  );
}
