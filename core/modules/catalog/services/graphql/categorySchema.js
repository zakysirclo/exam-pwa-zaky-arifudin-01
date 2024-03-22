import { gql } from '@apollo/client';

/**
 * scema dynamic category
 * @param variables Object {id: number, productSize: Number}
 * @returns grapql query
 */

export const getCategory = (
    variables = {
        productSize: 10,
    },
) => gql`
    {
        categoryList(filters: { ids: { eq: "${variables.id}" } }) {
          id
          name
          description
          url_path
          image
          image_path
          meta_description
          meta_keywords
          meta_title
          breadcrumbs {
            category_id
            category_name
            category_url_path
          }
          children {
            id
            name
            image
            url_path
          }
          cms_block {
            content
            identifier
            title
          } 
          display_mode
        }
    }
    `;

/**
 * scema dynamic get attribute filter
 * @param category_id number
 * @returns grapql query
 */

export const getFilter = (catID) => gql`
    {
        getFilterAttributeOptions (catid:${catID}) {
            code
            data {
                field
                id
                label
                maxprice
                minprice
                value {
                    label
                    value
                }
            }
            message
            status
        }
    }
`;

/**
 * get category products
 * @returns {object} gql
 */
export const getCategoryProducts = (variables) => gql`{
    categoryList(filters: { ids: { eq: "${variables.category_id}" } }) {
        url_path
        canonical_url
        products(currentPage: ${variables.page}, pageSize: ${variables.products_count}){
            page_info {
                current_page
                page_size
                total_pages
            }
            items {
                id
                sku
                name
                url_key
                stock_status
                categories {
                    name
                }
                __typename
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
                    regular_price {
                        currency
                        value
                    }
                    }
                }
                special_from_date
                special_to_date
                new_from_date
                new_to_date
                sale
                image {
                    url
                    label
                }
                small_image {
                    url
                    label
                }
            }
        }
    }
}`;

export const configpwa = gql`
    {
        storeConfig {
            enable_oms_multiseller
            secure_base_media_url
            header_logo_src
            pwa {
                add_to_cart_enable
                app_name
                cms_contact_identifiers
                configurable_options_enable
                custom_install_app_enable
                default_robot
                drawer_filter_on_desktop_enable
                facebook_app_id
                facebook_meta_id_app_id
                facebook_meta_id_enable
                home_slider_desktop_height
                home_slider_desktop_width
                home_slider_mobile_height
                home_slider_mobile_width
                icon_apple_touch
                image_category_height
                image_category_width
                image_product_height
                image_product_width
                install_message
                label_enable
                label_new_enable
                label_sale_enable
                label_weltpixel_enable
                magezon_slider_desktop_height
                magezon_slider_desktop_width
                magezon_slider_mobile_height
                magezon_slider_mobile_width
                page_size
                paypal_debug
                paypal_enable
                paypal_merchant_id
                popup_detail_image_enable
                quick_view_enable
                rating_enable
                recaptcha_contact_enable
                recaptcha_enable
                recaptcha_login_enable
                recaptcha_register_enable
                recaptcha_server_key_dev
                recaptcha_server_key_local
                recaptcha_server_key_prod
                recaptcha_server_key_stage
                recaptcha_site_key_dev
                recaptcha_site_key_local
                recaptcha_site_key_prod
                recaptcha_site_key_stage
                remove_decimal_price_enable
                share_icon_email
                share_icon_facebook
                share_icon_line
                share_icon_linkedin
                share_icon_pinterest
                share_icon_telegram
                share_icon_twitter
                thumbor_enable
                thumbor_https_http
                thumbor_url
                product_listing_navigation
            }
        }
    }
`;
