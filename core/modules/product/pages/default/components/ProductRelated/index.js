/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from 'react';
import propTypes from 'prop-types';
import dynamic from 'next/dynamic';
import TagManager from 'react-gtm-module';
import { getPriceRelatedProduct, getRelatedProduct } from '@core_modules/product/services/graphql';
import { priceVar } from '@root/core/services/graphql/cache';

const View = dynamic(() => import('@core_modules/product/pages/default/components/ProductRelated/view'), { ssr: false });
const Loader = dynamic(() => import('@common_slick/Caraousel/Skeleton'));

const ProductRelated = ({
    dataProduct, isLogin, storeConfig, ...other
}) => {
    // cache price
    const cachePrice = priceVar();
    const [getProductPrice, { data: dataPrice }] = getPriceRelatedProduct();
    const { loading, data, error } = getRelatedProduct(storeConfig, { variables: { url: dataProduct.url_key } });

    React.useEffect(() => {
        getProductPrice({
            variables: { url: dataProduct.url_key },
        });
    }, []);

    React.useEffect(() => {
        if (
            !loading
            && !error
            && data
            && data.products
            && data.products.items.length > 0
            && data.products.items[0].related_products
            && data.products.items[0].related_products.length > 0
        ) {
            let index = 0;
            let categoryProduct = '';
            // eslint-disable-next-line no-unused-expressions
            dataProduct.categories.length > 0
                && dataProduct.categories.map(({ name }, indx) => {
                    if (indx > 0) categoryProduct += `/${name}`;
                    else categoryProduct += name;
                });
            const tagManagerArgs = {
                dataLayer: {
                    pageName: dataProduct.name,
                    pageType: 'product',
                    ecommerce: {
                        impressions: [
                            ...data.products.items[0].related_products.map((val) => {
                                index += 1;
                                return {
                                    name: val.name,
                                    id: val.sku,
                                    category: categoryProduct,
                                    price: val.price_range.minimum_price.regular_price.value,
                                    list: `Related Products From ${dataProduct.name}`,
                                    position: index,
                                };
                            }),
                        ],
                    },
                    event: 'impression',
                    eventCategory: 'Ecommerce',
                    eventAction: 'Impression',
                    eventLabel: dataProduct.name,
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        }
    }, [data]);

    React.useEffect(() => {
        if (dataPrice && dataPrice?.products.items?.length && dataPrice?.products.items[0].related_products?.length) {
            const identifier = `related-${dataProduct.url_key}`;
            const dataTemp = cachePrice;
            dataTemp[identifier] = {
                products: {
                    items: dataPrice?.products.items[0].related_products,
                },
            };
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    if (loading) {
        return (
            <div className="desktop:px-[0px] tablet:px-[16px]">
                <Loader />
            </div>
        );
    }

    if (
        !loading
        && !error
        && data
        && data.products
        && data.products.items.length > 0
        && data.products.items[0].related_products
        && data.products.items[0].related_products.length > 0
    ) {
        return <View {...other} storeConfig={storeConfig} data={data.products.items[0].related_products} />;
    }

    return null;
};

ProductRelated.propTypes = {
    t: propTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    dataProduct: propTypes.object.isRequired,
};

export default ProductRelated;
