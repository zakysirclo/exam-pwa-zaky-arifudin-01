import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import createApolloClient from '@lib/apollo/apolloClient';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const getSSRProps = async (ctx) => {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });

    // translation
    const translation = await serverSideTranslations(
        ctx.locale,
        ['common', 'blog', 'catalog', 'product'],
    );

    // for gql ssr cache
    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...translation,
            apolloState,
        },
    };
};

export default getSSRProps;
