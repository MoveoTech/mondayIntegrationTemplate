import { AuthenticationService } from '../services/authentication-service';
import { MondayService } from '../services/monday-service';

export class AuthenticationHandler {

    public async getMondayAccessToken(state: string) {
        const authService = new AuthenticationService();
        const mondayService = new MondayService();
        const { userId, accountId, backToUrl } = await authService.getMondayAuth(state);
        const token = await mondayService.getMondayToken(userId, accountId);
        return { token, backToUrl };
    }

    public async replaceMondayAuthCodeToAccessToken(code: string, state: string) {
        const authService = new AuthenticationService();
        const mondayService = new MondayService();
        const { accessToken, userId, accountId, backToUrl } = await authService.mondayAuthCodeToAccessToken(code, state);
        await mondayService.saveMondayToken(userId, accountId, accessToken.access_token);
        return { backToUrl };
    }
}