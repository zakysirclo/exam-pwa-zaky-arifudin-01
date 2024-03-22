import * as schemaCategory from '@core_modules/catalog/services/graphql/categorySchema';

const getSSRCategoryProps = async ({ apolloClient, urlResolver = {} }) => {
    try {
        const props = {};
        // get category
        const resCategory = await apolloClient.query({
            query: schemaCategory.getCategory({
                id: urlResolver?.id,
            }),
        });

        const category = resCategory?.data;

        props.category = category ?? null;

        return {
            props,
        };
    } catch (error) {
        return {};
    }
};

export default getSSRCategoryProps;
