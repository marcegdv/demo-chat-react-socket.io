import express from 'express';
import { home } from '../controllers/home.js';
import { healtCheck } from '../controllers/health.js'

const router = express.Router();

router.get('/', home);
router.get('/health', healtCheck);

export default router;