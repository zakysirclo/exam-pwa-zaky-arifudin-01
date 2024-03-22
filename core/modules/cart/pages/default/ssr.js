import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import createApolloClient from '@lib/apollo/apolloClient';

const getSSRProps = async (ctx) => {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });

    // translation
    const translation = await serverSideTranslations(
        ctx.locale,
        ['common', 'checkout', 'cart', 'validate'],
    );

    return {
        props: {
            ...translation,
        },
    };
};

export default getSSRProps;
