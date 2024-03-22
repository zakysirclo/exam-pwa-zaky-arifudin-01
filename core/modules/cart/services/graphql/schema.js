/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';
import { modules } from '@config';

// const applied_store_credit = modules.storecredit.useCommerceModule
//     ? `
// applied_store_credit {
//     applied_balance {
//       currency
//       value
//     }
//     current_balance {
//       currency
//       value
//     }
//     enabled
// }
// `
//     : `
// applied_store_credit {
//     store_credit_amount
//     is_use_store_credit
// }
// `;

// const applied_cashback = `
// applied_cashback {
//     data {
//         amount
//         promo_name
//     }
//     is_cashback
//     total_cashback
// }
// `;

// const applied_reward_points = `
// applied_reward_points {
//     is_use_reward_points
//     reward_points_amount
// }
// `;

// const applied_coupons = `
// applied_coupons {
//     code
// }
// `;

// const applied_extrafee = `
// applied_extra_fee {
//     extrafee_value {
//       currency
//       value
//     }
//     select_options {
//       default
//       label
//       option_id
//       price
//     }
//     show_on_cart
//     title
// }
// addtional_fees {
//     data {
//       enabled
//       fee_name
//       frontend_type
//       id_fee
//       options {
//         default
//         label
//         option_id
//         price
//       }
//     }
//     show_on_cart
// }
// `;

const applied_giftcard = modules.giftcard.useCommerceModule
    ? `
applied_gift_cards {
    applied_balance {
      currency
      value
    }
    code
    current_balance {
      currency
      value
    }
}
`
    : `
applied_giftcard {
    giftcard_amount
    giftcard_detail {
        giftcard_amount_used
        giftcard_code
    }
}

`;

// const prices = `
// prices {
//   discounts {
//       amount {
//           currency
//           value
//       }
//       label
//   }
//   subtotal_excluding_tax {
//       currency
//       value
//   }
//   subtotal_including_tax {
//       currency
//       value
//   }
//   applied_taxes {
//       amount {
//           value
//           currency
//       }
//   }
//   grand_total {
//       currency
//       value
//   }
// }
// `;

const custom_price = `
custom_total_price{
  subtotal_including_tax{
    value
    currency
  }
  grand_total{
    value
    currency
  }
}
`;

const customizable_options = `
customizable_options {
  id
  label
  is_required
  sort_order
  values {
    label
    value
  }
}
`;

const items = `
items {
  id
  note
  errorCartItems
  quantity
  ... on SimpleCartItem {
    SimpleMiniCustomizable: ${customizable_options}
  }

  ... on VirtualCartItem {
    virutalItemCustomizable: ${customizable_options}
  }
  ... on ConfigurableCartItem {
    ConfigurableMiniCustomizable: ${customizable_options}
      configurable_options {
      option_label
      value_label
    }
  }
  ... on BundleCartItem {
    bundle_options {
      label
      type
      values {
        label
        quantity
        price
      }
    }
  }
  ... on DownloadableCartItem {
    downloadablItemCustomizable: ${customizable_options}
    links {
      title
    }
  }
  ... on AwGiftCardCartItem {
    aw_giftcard_option {
      label
      value
    }
  }
  custom_price {
    price_incl_tax {
      value
      currency
    }
    row_total_incl_tax {
      value
      currency
    }
  }
  product {
    id
    name
    small_image {
      url
      label
    }
    url_key
    sku
  }
}
`;

const itemsCart = `
items {
  id
  note
  errorCartItems
  quantity
  ... on SimpleCartItem {
    SimpleMiniCustomizable: ${customizable_options}
  }

  ... on VirtualCartItem {
    virutalItemCustomizable: ${customizable_options}
  }
  ... on ConfigurableCartItem {
    ConfigurableMiniCustomizable: ${customizable_options}
      configurable_options {
      option_label
      value_label
    }
  }
  ... on BundleCartItem {
    bundle_options {
      label
      type
      values {
        label
        quantity
        price
      }
    }
  }
  ... on DownloadableCartItem {
    downloadablItemCustomizable: ${customizable_options}
    links {
      title
    }
  }
  ... on AwGiftCardCartItem {
    aw_giftcard_option {
      label
      value
    }
  }
  custom_price {
    price_incl_tax {
      value
      currency
    }
    row_total_incl_tax {
      value
      currency
    }
  }
  product {
    id
    name
    small_image {
      url
      label
    }
    url_key
    sku
    seller {
      seller_id
      seller_city
      seller_name
      seller_path
    }
  }
}
`;

const cartAvailablePaymentMethods = `
    available_payment_methods {
        code
        title
    }
`;

const promoBanner = `
promoBanner {
  cms_block_id
  name
  cms_block_identifier
  rule_id
}
`;
const miniCartSelection = `
id
errorItems
total_quantity
${custom_price}
`;
const cartRequiredSelection = `
id
errorItems
total_quantity
${custom_price}
${promoBanner}
`;
const cartAvailableFreeItems = `
    available_free_items {
        sku
        quantity
        promo_item_data {
            ruleId
            minimalPrice
            discountItem
            isDeleted
            qtyToProcess
            __typename
        }
        __typename
    }
`;
export const getCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            ${cartRequiredSelection}
            ${cartAvailablePaymentMethods}
        }
    }
