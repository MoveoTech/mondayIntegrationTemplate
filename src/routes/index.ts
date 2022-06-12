import express from 'express';
import authRoutes from './auth/authentication.routes';
import integrationsRoutes from './integrations.routes';

const router = express.Router();
router.use('/api/', authRoutes);
router.use('/api/integrations', integrationsRoutes);

export default router;