/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useApolloClient } from '@apollo/client';
import Alert from '@common/Alert';
import Loader from '@core_modules/thanks/pages/default/components/Loader';
import Content from '@core_modules/thanks/pages/default/components/multiseller/view';
import * as Schema from '@core_modules/thanks/services/graphql/schema';
import { getCheckoutData, removeCheckoutData } from '@helper_cookies';
import Layout from '@layout';
import Router from 'next/router';
import propTypes from 'prop-types';
import * as React from 'react';
import TagManager from 'react-gtm-module';

const CoreMultiseller = (props) => {
    const {
        t, checkoutData, storeConfig, ...other
    } = props;

    const apolloClient = useApolloClient();

    const config = {
        title: t('thanks:title'),
        headerTitle: t('thanks:title'),
        bottomNav: false,
        pageType: 'purchase',
        tagSelector: 'swift-page-thanks',
    };

    const [customerOrder, setCustomerOrder] = React.useState([]);
    const [loader, setLoader] = React.useState(true);

    const getCustomerOrder = (order_number) =>
        new Promise((resolve, reject) => {
            try {
                apolloClient
                    .query({
                        query: Schema.getOrderSchema,
                        variables: { order_number },
                        context: {
                            request: 'internal',
                        },
                        errorPolicy: 'all',
                    })
                    .then(({ data }) => {
                        const orderDataInfo = {
                            order_number,
                            seller_id: data.ordersFilter.data[0].seller_id,
                            seller_name: data.ordersFilter.data[0].seller_name,
                            seller_city: data.ordersFilter.data[0].seller_city,
                            ...data,
                        };
                        resolve(orderDataInfo);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } catch (e) {
                reject(e);
            }
        });

    React.useEffect(() => {
        const parsedCheckoutData = checkoutData;
        const orderNumberCollection = parsedCheckoutData.order_number.split('|');

        if (orderNumberCollection && orderNumberCollection.length > 0 && typeof window !== 'undefined') {
            let count = 1;
            const getData = [];
            for (let key = 0; key < orderNumberCollection.length; key += 1) {
                const order = orderNumberCollection[key];
                getData.push(getCustomerOrder(order));
                count += 1;
            }
            Promise.all(getData).then((res) => {
                setCustomerOrder(res);
            });
            if (count === orderNumberCollection.length) {
                setTimeout(() => {
                    setLoader(false);
                }, 2000);
            }
        } else {
            setLoader(false);
        }
    }, [checkoutData]);

    React.useEffect(() => {
        if (customerOrder) {
            customerOrder.map((orders) => {
                // GTM UA dataLayer
                const dataLayer = {
                    pageType: 'purchase',
                    event: 'checkout',
                    ecommerce: {
                        purchase: {
                            actionField: {
                                id: orders.order_number,
                                affiliation: storeConfig.store_name || 'Swift PWA',
                                revenue: JSON.stringify(orders.ordersFilter.data[0].detail[0].grand_total),
                                coupon: orders.ordersFilter.data[0].detail[0].coupon.is_use_coupon
                                    ? orders.ordersFilter.data[0].detail[0].coupon.code
                                    : '',
                                tax: JSON.stringify(orders.ordersFilter.data[0].detail[0].tax_amount),
                                shipping: JSON.stringify(orders.ordersFilter.data[0].detail[0].payment.shipping_amount),
                            },
                            products: orders.ordersFilter.data[0].detail[0].items.map((product) => ({
                                name: product.name,
                                id: product.sku,
                                category: product.categories && product.categories.length > 0 ? product.categories[0].name : '',
                                price: JSON.stringify(product.price),
                                list: product.categories && product.categories.length > 0 ? product.categories[0].name : '',
                                quantity: JSON.stringify(product.qty_ordered),
                                dimension4: product.quantity_and_stock_status.is_in_stock ? 'In stock' : 'Out stock',
                                dimension5: JSON.stringify(product.rating.total),
                                dimension6: JSON.stringify(product.rating.value),
                                dimension7: orders.ordersFilter.data[0].detail[0].discount_amount !== 0 ? 'YES' : 'NO',
                            })),
                        },
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                    },
                };
                TagManager.dataLayer({
                    dataLayer,
                });
                // GA 4 dataLayer
                TagManager.dataLayer({
                    dataLayer: {
                        pageType: 'purchase',
                        pageName: t('thanks:title'),
                        event: 'purchase',
                        ecommerce: {
                            purchase: {
                                transaction_id: orders.order_number,
                                affiliation: storeConfig.store_name || 'Swift PWA',
                                value: JSON.stringify(orders.ordersFilter.data[0].detail[0].grand_total),
                                coupon: orders.ordersFilter.data[0].detail[0].coupon.is_use_coupon
                                    ? orders.ordersFilter.data[0].detail[0].coupon.code
                                    : '',
                                tax: JSON.stringify(orders.ordersFilter.data[0].detail[0].tax_amount),
                                shipping: JSON.stringify(orders.ordersFilter.data[0].detail[0].payment.shipping_amount),
                                currency: storeConfig.base_currency_code || 'IDR',
                                total_lifetime_value: JSON.stringify(orders.ordersFilter.data[0].detail[0].grand_total),
                                seller: orders.seller_name,
                                items: orders.ordersFilter.data[0].detail[0].items.map((product) => ({
                                    currency: storeConfig.base_currency_code || 'IDR',
                                    item_name: product.name,
                                    item_id: product.sku,
                                    price: JSON.stringify(product.price),
                                    item_category: product.categories && product.categories.length > 0 ? product.categories[0].name : '',
                                    item_list_name: product.categories && product.categories.length > 0 ? product.categories[0].name : '',
                                    quantity: JSON.stringify(product.qty_ordered),
                                    item_stock_status: product.quantity_and_stock_status.is_in_stock ? 'In stock' : 'Out stock',
                                    item_reviews_score: product.rating.value ? parseInt(product.rating.value, 10) / 20 : '',
                                    item_reviews_count: product.rating.total ? product.rating.total : '',
                                })),
                            },
                        },
                    },
                });
            });
        }
    }, [customerOrder]);

    if (!loader && (!customerOrder || customerOrder.length === 0)) {
        return (
            <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig}>
                <Alert variant="warning">{t('common:error:notFound')}</Alert>
            </Layout>
        );
    }

    const deleteCheckoutData = () => {
        const cdt = getCheckoutData();
        if (cdt) removeCheckoutData();
    };

    const handleContinue = () => {
        deleteCheckoutData();
        Router.push('/');
    };

    if (customerOrder && customerOrder.length > 0) {
        return (
            <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig} showRecentlyBar={false}>
                <Content
                    {...other}
                    t={t}
                    checkoutData={checkoutData}
                    storeConfig={storeConfig}
                    customerOrder={customerOrder}
                    handleContinue={handleContinue}
                />
            </Layout>
        );
    }

    return (
        <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig}>
            <Loader />
        </Layout>
    );
};

CoreMultiseller.propTypes = {
    storeConfig: propTypes.object.isRequired,
    checkoutData: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
};

export default CoreMultiseller;
