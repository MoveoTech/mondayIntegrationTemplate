import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';
import { initConnection } from './db';

const app = express();
const port = process.env.PORT ?? '3000';

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(routes);

(async (): Promise<void> => {
    try {
        const dbConfection = await initConnection();
        await dbConfection.sync();
        app.listen(port, () => console.log(`App listing on port - ${port}`))
    } catch (err) {
        console.log('[app.ts]', err);
        process.exit(1);
    }
})();
