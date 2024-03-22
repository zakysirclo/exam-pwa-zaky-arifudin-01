import Layout from '@layout';
import { getReview } from '@core_modules/productreview/services/graphql';

const PageReview = (props) => {
    const { t, Content, storeConfig } = props;
    const config = {
        title: t('productreview:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('productreview:title'),
        bottomNav: false,
        tagSelector: 'swift-page-productreview',
    };

    const [page, setPage] = React.useState(1);
    const [perPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(1);
    };
    let reviewCustomer = null;
    const { data, loading, error } = getReview({
        pageSizeReview: perPage,
        currentPageReview: page,
    });

    if (data) {
        reviewCustomer = data.customer.reviews;
    }
    return (
        <Layout {...props} pageConfig={config}>
            <Content
                t={t}
                reviewCustomer={reviewCustomer}
                loading={loading}
                error={error}
                rowsPerPage={perPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                storeConfig={storeConfig}
            />
        </Layout>
    );
};

export default PageReview;
