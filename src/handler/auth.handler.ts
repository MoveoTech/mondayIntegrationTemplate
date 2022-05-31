import { AuthenticationService } from '../services/authentication-service';
import { MondayService } from '../services/monday-service';
import { IMondayAccessToken } from '../interfaces/interfaces'

export class AuthenticationHandler {
    authService: AuthenticationService;
    mondayService: MondayService;

    constructor() {
        this.authService = new AuthenticationService();
        this.mondayService = new MondayService();
    }

    public async getMondayAccessToken(state: string): Promise<IMondayAccessToken> {
        const authenticationHandler = new AuthenticationHandler();
        const { userId, accountId, backToUrl } = await authenticationHandler.authService.getMondayAuth(state);
        const token = await authenticationHandler.mondayService.getMondayToken(userId, accountId);
        return { token, backToUrl };
    }

    public async replaceMondayAuthCodeToAccessToken(code: string, state: string): Promise<string> {
        const authenticationHandler = new AuthenticationHandler();
        const { accessToken, userId, accountId, backToUrl } = await authenticationHandler.authService.mondayAuthCodeToAccessToken(code, state);
        await authenticationHandler.mondayService.saveMondayToken(userId, accountId, accessToken.access_token);
        return backToUrl;
    }
}