`;

export const getCartItem = gql`query getCartData($cartId: String!) {
  cart(cart_id: $cartId) {
    id
    ${itemsCart}
  }
}`;

export const getCrossellCart = () => gql`
query getCartData($cartId: String!) {
  cart(cart_id: $cartId) {
     items {
      product {
        crosssell_products {
          id
          name
          url_key
          sku
          thumbnail {
            url
          }
          small_image {
            url,
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
        }
      }
     }
  }
}
`;

export const getPriceCrossellCart = () => gql`
query getCartData($cartId: String!) {
  cart(cart_id: $cartId) {
     items {
      product {
        crosssell_products {
          id
          name
          url_key
          sku
          stock_status
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
        }
      }
     }
  }
}
`;

export const getMiniCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            errorItems
            total_quantity
            custom_total_price {
                subtotal_including_tax {
                  currency
                  value
                }
                grand_total{
                  value
                  currency
                }
            }
            items {
              id
              quantity
              errorCartItems
              note
              ... on SimpleCartItem {
                SimpleMiniCustomizable: ${customizable_options}
              }

              ... on VirtualCartItem {
                virtualMiniCustomizable: ${customizable_options}
              }

              ... on ConfigurableCartItem {
                ConfigurableMiniCustomizable: ${customizable_options}
                configurable_options {
                  option_label
                  value_label
                }
              }
              ... on BundleCartItem {
                bundle_options {
                  label
                  type
                  values {
                    label
                    quantity
                    price
                  }
                }
              }
              ... on DownloadableCartItem {
                downloadableMiniCustomizable: ${customizable_options}
                links {
                  title
                }
              }
              ... on AwGiftCardCartItem {
                aw_giftcard_option {
                  label
                  value
                }
              }
              custom_price {
                price_incl_tax {
                  value
                  currency
                }
                row_total_incl_tax {
                  value
                  currency
                }
              }
            product {
              id
              name
              small_image {
                url
                label
              }
              url_key
              sku
            }
          }
        }
    }
`;

export const deleteMiniCartItem = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        cart {
          id
          total_quantity
          ${itemsCart}
          ${custom_price}
        }
      }
    }
`;

export const deleteCartitem = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        cart {
          id
          total_quantity
          ${itemsCart}
          ${custom_price}
        }
      }
    }
`;

export const deleteCartItemOnPage = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        cart {
          id
          total_quantity
          ${custom_price}
          ${itemsCart}
          ${promoBanner}
        }
      }
    }
`;

export const updateMiniCartItem = gql`
    mutation updateCartItems($cartId: String!, $cart_item_id: Int!, $quantity: Float!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity }
        }
      ) {
        cart {
          ${miniCartSelection}
          ${itemsCart}
        }
      }
    }
`;

export const updateCartitem = gql`
    mutation updateCartItems($cartId: String!, $cart_item_id: Int!, $quantity: Float!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity }
        }
      ) {
        cart {
          ${cartRequiredSelection}
          ${itemsCart}
        }
      }
    }
`;

export const updateCartItemNote = gql`
    mutation updateCartItems($cartId: String!, $cart_item_id: Int!, $note: String!, $quantity: Float!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity },
          note: $note
        }
      ) {
        cart {
          id
          ${items}
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

export const getCartIdUser = gql`
    {
        customerCart {
            id
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

// reorder
export const reOrder = gql`
mutation reOrder($order_id: String!) {
  reorder(input: {order_id: $order_id}) {
    cart_id
  }
}
`;

export const cancelAndReOrder = gql`
mutation cancelAndReorder($order_id: String!) {
  cancelAndReorder(order_id: $order_id) {
    cart_id
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

export const applyCouponToCart = gql`
    mutation($cartId: String!, $coupon: String!) {
        applyCouponToCart(input: { cart_id: $cartId, coupon_code: $coupon }) {
            cart {
                id
                ${applied_giftcard}
                ${cartRequiredSelection}
                ${cartAvailableFreeItems}
                ${items}
            }
        }
    }
`;

export const removeCouponFromCart = gql`
    mutation($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                id
                ${applied_giftcard}
                ${cartRequiredSelection}
                ${cartAvailableFreeItems}
                ${items}
            }
        }
    }
`;

export const addProductsToPromoCart = gql`
    mutation addProductsToCartPromo(
        $cart_id: String!,
        $cart_items: [CartItemPromoInput]!
    ) {
          addProductsToCartPromo(
              input: {
                cart_id: $cart_id
                cart_items: $cart_items
              }
          ) {
              cart {
                  ${applied_giftcard}
                  ${cartRequiredSelection}
                  ${items}
                  ${cartAvailableFreeItems}
              }
          }
    }
`;

export const getCheckoutScv2Url = gql`
mutation generateScv2Url($cartId: String!) {
  generateScv2Url(input: {
    cartId: $cartId
  }) {
    message
    scv2_url
    success
  }
}
`;
