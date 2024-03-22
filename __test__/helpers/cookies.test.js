import {
    getCheckoutData,
    setCheckoutData,
    removeCheckoutData,
    setCookies,
    getCookies,
    removeCookies,
    getCookiesFromRequest,
} from '@helpers/cookies';

const sampleCheckoutData = {
    email: 'fakhri.rizha@sirclo.com',
    order_number: 'SWI0000030091631417421',
    order_id: 'SWI0000030091631417421',
};

const sampleGlobalCookie = {
    uid_product_compare: 'HjaYd7pWOJV2H5tKmaZugCWb3o3MXheu',
};

const sampleContext = {
    req: {
        cookies: {
            spwa: {
                uid_product_compare: 'HjaYd7pWOJV2H5tKmaZugCWb3o3MXheu',
            },
        },
    },
};

describe('Cookie Helper', () => {
    it('Should set a checkout data cookies', () => {
        expect(setCheckoutData(sampleCheckoutData)).toBe(true);
    });
    it('Should retrieve checkout data cookies', () => {
        expect(getCheckoutData()).toMatchObject(sampleCheckoutData);
    });
    it('Should remove checkout data cookies', () => {
        expect(removeCheckoutData()).toBe(true);
    });
    it('Should NOT retrieve checkout data cookies', () => {
        expect(getCheckoutData()).toBeUndefined();
    });
    it('Should set cookies with spesific key', () => {
        expect(setCookies('uid_product_compare', sampleGlobalCookie.uid_product_compare)).toBe(true);
    });
    it('Should retrieve cookies with spesific key', () => {
        expect(getCookies('uid_product_compare')).toBe(sampleGlobalCookie.uid_product_compare);
    });
    it('Should retrieve cookies with spesific key', () => {
        expect(removeCookies('uid_product_compare')).toBe(true);
    });
    it('Should NOT retrieve cookies with spesific key', () => {
        expect(getCookies('uid_product_compare')).toBe('');
    });
    it('Should retrieve cookies with spesific key from request header', () => {
        expect(getCookiesFromRequest(sampleContext, 'uid_product_compare')).toBe(sampleGlobalCookie.uid_product_compare);
    });
});
