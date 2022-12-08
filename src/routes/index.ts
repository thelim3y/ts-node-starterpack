import express from 'express';
import exampleroute from './exampleroute';

export default () => {
    const router = express.Router();

    exampleroute(router);

    return router;
};
