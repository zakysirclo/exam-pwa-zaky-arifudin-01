import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import createApolloClient from '@lib/apollo/apolloClient';

const getSSRProps = async (ctx) => {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });
    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'customer', 'order', 'trackingorder', 'validate'])),
            apolloState,
        },
    };
};

export default getSSRProps;
