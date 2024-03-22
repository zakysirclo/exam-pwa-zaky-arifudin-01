import { getAppEnv } from '@helpers/env';

describe('ENV Helper', () => {
    it('Should not retrieve appEnv because no application was running', () => {
        expect(getAppEnv()).not.toBeDefined();
    });
});
