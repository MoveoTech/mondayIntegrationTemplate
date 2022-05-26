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

    public async authMiddleware(req, res, next) {
        try {
            const authorization = req.headers.authorization || (req.query ? req.query.token : null);
            if (authorization != undefined) {
                if (typeof authorization !== "string") return res.status(401);
                if (typeof process.env.MONDAY_SIGNING_SECRET !== "string") return res.status(500);
                // Verify token:
                req.session = this.authJwt(authorization);
            } else {
                req.session = {};
            }
            next();
        } catch (err) {
            res.status(401).json({ error: "authentication error, could not verify credentials" });
        }
    }

    private authJwt(auth: string) {
        const userInformation = jwt.verify(
            auth,
            process.env.MONDAY_SIGNING_SECRET
        ) as any;

        const { accountId, userId, backToUrl, shortLivedToken } = userInformation;
        return { accountId, userId, backToUrl, shortLivedToken };
    }
}