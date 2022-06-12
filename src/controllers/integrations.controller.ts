import { IntegrationsHandler } from "../handler/integrations.handler";

export class IntegrationsController {
    private handler: IntegrationsHandler;

    constructor() {
        this.handler = new IntegrationsHandler();
    }

    public static async example(req, res, next) {
        try {
            const integrationsController = new IntegrationsController();
            const { accountId, userId } = req.session;
            if (!accountId || !userId || !req.body.payload.inboundFieldValues) {
                throw Error('[integrations.controller:example] - One of the constants does not exist');
            }
            const { boardId } = req.body.payload.inboundFieldValues;
            const example = await integrationsController.handler.example(accountId, userId, boardId);
            res.send(example);
        } catch (err) {
            console.log('[integration.controller:example]', err);
        }
        next();
    }
}