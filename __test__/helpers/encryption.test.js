import { encrypt, decrypt } from '@helpers/encryption';

describe('Encryption Helper', () => {
    it('Encrypt a string/text', () => {
        expect(encrypt('ICUBE By SIRCLO').length).toBe(24);
    });
    it('Encrypt a string/text', () => {
        expect(encrypt('ICUBE By SIRCLO')).toBe('+ztfIZhUM12fpYGsLxBiCA==');
    });
    it('Decrypt a string/text', () => {
        expect(decrypt('+ztfIZhUM12fpYGsLxBiCA==')).toBe('ICUBE By SIRCLO');
    });
});
