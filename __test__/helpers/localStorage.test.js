import { testLocalStorage } from '@helpers/localstorage';

describe('Local Storage Helper', () => {
    it('Should test the functionality of Local Storage', () => {
        expect(testLocalStorage()).toBe(true);
    });
    // can't test the functionality of setLocalStorage because the localStorage is not available in test environment and typeof window is undefined
});
