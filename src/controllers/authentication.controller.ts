import { AuthenticationHandler } from '../handler/auth.handler';
import querystring from "querystring"

export class AuthController {

    public static async initAuthFlow(req, res) {
        try {
            const handler = new AuthenticationHandler();
            const token = req.query.token.toString();
            const accessToken = await handler.getMondayAccessToken(token);

            if (accessToken?.token?.monAccessToken) {
                const { backToUrl } = accessToken;
                return res.redirect(backToUrl);
            } else {
                const authUrl = process.env.MONDAY_AUTHORIZATION_URL;
                const clientId: string = process.env.MONDAY_CLIENT_ID || '';
                if (!authUrl || !clientId) {
                    throw Error('[authentication.controller:initAuthFlow] - One of the constants does not exist')
                }
                const queryParams = querystring.stringify({
                    client_id: clientId,
                    state: JSON.stringify({ token })
                });
                return res.redirect(`${authUrl}?${queryParams}`);
            }
        } catch (err) {
            console.log('[authentication.controller:initAuthFlow]', err);
        }
    }

    public static async mondayAuthCodeToAccessToken(req, res) {
        try {
            const handler = new AuthenticationHandler();
            const { state, code } = req.query;
            const { token } = JSON.parse(state);
            const { backToUrl } = await handler.replaceMondayAuthCodeToAccessToken(code, token);
            return res.redirect(backToUrl);
        } catch (err) {
            console.log('[authentication.controller:mondayAuthCodeToAccessToken]', err);
            return res.status(400);
        }
    }
}