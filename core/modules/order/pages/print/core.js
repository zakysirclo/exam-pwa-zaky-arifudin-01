import Layout from '@layout';
import { useRouter } from 'next/router';
import { getOrderDetail } from '@core_modules/order/services/graphql';
import { currencyVar } from '@core/services/graphql/cache';
import PropTypes from 'prop-types';

const OrderPrint = (props) => {
    const {
        t, Content, Skeleton, ...other
    } = props;
    const { storeConfig } = other;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    let pageConfig = {
        title: `${t('order:order')}  `,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };
    const [params] = React.useState({
        order_id: id,
    });
    const { loading, data } = getOrderDetail(params);
    if (!loading && data && data.customer.orders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customer.orders.items;
    }
    const currency = detail.length > 0 ? detail[0].detail[0].global_currency_code : storeConfig.base_currency_code;

    // cache currency
    const currencyCache = currencyVar();

    pageConfig = {
        title: `${t('order:order')} # ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };

    React.useEffect(() => {
        if (!loading && data && data.customer.orders) {
            // window.print();
            setTimeout(() => {
                window.print();
            }, 5000);
        }
    }, [loading, data]);

    if (!loading && data && data.customer.orders) {
        return (
            <>
                <Layout
                    pageConfig={pageConfig}
                    withLayoutHeader={false}
                    withLayoutFooter={false}
                    showRecentlyBar={false}
                >
                    <Content
                        {...props}
                        detail={detail}
                        currency={currency}
                        currencyCache={currencyCache}
                    />
                </Layout>
                <style global jsx>
                    {`
                        .main-app {
                            margin-top: 0;
                        }
                    `}
                </style>

            </>
        );
    } return null;
};

OrderPrint.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

OrderPrint.defaultProps = {
    Content: () => { },
    Skeleton: () => { },
};

export default OrderPrint;
