import GetScore from '@helpers/passwordStrength';

describe('Password Helper', () => {
    it('is empty password', () => {
        expect(GetScore({ value: '', minValue: 8, numberOfRequiredClass: 3 }).status).toBe('No Password');
    });
    it('is a weak password', () => {
        expect(GetScore({ value: '123456789', minValue: 8, numberOfRequiredClass: 3 }).status).toBe('Weak');
    });
    it('is a medium password', () => {
        expect(GetScore({ value: 'Sandi123#', minValue: 8, numberOfRequiredClass: 3 }).status).toBe('Medium');
    });
    it('is a strong password', () => {
        expect(GetScore({ value: 'Partai123#', minValue: 8, numberOfRequiredClass: 3 }).status).toBe('Strong');
    });
    it('is a very strong password', () => {
        expect(GetScore({ value: 'ahsjd^bawsdad77867#', minValue: 8, numberOfRequiredClass: 3 }).status).toBe('Very Strong');
    });
});
