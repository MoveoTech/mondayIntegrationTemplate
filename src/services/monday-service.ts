import mondaySdk from 'monday-sdk-js';
import { MondayTokensDAL } from '../dals/monday-token.dal';
import { MondayTokenAttributes } from '../db/models/monday-access-token.model';
import { getGroupsByBoard, createItem, deleteItemById, getItemsByGroupId, createNewBoard, createNewItemInGroup, createNewColumn } from '../queries/queries'

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

    private async execute(token: string, query: string, vars: any) {
        const monday = mondaySdk({ token });
        const response = await monday.api(query, { variables: vars });
        const isComplexityError = response?.errors?.some((err: any) => (
            err.message.startsWith('Complexity budget exhausted')
        ));
        if (isComplexityError) {
            const errorArray = response.errors[0].message.split(' ');
            const time = parseInt(errorArray[errorArray.length - 2]);
            await new Promise(r => setTimeout(r, time * 1000 || 60000));
            await this.execute(token, query, vars);
        }
        return response;
    }

    public async getGroupsByBoard(token: string, boardIds: number[]) {
        const query = getGroupsByBoard();
        const groups = await this.execute(token, query, { boardIds });
        return groups;
    }

    public async getItemsByGroupId(token: string, boardIds: number[], groupId: string) {
        const query = getItemsByGroupId();
        const itemsRes = await this.execute(token, query, {
            boardIds,
            groupId: [groupId]
        });
        const items = itemsRes.data.boards[0].groups[0].items;
        return items;
    }

    public async createNewBoard(token: string, boardName: string, templateBoardId: number, workspaceId: number) {
        const mutation = createNewBoard();
        const newBoardId = await this.execute(token, mutation, {
            boardName,
            templateBoardId,
            workspaceId
        });
        return newBoardId;
    }

    public async createNewItemInGroup(token: string, boardId: number, groupId: string, itemName: string, columnValues: any) {
        const mutation = createNewItemInGroup();
        const newItemResponse = await this.execute(token, mutation, {
            boardId,
            groupId,
            itemName,
            columnValues: JSON.stringify(columnValues)
        });
        return newItemResponse;
    }

    public async createNewColumn(token: string, boardId: number, columnTitle: string, columnType: string) {
        const mutation = createNewColumn();
        const newColumnResponse = await this.execute(token, mutation, {
            boardId,
            title: columnTitle,
            columnType
        });
        return newColumnResponse;
    }

    public async createNewItem(token: string, boardId: number) {
        const mutation = createItem();
        const newItem = await this.execute(token, mutation, { boardId: boardId });
        return newItem;
    }

    public async deleteItemById(token: string, itemId: number) {
        const mutation = deleteItemById();
        const deletedItemId = await this.execute(token, mutation, { itemId: itemId });
        return deletedItemId;
    }
}