import getQueryFromPath from '@helpers/generateQuery';

const expected = {
    path: '/b/o/l/o/-/s/p/o/r/t/-/w/a/t/c/h',
    query: {
        'bolo-sport-watch.html': undefined,
    },
};

describe('Query Helper', () => {
    it('Should retrieve query based on request header', () => {
        expect(getQueryFromPath({
            query: {
                slug: 'bolo-sport-watch',
            },
            asPath: '?bolo-sport-watch.html',
        })).toMatchObject(expected);
    });
});
