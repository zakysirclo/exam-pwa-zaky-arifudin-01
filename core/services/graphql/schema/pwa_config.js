import { gql } from '@apollo/client';

export const popupInstallConfig = gql`
    {
        storeConfig {
            pwa {
                app_name
                icon_apple_touch
                custom_install_app_enable
                install_message
            }
        }
    }
`;

export const shareIconConfig = gql`
    {
        storeConfig {
            pwa {
                share_icon_line
                share_icon_email
                share_icon_twitter
                share_icon_facebook
                share_icon_linkedin
                share_icon_telegram
            }
        }
    }
`;

export const getRemoveDecimalConfig = `
{
    storeConfig {
      pwa {        
        remove_decimal_price_enable
      }
    }
  }
`;

export const contactConfig = gql`
    {
        storeConfig {
            pwa {
                cms_contact_identifiers
                recaptcha_contact_enable
                recaptcha_site_key_local
                recaptcha_site_key_dev
                recaptcha_site_key_stage
                recaptcha_site_key_prod
            }
        }
    }
`;

export const popupDetailImagePdp = gql`
    {
        storeConfig {
            pwa {
                popup_detail_image_enable
            }
        }
    }
`;

export const pageSizeConfig = gql`
    {
        storeConfig {
            pwa {
                page_size
            }
        }
    }
`;

export const drawerFilterOnDesktopConfig = gql`
    {
        storeConfig {
            pwa {
                drawer_filter_on_desktop_enable
            }
        }
    }
`;

export const labelConfig = gql`
    {
        storeConfig {
            pwa {
                label_enable
            }
        }
    }
`;

export const configurableOptionsConfig = gql`
    {
        storeConfig {
            pwa {
                configurable_options_enable
            }
        }
    }
`;

export const ratingConfig = gql`
    {
        storeConfig {
            pwa {
                rating_enable
            }
        }
    }
`;

export const addToCartConfig = gql`
    {
        storeConfig {
            pwa {
                add_to_cart_enable
            }
        }
    }
`;

export const quickViewConfig = gql`
    {
        storeConfig {
            pwa {
                quick_view_enable
            }
        }
    }
`;

export const loginConfig = gql`
    {
        storeConfig {
            pwa {
                recaptcha_login_enable
                recaptcha_site_key_local
                recaptcha_site_key_dev
                recaptcha_site_key_stage
                recaptcha_site_key_prod
            }
        }
    }
`;

export const registerConfig = gql`
    {
        storeConfig {
            pwa {
                recaptcha_register_enable
                recaptcha_site_key_local
                recaptcha_site_key_dev
                recaptcha_site_key_stage
                recaptcha_site_key_prod
            }
        }
    }
`;

export const facebookMetaConfig = gql`
    {
        storeConfig {
            pwa {
                facebook_meta_id_enable
                facebook_meta_id_app_id
            }
        }
    }
`;

export const productListConfig = gql`
    {
        storeConfig {
            pwa {
                label_enable
                label_new_enable
                label_sale_enable
                label_weltpixel_enable
                configurable_options_enable
                rating_enable
                add_to_cart_enable
                quick_view_enable
            }
        }
    }
`;

export default {
    popupInstallConfig,
    shareIconConfig,
    contactConfig,
    getRemoveDecimalConfig,
    pageSizeConfig,
    drawerFilterOnDesktopConfig,
    labelConfig,
    configurableOptionsConfig,
    ratingConfig,
    addToCartConfig,
    quickViewConfig,
    loginConfig,
    registerConfig,
    facebookMetaConfig,
};
