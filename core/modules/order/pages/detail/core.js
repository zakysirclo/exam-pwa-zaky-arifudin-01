/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import {
    getOrderDetail, getPaymentInformation, getTrackingOrder, reOrder as mutationReorder,
} from '@core_modules/order/services/graphql';
import { setCartId } from '@helper_cartid';
import { getHost } from '@helpers/config';
import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { currencyVar } from '@core/services/graphql/cache';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Alert from '@common/Alert';

const OrderDetail = (props) => {
    const {
        t, Content, Skeleton, ...other
    } = props;

    // cache currency
    const currencyCache = currencyVar();

    const { storeConfig } = other;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    let pageConfig = {
        title: `${t('order:order')}  `,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
        tagSelector: 'swift-page-orderdetail',
    };
    const [params] = React.useState({
        order_id: id,
    });
    const { loading, data, error } = getOrderDetail(params);
    const { loading: loadingPaymentInfo, data: paymentInfo, error: errorPaymentInfo } = getPaymentInformation(params);
    const [actionReorder] = mutationReorder();
    const { loading: loadingTrackingOrder, data: dataTrackingOrder, error: errorTrackingOrder } = getTrackingOrder({ order_id: params.order_id });

    if (error || errorPaymentInfo || errorTrackingOrder) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Alert className="m-15" severity="error">
                        {t('common:error:fetchError')}
                    </Alert>
                </CustomerLayout>
            </Layout>
        );
    }
    if (loading || !data || loadingPaymentInfo || !paymentInfo || loadingTrackingOrder || !dataTrackingOrder) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }
    if (!loading && data && data.customer && data.customer.orders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customer.orders.items;
    }
    const currency = detail.length > 0 ? detail[0].detail[0].global_currency_code : storeConfig.base_currency_code;

    pageConfig = {
        title: `${t('order:order')} # ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };

    const reOrder = () => {
        if (id && id !== '') {
            window.backdropLoader(true);
            actionReorder({
                variables: {
                    order_id: id,
                },
            })
                .then(async (res) => {
                    if (res.data && res.data.reorder && res.data.reorder.cart_id) {
                        await setCartId(res.data.reorder.cart_id);
                        setTimeout(() => {
                            router.push('/checkout/cart');
                        }, 1000);
                    }
                    window.backdropLoader(false);
                })
                .catch(() => {
                    window.backdropLoader(false);
                });
        }
    };

    const returnUrl = (order_number) => {
        if (storeConfig && storeConfig.OmsRma.enable_oms_rma) {
            const omsRmaLink = storeConfig.OmsRma.oms_rma_link;
            const omsChannelCode = storeConfig.oms_channel_code;
            const backUrl = window.location.href;
            // eslint-disable-next-line max-len
            const encodedQuerystring = `email=${encodeURIComponent(detail[0].detail[0].customer_email)}&order_number=${encodeURIComponent(
                detail[0].order_number,
            )}&channel_code=${encodeURIComponent(omsChannelCode)}&from=${encodeURIComponent(backUrl)}`;
            const omsUrl = `${omsRmaLink}?${encodedQuerystring}`;
            window.location.replace(omsUrl);
        } else {
            window.location.replace(`${getHost()}/rma/customer/new/order_id/${order_number}`);
        }
    };

    const printOrder = (order_number) => {
        window.open(`${getHost()}/sales/order/print/order_id/${order_number}`);
    };

    // return (
    //     <Layout pageConfig={pageConfig} {...props}>
    //         <CustomerLayout {...props}>
    //             <Skeleton />
    //         </CustomerLayout>
    //     </Layout>
    // );

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                detail={detail}
                currency={currency}
                returnUrl={returnUrl}
                reOrder={reOrder}
                printOrder={printOrder}
                paymentInfo={paymentInfo.OrderPaymentInformation}
                dataTrackingOrder={dataTrackingOrder}
                currencyCache={currencyCache}
            />
        </Layout>
    );
};

OrderDetail.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

OrderDetail.defaultProps = {
    Content: () => {},
    Skeleton: () => {},
};

export default OrderDetail;
