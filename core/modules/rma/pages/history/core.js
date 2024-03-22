import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@layout';
import { getHistoryRma } from '@core_modules/rma/services/graphql';

const ReturnOrder = (props) => {
    const {
        t, Content, rowsPerPage = 10, ...other
    } = props;
    const config = {
        title: t('rma:history'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('rma:history'),
        bottomNav: false,
        tagSelector: 'swift-page-rmahistory',
    };
    const [page, setPage] = React.useState(1);
    const [perPage, setRowsPerPage] = React.useState(rowsPerPage);

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(1);
    };

    const { data, loading, error } = getHistoryRma({
        page_size: perPage,
        current_page: page,
    });

    const contentProps = {
        t,
        data,
        loading,
        error,
        page,
        rowsPerPage: perPage,
        handleChangePage,
        handleChangeRowsPerPage,
    };

    return (
        <Layout {...props} pageConfig={config}>
            <Content {...contentProps} {...other} />
        </Layout>
    );
};

ReturnOrder.propTypes = {
    Content: PropTypes.func,
};

ReturnOrder.defaultProps = {
    Content: () => null,
};

export default ReturnOrder;
