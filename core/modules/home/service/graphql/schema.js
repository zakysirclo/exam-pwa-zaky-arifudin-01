import { gql } from '@apollo/client';

export const getSlider = gql`
    query getSlider($input: InputSlider) {
        slider(input: $input) {
            slider_id
            images {
                image_id
                image_url
                thumb_image_url
                mobile_image_url
                url_redirection
                video
            }
        }
    }
`;

export const getBannerSlider = gql`
    {
        getHomepageSlider {
            slider_id
            images {
                image_id
                image_url
                mobile_image_url
                thumb_image_url
                url_redirection
            }
        }
    }
`;

export const getFeaturedProducts = () => gql`
    query ($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                path
                image_path
                url_path
                products {
                    items {
                        __typename
                        id
                        name
                        sku
                        url_key
                        new_from_date
                        new_to_date
                        canonical_url
                        small_image {
                            url
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
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                                final_price {
                                    currency
                                    value
                                }
                            }
                        }
                        special_from_date
                        special_to_date
                    }
                }
            }
            children_count
        }
    }
`;

export const getCategoryList = gql`
    query ($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                description
                image_path
                url_path
            }
            children_count
        }
    }
`;

export const getCmsPageConfig = gql`
    {
        storeConfig {
            pwa {
                use_cms_page_enable
                use_cms_page_identifier
            }
        }
    }
`;
// sini
export const getHomePageConfig = `
{
    storeConfig {
        pwa {
            use_cms_page_enable
            use_cms_page_identifier
        }
    }
}
`;

export default {
    getBannerSlider,
    getCategoryList,
    getFeaturedProducts,
    getSlider,
    getCmsPageConfig,
};
