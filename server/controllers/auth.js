import { apiRecemed } from "../config";

export function auth(app) {
  app.post('/_auth/login', async (req, res) => {
    try {
      const { rut } = req.cookies;
      const { password } = req.body;

      const user = await fetch(`${apiRecemed}/users/log_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { rut, password } })
      }).then(res => res.json());

      if (user?.errors) {
        return res.redirect(`/login/next-step?error=${encodeURIComponent(user.errors.detail)}`);

      } else if (user?.data) {
        const { token, profiles } = user.data;

        res.cookie('token', token, { // No usar httpOnly
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'Lax' // Opcional: aumenta la seguridad contra CSRF
        });
        res.cookie('user-data', JSON.stringify(profiles), {
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'Lax'
        });

        return res.redirect('/');
      }
    } catch (error) {
      return res.redirect(`/login/next-step?error=${encodeURIComponent(error.message)}`);
    }
  });

  app.post('/_auth/login/validate_rut', async (req, res) => {
    try {
      const { rut } = req.body;
      const user = await fetch(`${apiRecemed}/users/exists?rut=${rut}`).then(res => res.json());

      if (user?.errors) {
        return res.redirect(`/login?error=${encodeURIComponent(user.errors.detail)}`);
      }

      if (user?.data) {
        res.cookie('rut', rut, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true
        });

        return res.redirect('/login/next-step');
      } else {
        return res.status(400).json({ success: false, message: "Error en la validación." });
      }
    } catch (error) {
      return res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }
  });

  app.get('/_auth/logout', (_req, res) => {
    res.clearCookie('rut');
    res.clearCookie('token');
    res.clearCookie('user-data');
    res.redirect('/');
  });
}