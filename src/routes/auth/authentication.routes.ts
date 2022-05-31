import { Router } from 'express';
import { AuthController } from '../../controllers/authentication.controller';

const router = Router();

// Start auth flow:
router.get("/authorization", AuthController.initAuthFlow);

// Auth code to monday access token:
router.get("/authorization/callback", AuthController.mondayAuthCodeToAccessToken);

export default router;

