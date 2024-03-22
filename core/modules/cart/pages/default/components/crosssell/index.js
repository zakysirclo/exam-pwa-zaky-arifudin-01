import React from 'react';
import { getCrossellCart, getPriceCrossellCart } from '@core_modules/cart/services/graphql';
import CarouselSkeleton from '@common_slick/Caraousel/Skeleton';
import TagManager from 'react-gtm-module';
import { priceVar } from '@core/services/graphql/cache';

const getCrossSellProduct = (items) => {
    let crosssell = [];
    for (let index = 0; index < items.length; index += 1) {
        const data = items[index].product.crosssell_products.map((product) => ({
            ...product,
            // categories: items[index].product.categories,
        }));
        crosssell = crosssell.concat(data);
    }
    return crosssell;
};

const CrossSell = (props) => {
    const {
        View,
        dataCart: { id },
        storeConfig = {},
        ...other
    } = props;
    const { t } = other;
    let crossell = [];
    const { data, loading, error } = getCrossellCart(id, storeConfig);

    const { data: dataPrice } = getPriceCrossellCart(id, storeConfig);
    // cache price
    const cachePrice = priceVar();

    React.useMemo(() => {
        if (data && data.cart && data.cart.items) {
            const crosssellData = getCrossSellProduct(data.cart.items);
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    impressions: crosssellData.map((product, index) =>
                        // const category = product.categories && product.categories.length > 0 && product.categories[0].name;
                        ({
                            name: product.name,
                            id: product.sku,
                            // category: category || '',
                            price: product.price_range.minimum_price.regular_price.value,
                            list: 'Crossel Products',
                            position: index + 1,
                        })),
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [data]);

    React.useEffect(() => {
        if (dataPrice && dataPrice?.cart?.items && dataPrice?.cart?.items.length) {
            let items = [];
            for (let index = 0; index < dataPrice?.cart?.items.length; index += 1) {
                const item = dataPrice?.cart?.items[index];
                if (item?.product?.crosssell_products && item?.product?.crosssell_products?.length) {
                    items = [...items, ...item?.product?.crosssell_products];
                }
            }
            const identifier = `crosssell_products-${id}`;
            const dataTemp = cachePrice;
            dataTemp[identifier] = {
                products: {
                    items,
                },
            };
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    if (loading) {
        return <CarouselSkeleton />;
    }

    if (!data || error) return <></>;
    if (data && data.cart && data.cart.items) {
        crossell = getCrossSellProduct(data.cart.items);
    }

    if (crossell.length === 0) return null;

    return <View data={crossell} {...other} />;
};

export default CrossSell;
