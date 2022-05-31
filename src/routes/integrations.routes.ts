import { Router } from 'express';
import { AuthenticationService } from '../services/authentication-service';
import { IntegrationsController } from '../controllers/integrations.controller';

const router = Router();
const authService = new AuthenticationService();

router.post('/example', // Example flow
    authService.authMiddleware,
    IntegrationsController.example
)

export default router;
