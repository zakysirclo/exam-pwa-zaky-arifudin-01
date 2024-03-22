/* eslint-disable no-plusplus */
/**
 * function to generate config product
 * @param Object query
 * @param Object configuration
 * @returns object
 */
// eslint-disable-next-line no-unused-vars
const generateConfig = (query, config, elastic, availableFilter = []) => {
    // availableFilter aggregation from getProductAggregations not appropriate
    const availFilter = [];
    availableFilter.map((item) => availFilter.push(item.attribute_code));

    const resolveConfig = config;
    // eslint-disable-next-line no-restricted-syntax
    for (const q in query) {
        if (q.includes('seller') && !q.includes('filter') && q !== 'seller_id' && q !== 'seller_name') {
            const trueQuery = q.split('?');
            if (trueQuery && trueQuery[1]) {
                resolveConfig.filter.push({
                    type: trueQuery[1],
                    value: query[q],
                });
            }
        } else if ((q === 'sort' || q.includes('sort')) && query[q] !== '') {
            resolveConfig.sort = JSON.parse(decodeURIComponent(query[q]));
        } else if (q === 'seller_id' || q === 'seller_name') {
            resolveConfig.filter.push({
                type: q,
                value: query[q],
            });
        } else if (q === 'q' && q.includes('q')) {
            let search = query[q];
            search = search.replace(/[^a-zA-Z0-9 ]/g, '');
            resolveConfig.search = search;
        } else if (q === 'priceRange') {
            const price = query[q].split(',');
            // eslint-disable-next-line radix
            if (parseInt(price[1]) !== 0) {
                resolveConfig.filter.push({
                    type: 'price',
                    from: price[0],
                    to: price[1],
                });
            }
        } else if (q !== 'cat' && query[q]) {
            // check if filter is available or not
            const checkAvailFilter = availFilter.find((val) => val === q);
            if (checkAvailFilter) {
                resolveConfig.filter.push({
                    type: q,
                    value: elastic ? query[q].split(',') : query[q],
                });
            }
        }
    }
    return resolveConfig;
};

export default generateConfig;
