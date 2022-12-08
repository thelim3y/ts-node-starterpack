import winston from 'winston';
import config from '../config';

const transports = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(new winston.transports.Console());
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.cli(), winston.format.splat()),
        }),
        new winston.transports.File({ filename: 'debug.log', level: config.logs.level })
    );
}

const options: winston.LoggerOptions = {
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports,
};

const loggerInstance = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
    loggerInstance.debug('Logging initialized:');
}

export default loggerInstance;
