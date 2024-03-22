import formatDate from '@helpers/date';

describe('Date Helper', () => {
    it('Should return a formatted date', () => {
        expect(formatDate(new Date('2022-01-01T00:00:00.000Z'), 'D MMMM YYYY, HH:mm:ss')).toBe('1 January 2022, 07:00:00');
    });
});
