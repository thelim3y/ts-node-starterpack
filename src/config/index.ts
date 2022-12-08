import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: process.env.APP_PORT || 'this-should-be-in-.env',
    jwtSecret: process.env.JWT_SECRET || 'this-should-be-in-.env',
    logs: {
        level: process.env.LOG_LEVEL || 'error',
    },
    api: {
        prefix: '/',
    },
};
