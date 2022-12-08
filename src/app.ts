import 'reflect-metadata';

import config from './config';
import express from 'express';
import Logger from './loaders/logger';

const app: express.Application = express();

async function startServer() {
    await require('./loaders').default(app);

    app.listen(config.port, () => {
        Logger.info(`
            ################################################
            🛡️  Server listening on port: ${config.port} 🛡️ 
            ################################################
        `);
    });
}

startServer();

export default app;
