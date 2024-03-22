import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import createApolloClient from '@lib/apollo/apolloClient';
import { getCheckoutDataFromRequest } from '@core/helpers/cookies';
import Router from 'next/router';

const getSSRProps = async (ctx) => {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });

    // translation
    const translation = await serverSideTranslations(
        ctx.locale,
        ['common', 'checkout', 'cart', 'home', 'customer', 'thanks'],
    );

    const checkoutData = getCheckoutDataFromRequest(ctx);
    if (!checkoutData) {
        if (ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/',
            });
            ctx.res.end();
            return {
                props: {
                    ...translation,
                },
            };
        }
        Router.push('/');
    }

    return {
        props: {
            ...translation,
            checkoutData: typeof checkoutData === 'string' ? JSON.parse(checkoutData) : checkoutData,
        },
    };
};

export default getSSRProps;
