import { Container } from 'typedi';
import LoggerInstance from './logger';
import config from '../config';

const diLoader = () => {
    try {
        Container.set('logger', LoggerInstance);
        LoggerInstance.info('✌️ Logger injected into container');
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};

export default diLoader;
