/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const categories = gql`
    {
        categories {
            items {
                uid
                name
                level
                path
                url_path
                url_key
                include_in_menu
                children_count
                children {
                    uid
                    name
                    level
                    path
                    url_path
                    url_key
                    include_in_menu
                    children_count
                    children {
                        uid
                        name
                        level
                        path
                        url_path
                        url_key
                        include_in_menu
                        children_count
                        children {
                            uid
                            name
                            level
                            path
                            url_path
                            url_key
                            include_in_menu
                            children_count
                            children {
                                uid
                                name
                                level
                                path
                                url_path
                                url_key
                                include_in_menu
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getCustomer = gql`
    {
        customer {
            id
            firstname
            lastname
            email
            is_subscribed
            wishlists {
                items_v2 {
                    items {
                        id
                    }
                }
            }
        }
    }
`;

export const removeToken = gql`
    mutation {
        internalDeleteCustomerToken {
            result
        }
    }
`;

/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

export const getProduct = (key) => {
    const query = gql`{
        products(
            search: "${key}",
            pageSize: 5
          ) {
            items {
                seller{
                    seller_name
                }
                id
                name
                url_key
                small_image {
                    url
                    label
                }
                price_tiers {
                    discount {
                      percent_off
                      amount_off
                    }
                    final_price {
                      currency
                      value
                    }
                    quantity
                }
                price_range{
                    maximum_price {
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                    minimum_price {
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                }
            }
            total_count
          }
    }`;
    return query;
};

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

export const getSellerByName = (name) => {
    const query = gql`
        {
            getSeller(input: { keyword: "${name}" }) {
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
            seller_path
            }
        }
    `;
    return query;
};

export const getRecentlyProduct = () => {
    const query = gql`
        query getRecentlyProduct($filter: ProductAttributeFilterInput) {
            products(filter: $filter) {
                items {
                    id
                    name
                    url_key
                    small_image {
                        url
                        label
                    }
                    price_range {
                        maximum_price {
                            discount {
                                amount_off
                                percent_off
                            }
                            final_price {
                                currency
                                value
                            }
                            fixed_product_taxes {
                                amount {
                                    currency
                                    value
                                }
                                label
                            }
                            regular_price {
                                currency
                                value
                            }
                        }
                        minimum_price {
                            discount {
                                amount_off
                                percent_off
                            }
                            final_price {
                                currency
                                value
                            }
                            fixed_product_taxes {
                                amount {
                                    currency
                                    value
                                }
                                label
                            }
                            regular_price {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    `;
    return query;
};
/**
 * schema dynamic resolver url
 * @param name String
 * @returns graphql query
 */

export const getCategoryByName = (name) => {
    const query = gql`{
        categoryList(filters: { name: { match: "${name}" } }) {
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
      }`;
    return query;
};

/**
 * [SCHEMA] get currency
 * @param null
 * @return {graphql}
 */
export const getCurrencySchema = gql`
    {
        currency {
            base_currency_code
            base_currency_symbol
            default_display_currency_code
            default_display_currency_symbol
            available_currency_codes
            exchange_rates {
                currency_to
                rate
            }
        }
    }
`;

export const getCountCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;

export default {
    categories,
    getCustomer,
    removeToken,
    getCurrencySchema,
    getProduct,
    getSeller,
    getCategoryByName,
    getSellerByName,
    getRecentlyProduct,
    getCountCart,
};
