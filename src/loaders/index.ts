import express from 'express';
import expressLoader from './express';
import diLoader from './di';
import Logger from './logger';

export default async (app: express.Application) => {
    await diLoader();
    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader(app);
    Logger.info('✌️ Express loaded');
};
