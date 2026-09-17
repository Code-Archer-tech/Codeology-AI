import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/routes';
import { seedDatabaseIfEmpty } from './src/db/seed.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security & body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Enterprise Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Strict no-cache headers for sensitive authentication endpoints
    if (req.path.startsWith('/api/auth')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }

    next();
  });

  // CSRF Defense middleware for state-changing API operations
  app.use('/api', (req, res, next) => {
    const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
    if (safeMethods.includes(req.method)) {
      return next();
    }

    // Exempt public webhook or discovery lead submission if needed
    if (req.path === '/leads' && req.method === 'POST') {
      return next();
    }

    // Verify custom header or origin to prevent CSRF cross-origin form post
    const requestedWith = req.headers['x-requested-with'];
    const customCsrfHeader = req.headers['x-csrf-token'];
    const secFetchSite = req.headers['sec-fetch-site'];
    const origin = req.headers['origin'];
    const host = req.headers['host'];

    // If request has standard custom headers, it cannot be triggered by simple HTML form submission
    if (requestedWith || customCsrfHeader) {
      return next();
    }

    // If sec-fetch-site indicates same-origin, allow
    if (secFetchSite === 'same-origin' || secFetchSite === 'none' || secFetchSite === 'same-site') {
      return next();
    }

    // If origin matches host, allow
    if (origin && host && origin.includes(host)) {
      return next();
    }

    // Otherwise, allow standard fetch requests with content-type application/json
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('application/json') || contentType.includes('multipart/form-data')) {
      return next();
    }

    return res.status(403).json({
      error: 'Cross-Site Request Forgery validation failed: Missing required verification header',
      code: 'CSRF_BLOCKED',
    });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'operational',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'Codeology AI Enterprise Gateway',
    });
  });

  // REST API routes
  app.use('/api', apiRouter);

  // Initialize and seed database if empty
  seedDatabaseIfEmpty().catch((err) => {
    console.error('Initial database seed check notice:', err);
  });

  // Vite middleware in dev mode / static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Codeology AI Enterprise server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup failure:', err);
  process.exit(1);
});
