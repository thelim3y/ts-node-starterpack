import { Service, Inject } from 'typedi';
import winston from 'winston';

@Service()
export default class ExampleService {
    constructor(@Inject('logger') private _logger: winston.Logger) {}

    public async exampleFunction(): Promise<any> {
        /// Do stuff/db, whatever...
        return null; // Return what you need to
    }
}
