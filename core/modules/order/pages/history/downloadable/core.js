import Layout from '@layout';
import PropTypes from 'prop-types';
import { getOrderDownloadable } from '@core_modules/order/services/graphql';

const HistoryDownload = (props) => {
    const { t, Content } = props;
    const pageConfig = {
        title: t('customer:menu:myDownload'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myDownload'),
        bottomNav: false,
        tagSelector: 'swift-page-downloadablehistory',
    };

    const { loading, data, error } = getOrderDownloadable();

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} data={data?.customerDownloadableProducts?.items} loading={loading} error={error} />
        </Layout>
    );
};

HistoryDownload.propTypes = {
    Content: PropTypes.func,
};

HistoryDownload.defaultProps = {
    Content: () => null,
};

export default HistoryDownload;
