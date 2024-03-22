import Layout from '@layout';
import { withTranslation } from 'next-i18next';
import * as Sentry from '@sentry/node';
import { getLoginInfo } from '@helper_auth';

const Error = (props) => {
    const {
        statusCode, Content, pageConfig, storeConfig, hasGetInitialPropsRun, err,
    } = props;
    let isLogin;
    if (!hasGetInitialPropsRun && err) {
        // getInitialProps is not called in case of
        // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
        // err via _app.js so it can be captured
        Sentry.captureException(err);
    }
    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
    }
    const statusCodes = {
        400: 'Bad Request',
        404: 'This page could not be found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
    };

    // eslint-disable-next-line react/destructuring-assignment
    const title = props.title || statusCodes[statusCode] || 'An unexpected error has occurred';

    const config = {
        ...pageConfig,
        title,
        tagSelector: 'swift-page-error',
    };

    return (
        <Layout pageConfig={config} isLogin={isLogin} {...props} {...storeConfig}>
            <Content statusCode={statusCode} title={title} />
        </Layout>
    );
};

export default withTranslation()(Error);
