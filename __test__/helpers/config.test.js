import { getHost, getStoreHost } from '@helpers/config';

describe('Config Helper', () => {
    it('Should retrieve host name', () => {
        expect(getHost()).toBe('https://pwa.getswift.asia');
    });
    it('Should return a store host name', () => {
        expect(getStoreHost()).toBe('https://b2cdemo.getswift.asia/');
    });
});
