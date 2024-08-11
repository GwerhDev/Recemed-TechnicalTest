export { Page };

import { PasswordForm } from "../../../components/forms/PasswordForm";

function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <PasswordForm />
    </div>
  )
}