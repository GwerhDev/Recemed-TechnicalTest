export function RutForm(props) {
  const { errorMessage } = props || null;
  
  return (
    <form method="POST" action="/_auth/login/validate_rut">
      <ul>
        <input
          name="rut"
          placeholder="Ingresa tu rut"
          type="text"
          required
        />
        <button type="submit">
          siguiente
        </button>
        {errorMessage && <h3>{errorMessage}</h3>}
      </ul>
    </form>
  );
}
