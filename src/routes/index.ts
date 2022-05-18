import express from 'express';
import authRoutes from './auth/authentication.routes';

const router = express.Router();
router.use('/api/', authRoutes);

export default router;