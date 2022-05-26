import { MondayTokenDbModel } from '../../db/models/monday-access-token.model';

export class MondayToken {
    rowId: number;
    monUserId: number;
    monAccountId: number;
    monAccessToken: string;
    createdAt: Date;
    modifiedAt: Date;

    constructor(item: MondayTokenDbModel) {
        this.rowId = item.row_id;
        this.monUserId = item.mon_user_id;
        this.monAccountId = item.mon_account_id;
        this.monAccessToken = item.mon_access_token;
        this.createdAt = item.created_at;
        this.modifiedAt = item.modified_at;
    }
}