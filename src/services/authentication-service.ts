import jwt from 'jsonwebtoken';
import { MondayService } from './monday-service'

export class AuthenticationService {

    public async getMondayAuth(state: string) {
        const mondaySigninSecret: string = process.env.MONDAY_SIGNING_SECRET || '';
        const { userId, accountId, backToUrl } = jwt.verify(state, mondaySigninSecret) as any;
        return { userId, accountId, backToUrl };
    }

    public async mondayAuthCodeToAccessToken(code: string, state: string) {
        const mondayService = new MondayService();
        const mondaySigninSecret: string = process.env.MONDAY_SIGNING_SECRET || '';
        const clientSecret: string = process.env.MONDAY_CLIENT_SECRET || '';
        const { userId, accountId, backToUrl } = jwt.verify(state, mondaySigninSecret) as any;

        // Get access token from auth code:
        const accessToken = await mondayService.codeToToken(code, process.env.MONDAY_CLIENT_ID, clientSecret);
        return { accessToken, userId, accountId, backToUrl };
    }
}