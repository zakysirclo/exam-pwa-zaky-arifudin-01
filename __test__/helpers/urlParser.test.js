import urlParser from '@helpers/urlParser';

describe('URL Parser', () => {
    it('Should return an object containing parsed URL', () => {
        const expected = {
            domain: 'docs.google.com',
            path: '/spreadsheets/d/1rM2zpeqdfimO-QhTUKQutO7qvfdamhYyDKAjg6_n9w8/edit#gid=0',
            pathArray: ['docs.google.com', 'spreadsheets', 'd', '1rM2zpeqdfimO-QhTUKQutO7qvfdamhYyDKAjg6_n9w8', 'edit#gid=0'],
            port: undefined,
            protocol: 'https',
            query: undefined,
        };
        expect(urlParser('<a href="https://docs.google.com/spreadsheets/d/1rM2zpeqdfimO-QhTUKQutO7qvfdamhYyDKAjg6_n9w8/edit#gid=0">'))
            .toMatchObject(expected);
    });
});
