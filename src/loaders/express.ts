import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';
import config from '../config';

export default (app: express.Application) => {
    /**
     * Health Check endpoints
     * @TODO Explain why they are here
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    var corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    // Load API routes
    app.use(config.api.prefix, routes());

    /// catch 404 and forward to error handler
    app.use(
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            const err: any = new Error('Not Found');
            err['status'] = 404;
            next(err);
        }
    );

    /// error handlers
    app.use(
        (
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            /**
             * Handle 401 thrown by express-jwt library
             */
            if (err.name === 'UnauthorizedError') {
                return res
                    .status(err.status)
                    .send({ message: err.message })
                    .end();
            }

            return next(err);
        }
    );

    app.use(
        (
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            res.status(err.status || 500);
            res.json({
                errors: {
                    message: err.message,
                },
            });
        }
    );
};
