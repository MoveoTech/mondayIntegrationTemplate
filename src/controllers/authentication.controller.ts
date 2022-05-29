import { AuthenticationHandler } from '../handler/auth.handler';
import querystring from "querystring"

export class AuthController {
    private authUrl: string;
    private clientId: string;
    private handler: AuthenticationHandler;

    constructor() {
        this.authUrl = process.env.MONDAY_AUTHORIZATION_URL;
        this.clientId = process.env.MONDAY_CLIENT_ID || '';
        this.handler = new AuthenticationHandler();
    }

    public static async initAuthFlow(req, res): Promise<string> {
        try {
            const authController = new AuthController();

            if (!req.query.token) throw Error('[authentication.controller:initAuthFlow] - token does not exist');
            const token = req.query.token.toString();

            const accessToken = await authController.handler.getMondayAccessToken(token);
            if (accessToken?.token?.monAccessToken) {
                const { backToUrl } = accessToken;
                return res.redirect(backToUrl);
            } else {
                if (!authController.authUrl || !authController.clientId) {
                    throw Error('[authentication.controller:initAuthFlow] - One of the constants does not exist');
                }
                const queryParams = querystring.stringify({
                    client_id: authController.clientId,
                    state: JSON.stringify({ token })
                });
                return res.redirect(`${authController.authUrl}?${queryParams}`);
            }
        } catch (err) {
            console.log('[authentication.controller:initAuthFlow]', err);
        }
    }

    public static async mondayAuthCodeToAccessToken(req, res): Promise<string> {
        try {
            const handler = new AuthenticationHandler();
            const { state, code } = req.query;
            const { token } = JSON.parse(state);
            const backToUrl = await handler.replaceMondayAuthCodeToAccessToken(code, token);
            return res.redirect(backToUrl);
        } catch (err) {
            console.log('[authentication.controller:mondayAuthCodeToAccessToken]', err);
            return res.status(400);
        }
    }
}