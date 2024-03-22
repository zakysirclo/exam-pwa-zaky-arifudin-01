import { gql } from '@apollo/client';

export const getCmsPage = gql`
    query($identifier: String!) {
        cmsPage(identifier: $identifier) {
            identifier
            content
            meta_description
            meta_keywords
            meta_title
            title
            url_key
        }
    }
`;

export const getInstagramToken = gql`
{
    instagramToken {
      token
    }
}
`;

export const getPageBuilderTemplate = gql`
query($identifier: String!){
    getPageBuilderTemplate(id: $identifier){
        data
    }
}
`;

export const getInstagramFeed = gql`
mutation getInstagramFeed($token: String!) {
    internalGetInstagramFeed(token: $token) {
        message
        data {
            id
            media_type
            media_url
            permalink
            caption
            username
        }
        err
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

export const getProductReviews = gql`
    query getProductReviews($sku: String, $pageSize: Int) {
        products(
            filter: { 
                sku: {
                    eq: $sku
                }
            }, 
            pageSize: $pageSize
        ) {
            items {
                id
                sku
                name
                url_key
                small_image {
                    url
                    label
                }
                reviews {
                    items {
                        nickname
                        summary
                        created_at
                        text
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
`;

export const getProductPrice = gql`
    query getProductPrice($search: String, $pageSize: Int, $filter: ProductAttributeFilterInput, $sort: ProductAttributeSortInput) {
        products(search: $search, pageSize: $pageSize, filter: $filter, sort: $sort) {
            items {
                id
                name
                sku
                url_key
                price_range {
                    maximum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                    minimum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
                price_tiers {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    quantity
                }
            }
        }
    }`;

export const getProductList = gql`
    query getProductList($search: String, $pageSize: Int, $filter: ProductAttributeFilterInput, $sort: ProductAttributeSortInput) {
        products(search: $search, pageSize: $pageSize, filter: $filter, sort: $sort) {
            items {
                seller {
                    seller_name
                }
                id
                name
                sku
                url_key
                review_count
                short_description {
                    html
                }
                price_range {
                    maximum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                    minimum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
                price_tiers {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    quantity
                }
                small_image {
                    label
                    url
                }
                review {
                    rating_summary
                    reviews_count
                }
                new_from_date
                new_to_date
                stock_status
            }
        }
    }
`;

export const getPriceProductList = gql`
query getProductList($search: String, $pageSize: Int, $filter: ProductAttributeFilterInput, $sort: ProductAttributeSortInput) {
    products(search: $search, pageSize: $pageSize, filter: $filter, sort: $sort) {
        items {
            id
            sku
            url_key
            price_range {
                maximum_price {
                    regular_price {
                        value
                    }
                    final_price {
                        value
                    }
                    discount {
                        amount_off
                        percent_off
                    }
                }
                minimum_price {
                    regular_price {
                        value
                    }
                    final_price {
                        value
                    }
                    discount {
                        amount_off
                        percent_off
                    }
                }
            }
            price_tiers {
                discount {
                    amount_off
                    percent_off
                }
                final_price {
                    currency
                    value
                }
                quantity
            }
            stock_status
        }
    }
}
`;

export const getCategories = gql`
    query getCategories($ids: [String]) {
        categoryList(filters: { ids: { in: $ids } }) {
            name
            product_count
            url_path
            children {
                name
                product_count
                url_path
                children {
                    name
                    product_count
                    url_path
                    children {
                        name
                        product_count
                        url_path
                        children {
                            name
                            product_count
                            url_path
                        }
                    }
                }
            }
        }
    }
`;

export default { getCmsPage };
