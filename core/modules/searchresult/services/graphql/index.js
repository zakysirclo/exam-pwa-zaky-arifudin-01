import { useQuery } from '@apollo/client';
import schema from '@core_modules/searchresult/services/graphql/schema';

export const getCategoryByName = (variables) => useQuery(schema.getCategoryByName, { variables });
export const getSeller = (options = {}) => useQuery(schema.getSeller,
    {
        ...options,
        context: {
            request: 'internal',
        },
    });

export default {
    getCategoryByName,
    getSeller,
};
