import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const getSSRProps = async (ctx) => ({
    props: {
        ...(await serverSideTranslations(ctx.locale, ['common', 'storelocator'])),
        withAuth: true,
        query: ctx.query,
    },
});

export default getSSRProps;
