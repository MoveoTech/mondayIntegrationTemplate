import mondaySdk from 'monday-sdk-js';
import jwt from "jsonwebtoken";
import { MondayTokensDAL } from '../dals/monday-token.dal';
import { MondayTokenAttributes } from '../db/models/monday-access-token.model';

export class MondayService {

    public async codeToToken(code: string, clientId: string, clientSecret: string) {
        const mondayClient = mondaySdk();
        const token = await mondayClient.oauthToken(code, clientId, clientSecret);
        return token ?? null;
    }

    public async getMondayToken(userId: number, accountId: number) {
        const dal = new MondayTokensDAL();
        return await dal.findMondayToken({
            mon_user_id: userId,
            mon_account_id: accountId,
        } as MondayTokenAttributes);
    }

    public async saveMondayToken(userId: number, accountId: number, accessToken: string) {
        // Store monday access token: 
        const dal = new MondayTokensDAL();
        return await dal.createMondayToken({
            mon_user_id: userId,
            mon_account_id: accountId,
            mon_access_token: accessToken,
        } as MondayTokenAttributes);
    }
    
}