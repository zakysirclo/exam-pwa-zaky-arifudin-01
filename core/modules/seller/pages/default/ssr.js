import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import createApolloClient from '@lib/apollo/apolloClient';
import { getSeller } from '@core_modules/seller/services/graphql/schema';

const getSSRProps = async (ctx) => {
    const apolloClient = createApolloClient({}, ctx);
    try {
        const seller_path = ctx?.query?.sellerPath;
        await apolloClient.query({
            query: getSeller,
            variables: {
                seller_path,
            },
        });
    } catch (error) {
        // handling error
    }

    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'seller', 'catalog', 'product'])),
            query: ctx.query,
            apolloState,
        },
    };
};

export default getSSRProps;
