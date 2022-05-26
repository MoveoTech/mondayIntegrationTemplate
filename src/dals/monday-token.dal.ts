import { MondayTokenDbModel, MondayTokenAttributes } from '../db/models/monday-access-token.model';
import { MondayToken } from '../entities/models/monday-token';

export class MondayTokensDAL {

    public async findMondayToken(dalData: MondayTokenAttributes) {
        const mondayToken = await MondayTokenDbModel.findOne({
            where: { mon_user_id: dalData.mon_user_id, mon_account_id: dalData.mon_account_id }
        });
        return this.mapToMondayToken(mondayToken);
    }

    public async createMondayToken(dalData: MondayTokenAttributes) {
        const mondayToken = await MondayTokenDbModel.create(dalData);
        return this.mapToMondayToken(mondayToken);
    }

    private mapToMondayToken(item: MondayTokenDbModel): MondayToken {
        return item ? new MondayToken(item) : null;
    }

}