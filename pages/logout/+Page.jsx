export { Page };

import { LogoutForm } from "../../components/buttons/ActionButton";

function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LogoutForm />
    </div>
  )
}