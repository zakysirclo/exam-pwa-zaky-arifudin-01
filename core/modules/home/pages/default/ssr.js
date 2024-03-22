import { modules } from '@config';
import graphRequest from '@graphql_request';
import { getHomePageConfig } from '@core_modules/home/service/graphql/schema';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getCmsSSRProps from '@core_modules/cms/pages/default/ssr';
import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import createApolloClient from '@lib/apollo/apolloClient';

const getSSRProps = async (ctx) => {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });

    // translation
    const translation = await serverSideTranslations(
        ctx.locale,
        modules.checkout.checkoutOnly ? ['common', 'checkout', 'customer', 'validate'] : ['common', 'home', 'catalog', 'product'],
    );

    let homePageConfig = null;
    if (!modules.checkout.checkoutOnly && ctx && ctx.req) {
        const homeConfig = await graphRequest(getHomePageConfig);
        homePageConfig = homeConfig.storeConfig;
    }

    const identifier = homePageConfig?.pwa?.use_cms_page_identifier ?? '';
    if (!modules.checkout.checkoutOnly) {
        await getCmsSSRProps({ apolloClient, identifier });
    }

    // for gql ssr cache
    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...translation,
            homePageConfig,
            apolloState,
        },
    };
};

export default getSSRProps;
