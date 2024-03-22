import PropTypes from 'prop-types';
import Layout from '@layout';
import { getCustomer, getTrackingOrder } from '@core_modules/trackingorder/services/graphql';
import dynamic from 'next/dynamic';
import { getLoginInfo } from '@helper_auth';

const Skeleton = dynamic(() => import('@core_modules/trackingorder/pages/default/components/skeletonform'), { ssr: false });
const Content = dynamic(() => import('@core_modules/trackingorder/pages/default/components/form'), { ssr: false });

const Tracking = (props) => {
    let customer = {};
    const { t } = props;
    const config = {
        title: t('trackingorder:trackingOrder'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('trackingorder:trackingOrder'),
        bottomNav: false,
        tagSelector: 'swift-page-trackingorder',
    };

    const [orderField, setOrderField] = React.useState({
        email: '',
        order_id: '',
    });
    const [getTrackOrder, { loading, data, error }] = getTrackingOrder({ ...orderField });

    const isLogin = getLoginInfo();

    if (isLogin) {
        const { data: dataCustomer, loading: loadCustomer } = getCustomer();
        if (loadCustomer) {
            return (
                <Layout {...props} pageConfig={config}>
                    <Skeleton />
                </Layout>
            );
        }
        if (dataCustomer && dataCustomer.customer) {
            customer = dataCustomer.customer;
        }
    }
    return (
        <Layout {...props} pageConfig={config}>
            <Content
                {...props}
                email={customer.email || ''}
                getTrackOrder={getTrackOrder}
                loading={loading}
                data={data}
                error={error}
                orderField={orderField}
                setOrderField={setOrderField}
            />
        </Layout>
    );
};

Tracking.propTypes = {
    FormView: PropTypes.func,
    Skeleton: PropTypes.func,
    SkeletonResult: PropTypes.func,
    ResultView: PropTypes.func,
};

Tracking.defaultProps = {
    FormView: () => {},
    Skeleton: () => {},
    SkeletonResult: () => {},
    ResultView: () => {},
};

export default Tracking;
