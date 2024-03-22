/* eslint-disable consistent-return */
/**
 * check breakpoints up
 * @param string breakpoinst xs, sm, md , lg, xl  */
const breakPointsUp = () => {
    const result = null;

    return result;
};

describe('Theme Helper', () => {
    it('Generate breakpoints', () => {
        expect(breakPointsUp('sm')).toBe('@media (min-width: 768px)');
    });
});
