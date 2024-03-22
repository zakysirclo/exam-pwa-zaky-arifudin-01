import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const getSSRProps = async (ctx) => ({
    props: {
        ...(await serverSideTranslations(ctx.locale, ['common', 'otp', 'validate', 'register'])),
        withAuth: false,
        query: ctx.query,
    },
});

export default getSSRProps;
