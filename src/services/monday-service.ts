import mondaySdk from 'monday-sdk-js';
import { MondayTokensDAL } from '../dals/monday-token.dal';
import { MondayTokenAttributes } from '../db/models/monday-access-token.model';
import { queries } from '../queries/queries';

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

    static async getGroupsByBoard(boardIds: number[]) {
        const monday = mondaySdk();
        const groupsResponse = await monday.api(queries.getGroupsByBoard, {
            variables: { boardIds: boardIds }
        });
        const groups = groupsResponse.data.boards[0].groups;
        return groups;
    }

    static async getItemsByGroupId(boardId: number[], groupId: string) {
        const monday = mondaySdk();
        const itemsResponse = await monday.api(queries.getItemsByGroupId, {
            variables: { boardIds: boardId, groupId: [groupId] }
        });
        const items = itemsResponse.data.boards[0].groups[0].items;
        return items;
    }

    static async execute(query: string, vars: any) {
        try {
            const monday = mondaySdk();
            const response = await monday.api(query, { variables: vars });
            return response;
        } catch (err) {
            const isComplexcityError = err?.data?.errors?.some((err: any) => err.message.startsWith('Complexity budget exhausted'));
            if (isComplexcityError) {
                const errorArray = err.data.errors[0].message.split(" ");
                const time = parseInt(errorArray[errorArray.length - 2]);
                await new Promise(r => setTimeout(r, time * 1000 || 60000));
                const response: any = await this.execute(query, vars);
                return response;
            }
        }
    }

    static async createNewBoard(boardName: string, templateBoardId: number, workspaceId: number) {
        const newBoardId = await this.execute(queries.createNewBoard, { boardName: boardName, templateBoardId: templateBoardId, workspaceId: workspaceId });
        return newBoardId;
    }

    static async createNewItemInGroup(boardId: number, groupId: string, itemName: string, columnValues: any) {
        const newItemResponse = await this.execute(queries.createNewItemInGroup, {
            boardId: boardId,
            groupId: groupId,
            itemName: itemName,
            columnValues: JSON.stringify(columnValues)
        });
        const newItemId = parseInt(newItemResponse?.data?.create_item?.id);
        return newItemId;
    }

    static async createNewColumn(boardId: number, columnTitle: string, columnType: string) {
        const newColumnResponse = await this.execute(queries.createNewColumn, { boardId: boardId, title: columnTitle, columnType: columnType });
        const newColumnId = newColumnResponse.data.create_column.id;
        return newColumnId;
    }

    static async deleteItemById(itemId: number) {
        const monday = mondaySdk();
        const deletedItemId = await monday.api(queries.deleteItemById, {
            variables: { itemId: itemId }
        });
        return deletedItemId;
    }
}