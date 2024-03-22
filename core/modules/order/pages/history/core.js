import { getOrder, reOrder as mutationReorder } from '@core_modules/order/services/graphql';
import { setCartId } from '@helper_cartid';
import { getHost } from '@helpers/config';
import Layout from '@layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const HistoryOrder = (props) => {
    const {
        t, Content, size, storeConfig,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
        tagSelector: 'swift-page-orderhistory',
    };
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(size || 10);

    const [actionReorder] = mutationReorder();

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangePageSize = (value) => {
        setPageSize(parseInt(value, 10));
        setPage(1);
    };

    const { loading, data, error } = getOrder({
        pageSize,
        currentPage: page,
    });

    const reOrder = (order_id) => {
        if (order_id && order_id !== '') {
            window.backdropLoader(true);
            actionReorder({
                variables: {
                    order_id,
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

    let detail = [];
    let customerEmail;
    if (!loading && data && data.customer && data.customer.orders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customer.orders.items;
    }

    if (detail.length > 0) {
        // eslint-disable-next-line array-callback-return
        detail.map((item) => {
            if (item.detail.length > 0) {
                customerEmail = item.detail[0].customer_email;
            }
        });
    }

    const returnUrl = (order_number) => {
        if (storeConfig && storeConfig.OmsRma.enable_oms_rma) {
            const omsRmaLink = storeConfig.OmsRma.oms_rma_link;
            const omsChannelCode = storeConfig.oms_channel_code;
            const backUrl = window.location.href;
            // eslint-disable-next-line max-len
            const encodedQuerystring = `email=${encodeURIComponent(customerEmail)}&order_number=${encodeURIComponent(
                order_number,
            )}&channel_code=${encodeURIComponent(omsChannelCode)}&from=${encodeURIComponent(backUrl)}`;
            const omsUrl = `${omsRmaLink}?${encodedQuerystring}`;
            window.location.replace(omsUrl);
        } else {
            window.location.replace(`${getHost()}/rma/customer/new/order_id/${order_number}`);
        }
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                data={data?.customer?.orders}
                page={page}
                pageSize={pageSize}
                loading={loading}
                error={error}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
                reOrder={reOrder}
                returnUrl={returnUrl}
            />
        </Layout>
    );
};

HistoryOrder.propTypes = {
    Content: PropTypes.func,
};

HistoryOrder.defaultProps = {
    Content: () => null,
};

export default HistoryOrder;
