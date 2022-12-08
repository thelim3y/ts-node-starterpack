import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Hello API Request', () => {
    it('should return response on call', () => {
        return chai
            .request(app)
            .post('/interval')
            .then((res: any) => {
                chai.expect(res.text).to.eql("how's it going?");
            });
    });
});
