import { getCartId, setCartId, removeCartId } from '@helpers/cartId';

describe('CartID Helper', () => {
    it('Should set a cart id cookies', () => {
        expect(setCartId('Sample Cart ID')).toBe(true);
    });
    it('Should retrieve cart id cookies', () => {
        expect(getCartId()).toBe('Sample Cart ID');
    });
    it('Should remove cart id cookies', () => {
        expect(removeCartId()).toBe(true);
    });
    it('Should not return a cart id cookies', () => {
        expect(getCartId()).toBe(undefined);
    });
});
