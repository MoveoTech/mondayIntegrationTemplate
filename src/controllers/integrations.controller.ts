import { IntegrationsHandler } from "../handler/integrations.handler";

export class IntegrationsController{

    public static async example(req, res, next) {
        try {
            const { accountId, userId } = req.session;
            const { boardId } = req.body.payload.inboundFieldValues;
            const handler = new IntegrationsHandler();
            const example = await handler.example(accountId, userId, boardId);
            res.send(example);
        } catch (err) {
                console.log('[integration.controller:example]', err);
        }
        next();
    }
}