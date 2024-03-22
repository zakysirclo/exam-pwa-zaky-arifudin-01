/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client';
import { modules } from '@config';

/**
 * generate dynamic filter query
 * @param filter array of filter value
 * @param router Object router from nextjs (useRouter hook)
 * @returns string query to generate on grapql tag
 */

// eslint-disable-next-line no-unused-vars
export const filterProduct = (filter, router) => {
    // remove duplicate filter
    const newFilter = filter.filter((value, index) => {
        // eslint-disable-next-line no-underscore-dangle
        const _value = JSON.stringify(value);
        return index === filter.findIndex((obj) => JSON.stringify(obj) === _value);
    });
    let queryFilter = '{ ';
    // if (router && router.asPath && router.asPath.includes('color')) {
    //     const routerPaths = router.asPath.split('?');
    //     const routerPathsNext = routerPaths[1].split('&');
    //     const routerPathsColor = routerPathsNext[0].split('=');
    //     queryFilter += `color: {
    //     eq: "${routerPathsColor[1]}"
    //   }`;
    // }
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < newFilter?.length; index++) {
        const detailFilter = newFilter[index];
        if (detailFilter.type === 'price') {
            queryFilter += `
          ,${detailFilter.type} : {
            from: "${detailFilter.from}"
            to: "${detailFilter.to}"
          }
        `;
        } else if (detailFilter.type.includes('seller') && detailFilter.type.includes('filter')) {
            // for etalase
            // eslint-disable-next-line no-continue
            continue;
        } else if (typeof detailFilter.value === 'object') {
            let inFilter = '';
            // eslint-disable-next-line no-plusplus
            for (let idx = 0; idx < detailFilter.value.length; idx++) {
                inFilter += `${idx !== 0 ? ',' : ''}"${detailFilter.value[idx]}"`;
            }
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                in: [${inFilter}]
              }`;
        } else if (detailFilter.type === 'seller_id') {
            let inFilter = '';
            const arrVal = detailFilter.value.split(',');
            // eslint-disable-next-line no-plusplus
            for (let idx = 0; idx < arrVal.length; idx++) {
                inFilter += `${idx !== 0 ? ',' : ''}"${arrVal[idx]}"`;
            }
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                in: [${inFilter}]
              }`;
        } else if (detailFilter.type === 'seller_name') {
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type}: {
            match: "${detailFilter.value}"
          }`;
        } else {
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                  eq: "${detailFilter.value}"
                }`;
        }
    }
    queryFilter += '}';

    return queryFilter;
};

export const getProductAggregations = () => gql`
    query getProductAggregations($filter: ProductAttributeFilterInput) {
        products(search: "", filter: $filter) {
            aggregations {
                attribute_code
            }
        }
    }
`;

/**
 * scema dynamic product
 * @param config Object (Variable, etc)
 * @param config Object {pageSize: number, currentPage: Number}
 * @returns grapql query
 */

export const getProduct = (config = {}, router) => gql`
  query getProducts(
    $pageSize: Int,
    $currentPage: Int,
  ){
  products( search: "${config.search}" ,filter: ${filterProduct(config.filter, router)},
  pageSize: $pageSize,
  currentPage: $currentPage
  ${config.sort && config.sort.key && config.sort.key !== 'position' ? `, sort: {${config.sort.key} : ${config.sort.value}}` : ''}
    ) {
      page_info {
        current_page
       page_size
       total_pages
     }
      total_count
      ${
    !config.customFilter
        ? `aggregations {
        attribute_code
        label
        options {
          count
          label
          value
        }
      }`
        : ''
}
      __typename
      items {
        seller {
          seller_id
          seller_name
          seller_path
          seller_city
        }
        id
        sku
        name
        url_key
        stock_status
        short_description {
          html
        }
        ${
    config.configurable_options_enable
        ? `review {
          rating_summary
          reviews_count
        }`
        : ''
}
        small_image {
          url,
          label
        }
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
            discount{
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
            discount{
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
        ${config.label_sale_enable ? 'sale' : ''}
        ${
    config.configurable_options_enable
        ? `
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id
            label
            attribute_code
            values {
              value_index
              label
              swatch_data {
                value
                ... on ImageSwatchData {
                  thumbnail
                  value
                }
                ... on ColorSwatchData {
                  value
                }
                ... on TextSwatchData {
                  value
                }
              }
            }
            product_id
          }
          variants {
            attributes {
              code
              label
              value_index
            }
            product {
              id
              sku
              stock_status
              url_key
              ${
    config.rating_enable
        ? `review {
                rating_summary
                reviews_count
              }`
        : ''
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
              ${config.label_sale_enable ? 'sale' : ''}
              small_image{
                url,
                label
              }
              image {
                url
                label
              }
            }
          }
        }
        `
        : ''
}
      }
    }
  }
`;

