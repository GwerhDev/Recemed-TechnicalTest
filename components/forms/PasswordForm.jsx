import { CustomInput } from "../inputs/CustomInput";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function PasswordForm(props) {
  const { errorMessage } = props || null;

  return (
    <form method="POST" action="/_auth/login">
      <ul className="flex flex-col gap-[15px]">
        <li>
          <p className="text-gray-600 font-bold">Portal paciente</p>
          <h1 className="text-4xl text-rm-blue-100 font-bold">
            Ingresa a tu Portal
          </h1>
        </li>
        <li className="flex flex-col gap-[5px]">
          <CustomInput
            name="password"
            placeholder="Ingresa tu contraseña"
            type="password"
            required
          />
          <PrimaryButton text="ingresar" />
        </li>
        {errorMessage && <h3>{errorMessage}</h3>}
      </ul>
    </form>
  );
}
