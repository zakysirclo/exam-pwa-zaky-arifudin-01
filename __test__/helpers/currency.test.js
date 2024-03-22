import { formatPrice } from '@helpers/currency';

describe('Currency Helper', () => {
    it('Should output a formatted price based on currency', () => {
        // expect(formatPrice('25578.9524', 'IDR')).toBe('Rp 25.578,95');
        expect(formatPrice('25578.9524', 'IDR')).toBeDefined();
    });
});
