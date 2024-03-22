import urlParser from '@helper_urlparser';
import Layout from '@layout';
import PropTypes from 'prop-types';
import { getRewardPoint } from '@core_modules/rewardpoint/services/graphql';
import { currencyVar } from '@core/services/graphql/cache';

const RewardPoint = (props) => {
    const { t, Content } = props;

    const config = {
        title: t('rewardpoint:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('rewardpoint:title'),
        bottomNav: false,
        tagSelector: 'swift-page-rewardpoint',
    };

    // cache currency
    const currencyCache = currencyVar();

    const [page, setPage] = React.useState(1);
    const [count, setRowsPerPage] = React.useState(10);
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(1);
    };
    const { data, loading, error } = getRewardPoint({
        pageSize: count,
        currentPage: page,
    });

    let customerRewardPoints = {
        balance: 0,
        balanceCurrency: 0,
        formatedBalanceCurrency: '$0.00',
        formatedSpendRate: '$0.00',
        spendRate: 1,
        transaction_history: {
            items: [],
            page_info: {
                current_page: 1,
                page_size: 10,
                total_pages: 0,
            },
            total_count: 0,
        },
    };

    if (data && data.customerRewardPoints) customerRewardPoints = data.customerRewardPoints;
    const getId = (string) => string.split('#')[1].split('</a')[0];
    const getPath = (string) => {
        const path = urlParser(string, 'href').pathArray;
        const id = getId(string);
        let url = '';
        for (let index = 1; index < path.length - 2; index += 1) {
            url += `/${path[index]}`;
        }
        return `${url}/${id}`;
    };

    return (
        <Layout {...props} pageConfig={config}>
            <Content
                t={t}
                data={customerRewardPoints}
                loading={loading}
                error={error}
                getPath={getPath}
                getId={getId}
                rowsPerPage={count}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                currencyCache={currencyCache}
            />
        </Layout>
    );
};

RewardPoint.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
    ErrorView: PropTypes.func,
    rowsPerPage: PropTypes.number,
};

RewardPoint.defaultProps = {
    Content: () => {},
    Skeleton: () => {},
    ErrorView: () => {},
    rowsPerPage: 10,
};

export default RewardPoint;
