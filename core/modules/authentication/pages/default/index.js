import { withApollo } from '@lib_apollo';
import Backdrop from '@common_backdrop';
import { withTranslation } from 'next-i18next';
import Core from '@core_modules/authentication/pages/default/core';
// import { decrypt } from '@helpers/encryption';

const Content = () => <Backdrop open />;

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async (ctx) => {
    const { req } = ctx;
    if (!req.query || !req.query.state) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', '/');
        return { props: {}, namespacesRequired: ['common', 'checkout', 'customer', 'validate'] };
    }
    return {
        query: req.query,
        namespacesRequired: ['common', 'checkout', 'customer', 'validate'],
    };
};

export default withApollo({ ssr: false })(withTranslation()(Page));
