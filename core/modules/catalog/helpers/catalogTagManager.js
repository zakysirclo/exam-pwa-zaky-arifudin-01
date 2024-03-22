/* eslint-disable array-callback-return */
export const getTagManager = (categoryPath, storeConfig, data) => ({
    dataLayer: {
        event: 'impression',
        eventCategory: 'Ecommerce',
        eventAction: 'Impression',
        eventLabel: categoryPath ? `category ${categoryPath}` : '',
        ecommerce: {
            currencyCode: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
            impressions: data.products.items.map((product, index) => {
                let categoryProduct = '';
                // eslint-disable-next-line no-unused-expressions
                product.categories.length > 0
                    && product.categories.map(({ name }, indx) => {
                        if (indx > 0) categoryProduct += `/${name}`;
                        else categoryProduct += name;
                    });
                return {
                    name: product.name,
                    id: product.sku,
                    category: categoryProduct,
                    price: product.price_range.minimum_price.regular_price.value,
                    list: categoryProduct,
                    position: index,
                };
            }),
        },
    },
});

export const getTagManagerGA4 = (categoryPath, data) => ({
    dataLayer: {
        event: 'view_item_list',
        pageName: categoryPath,
        pageType: 'category',
        ecommerce: {
            items: data.products.items.map((product, index) => {
                let categoryProduct = '';
                let categoryOne = '';
                let categoryTwo = '';
                // eslint-disable-next-line no-unused-expressions
                product.categories.length > 0
                    && ((categoryOne = product.categories[0].name),
                    (categoryTwo = product.categories[1]?.name),
                    product.categories.map(({ name }, indx) => {
                        if (indx > 0) categoryProduct += `/${name}`;
                        else categoryProduct += name;
                    }));
                return {
                    item_name: product.name,
                    item_id: product.sku,
                    price: product.price_range.minimum_price.regular_price.value,
                    item_category: categoryOne,
                    item_category_2: categoryTwo,
                    item_list_name: categoryProduct,
                    index,
                    currency: product.price_range.minimum_price.regular_price.currency,
                };
            }),
        },
    },
});
