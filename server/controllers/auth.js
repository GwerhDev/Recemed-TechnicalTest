export function auth(app) {
  app.post('/_auth/login', async (req, res) => {
    try {
      const { rut } = req.cookies;
      const { password } = req.body;
  
      const user = await fetch("http://rec-staging.recemed.cl/api/users/log_in", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { rut, password } })
      }).then(res => res.json());
  
      if (user?.errors) {
        res.redirect(`/login?error=${encodeURIComponent(user.errors.detail)}`);
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
  
        res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }
  });

  app.post('/_auth/login/validate_rut', async (req, res) => {
    const { rut } = req.body;
    const user = await fetch(`http://rec-staging.recemed.cl/api/users/exists?rut=${rut}`).then(res => res.json());
  
    if (user?.errors) {
      return res.status(400).json({ success: false, message: "Rut inválido. Intente nuevamente" });
    }
  
    if (user?.data) {
      res.cookie('rut', rut, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
      });

      res.redirect('/login/next-step');
    } else {
      res.status(400).json({ success: false, message: "Error en la validación." });
    }
  });
  
  app.post('/_auth/logout', (_req, res) => {
    res.clearCookie('rut');
    res.clearCookie('user-data');
    res.end();
  });
}