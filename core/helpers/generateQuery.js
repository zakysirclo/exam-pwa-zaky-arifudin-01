/**
 * function to get query from path
 * @param Object router
 * @returns object
 */
const getQueryFromPath = (router) => {
    let { asPath } = router;
    const oldAsPath = asPath;
    let path = '';
    if (router.query && router.query.slug) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < router.query.slug.length; index++) {
            path += `/${router.query.slug[index]}`;
        }
    } else {
        path = router.pathname;
    }
    asPath = decodeURIComponent(asPath);
    asPath = asPath.replace(path, '').substr(1);
    asPath = asPath.split('&');
    const query = {};
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < asPath.length; index++) {
        let tempQuery = asPath[index];
        if (tempQuery !== '') {
            tempQuery = tempQuery.split('=');
            if (tempQuery[0].includes('?') && tempQuery[0].includes('seller')
            && !tempQuery[0].includes('filter') && tempQuery[1]) {
                const newQuery = tempQuery[0].split('?');
                // eslint-disable-next-line prefer-destructuring
                tempQuery[0] = newQuery[1];
            }
            // eslint-disable-next-line prefer-destructuring
            query[tempQuery[0]] = tempQuery[1];
        }
    }
    if (oldAsPath.split('?')[0].includes('/seller/')) {
        return {
            path: oldAsPath.split('?')[0],
            query,
        };
    }
    return {
        path,
        query,
    };
};

export default getQueryFromPath;
