export function PasswordForm(props) {
  const { errorMessage } = props || null;
  
  return (
    <form method="POST" action="/_auth/login">
      <ul>
        <input
          name="password"
          placeholder="Ingresa tu contraseña"
          type="text"
          required
        />
        <button type="submit">
          ingresar
        </button>
        {errorMessage && <h3>{errorMessage}</h3>}
      </ul>
    </form>
  );
}
