import * as schemaProduct from '@core_modules/product/services/graphql/schema';

const getSSRProductProps = async ({ apolloClient, slug, storeConfig }) => {
    try {
        await apolloClient.query({
            query: schemaProduct.getProduct(storeConfig),
            variables: { url: slug },
        });

        return {};
    } catch (error) {
        return {};
    }
};

export default getSSRProductProps;
