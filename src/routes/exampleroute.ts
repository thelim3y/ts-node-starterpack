import express from 'express';
import { Container } from 'typedi';
import winston from 'winston';

import ExampleService from '../services/example.service';

export default (router: express.Router) => {
    const logger: winston.Logger = Container.get('logger');
    const svc: ExampleService = Container.get(ExampleService);

    router.use('/example', router);

    router.get('/', async (req: express.Request, res: express.Response) => {
        return res.json({ message: 'root' }).status(200);
    });

    router.get('/svc', async (req: express.Request, res: express.Response) => {
        const ret = await svc.exampleFunction();
        return res.json(ret).status(200);
    });
};