export const getProductPrice = (config = {}, router) => gql`
  query getProducts(
    $pageSize: Int,
    $currentPage: Int,
  ){
  products( search: "${config.search}" ,filter: ${filterProduct(config.filter, router)},
  pageSize: $pageSize,
  currentPage: $currentPage
  ${config.sort && config.sort.key && config.sort.key !== 'position' ? `, sort: {${config.sort.key} : ${config.sort.value}}` : ''}
    ) {
      page_info {
        current_page
       page_size
       total_pages
     }
      total_count
      __typename
        
      items {
        id
        sku
        name
        url_key
        stock_status
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
        ${
    config.configurable_options_enable
        ? `
        ... on ConfigurableProduct {
          id
          name
          url_key
          variants{
            attributes{
              label
              code
            }
            product{
              sku
              price_range{
                maximum_price{
                  final_price{
                    value
                  }
                }
              }
            }
          }
          __typename
        }`
        : ''
}
      }
    }
  }
`;

export const addWishlist = gql`
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
        }
    }
`;

const productDetail = (config = {}) => `
    id
    name
    sku
    short_description {
      html
    }
    ${config.label_sale_enable ? 'sale' : ''}
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url,
      label
    }
    image{
      url
    }
    review {
      rating_summary
      reviews_count
    }
    categories {
      id
      name
      url_path
      breadcrumbs {
        category_id
        category_url_path
        category_name
      }
    }
    special_from_date
    special_to_date
    new_from_date
    new_to_date
    `;
const priceRange = `
    price_range {
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
    }
    `;

const priceTiers = `
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
    `;

/**
 * scema dynamic resolver url
 * @param url String
 * @returns grapql query
 */

export const getDetailProduct = (config = {}) => gql`
query getDetailproduct($url_key: String!){
  products(
      search: "" ,filter: {
        url_key: {
          eq: $url_key
        }
      }
    ) {
      items {
        ... on AwGiftCardProduct {
          aw_gc_allow_delivery_date
          aw_gc_allow_open_amount
          aw_gc_amounts
          aw_gc_custom_message_fields
          aw_gc_description
          aw_gc_email_templates {
            image_url
            name
            value
          }
          aw_gc_open_amount_max
          aw_gc_open_amount_min
          aw_gc_type   
        }
        ${
    modules.product.customizableOptions.enabled
        ? `
        ... on CustomizableProductInterface {
          options {
            title
            option_id
            required
            sort_order
            __typename
          }
        }
        `
        : ''
}
        ${productDetail(config)}
        ${priceRange}
        ${priceTiers}
        ${modules.brands.enabled ? 'brand' : ''}
        short_description {
          html
        }
        media_gallery {
          label,
          url
        }
        seller {
          seller_id
          seller_name
          seller_path
          seller_city
        }
      }
      total_count
    }
}`;

export const getDetailProductPrice = (config = {}) => gql`
query getDetailproduct($url_key: String!){
  products(
      search: "" ,filter: {
        url_key: {
          eq: $url_key
        }
      }
    ) {
      items {
        id
        name
        sku
        ${priceRange}
        ${priceTiers}
        ${
    config.configurable_options_enable
        ? `
              ... on ConfigurableProduct {
                id
                name
                url_key
                variants{
                  attributes{
                    label
                    code
                  }
                  product{
                    sku
                    ${priceRange}
                    ${priceTiers}
                  }
                  attributes {
                    uid
                    label
                    code
                    value_index
                  }
                }
                __typename
              }`
        : ''
}

        ... on BundleProduct {
          price_view
        }
      }
    }
}`;

export const getSeller = gql`
    query getSeller($seller_id: [Int!]) {
        getSeller(input: { seller_id: $seller_id }) {
            id
            name
            address
            city
            description
            latitude
            longitude
            logo
            status
        }
    }
`;
