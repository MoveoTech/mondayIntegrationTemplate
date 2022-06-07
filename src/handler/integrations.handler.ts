import { MondayService } from "../services/monday-service";

export class IntegrationsHandler {

    public async example(accountId: number, userId: number, boardId: number) {
        const mondayService = new MondayService();
        const { monAccessToken } = await mondayService.getMondayToken(userId, accountId);
        await mondayService.createNewItem(monAccessToken, boardId)
    }
}