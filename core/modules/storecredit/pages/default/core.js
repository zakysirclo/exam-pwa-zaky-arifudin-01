import Layout from '@layout';
import { getStoreCredit } from '@core_modules/storecredit/services/graphql';
import { currencyVar } from '@core/services/graphql/cache';

const PageStoreCredit = (props) => {
    const { t, Content } = props;
    const config = {
        title: t('storecredit:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('storecredit:title'),
        bottomNav: false,
        tagSelector: 'swift-page-storecredit',
    };

    // cache currency
    const currencyCache = currencyVar();

    const [page, setPage] = React.useState(1);
    const [perPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(1);
    };
    let storeCredit = {
        current_balance: {
            value: 0,
            currency: 'USD',
        },
        transaction_history: {
            items: [],
        },
    };
    const { data, loading, error } = getStoreCredit({
        pageSizeStoreCredit: perPage,
        currentPageStoreCredit: page,
    });

    if (data) {
        storeCredit = data.customer.store_credit;
    }
    return (
        <Layout {...props} pageConfig={config}>
            <Content
                t={t}
                storeCredit={storeCredit}
                loading={loading}
                error={error}
                rowsPerPage={perPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                currencyCache={currencyCache}
            />
        </Layout>
    );
};

export default PageStoreCredit;
