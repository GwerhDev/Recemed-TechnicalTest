import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { root } from './root.js';
import { renderPage } from 'vike/server';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

startServer();

async function startServer() {
  const app = express();

  app.use(compression());
  app.use(cookieParser());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  auth(app);
  
  if (isProduction) {
    const sirv = (await import('sirv')).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware);
  }

  app.get('*', async (req, res, next) => {
    const logged = !!req.cookies['token']; 
  
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
      user: {
        logged,
      },
    };
  
    const pageContext = await renderPage(pageContextInit);
  
    if (pageContext.errorWhileRendering) {
      //error management
    }
  
    const { httpResponse } = pageContext;
  
    if (!httpResponse) {
      return next();
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      res.send(body);
    }
  });
  
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

function auth(app) {
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
