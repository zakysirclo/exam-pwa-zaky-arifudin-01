import { getCmsPage } from '@core_modules/cms/services/graphql/schema';

const getSSRProps = async ({ apolloClient, identifier = '' }) => {
    // get cms page
    const cmsRes = await apolloClient.query({
        query: getCmsPage,
        variables: {
            identifier,
        },
    });

    const cmsData = cmsRes?.data;

    return {
        props: {
            cmsData: cmsData ?? null,
        },
    };
};

export default getSSRProps;
