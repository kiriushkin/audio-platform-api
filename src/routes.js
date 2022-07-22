import express from 'express';
import authRoutes from './auth/auth.routes.js';
import audioRoutes from './audio/audio.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/audio', audioRoutes);

export default router;
