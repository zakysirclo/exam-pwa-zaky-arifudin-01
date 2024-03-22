import { gql } from '@apollo/client';

export const getCategoryByName = gql`
    query categoryList($name: String) {
        categoryList(filters: { name: { match: $name } }) {
            id
            name
            url_key
            url_path
            __typename
            breadcrumbs {
                category_id
                category_level
                category_name
                category_url_key
                category_url_path
            }
        }
    }
`;

export const getSeller = gql`
    query getSeller($input: SellerInput) {
        getSeller(input: $input ) {
            id
            name
            logo
            status
            address
            description
            city
            latitude
            longitude
            additional_info
        }
    }
`;

export default {
    getCategoryByName,
    getSeller,
};
