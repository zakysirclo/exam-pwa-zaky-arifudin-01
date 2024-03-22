/* eslint-disable linebreak-style */
import { gql } from '@apollo/client';
import config from '@config';

const { modules } = config;

const orderOutput = `
    current_page
    page_size
    total_count
    total_pages
    items {
        id
        order_comment
        comments {
            message
            timestamp
        }
        grand_total
        status
        status_label
        order_number
        seller_id
        seller_name
        seller_city
        created_at
        detail {
            customer_email
            customer_firstname
            grand_total
            discount_amount
            global_currency_code
            state
            status
            subtotal
            subtotal_incl_tax
            tax_amount
            total_item_count
            total_paid
            total_qty_ordered
            ${
    modules.checkout.pickupStore.enabled
        ? `pickup_store {
                is_using_pickup_store
                pickup_person  {
                    email
                    handphone
                    name
                }
            }`
        : ''
}
            payment {
                additional_information
                payment_additional_info {
                    method_title
                    transaction_time
                    virtual_account
                    }
                method
                shipping_amount
                shipping_captured
            }
            shipping_address {
                firstname
                lastname
                email
                street
                city
                region
                country_id
                telephone
                postcode
            }
            billing_address {
                firstname
                lastname
                email
                street
                city
                region
                country_id
                telephone
                postcode
            }
            shipping_methods {
                shipping_description
            }
            ${
    modules.promo.enabled
        ? `coupon {
                code
                rule_name
                is_use_coupon
            }`
        : ''
}
            items {
                item_id
                parent_item_id
                sku
                seller_id
                seller_name
                name
                note
                qty_ordered
                price
                price_incl_tax
                discount_amount
                image_url
                categories {
                    entity_id
                    name
                }
                rating {
                    total
                    value
                }
                quantity_and_stock_status {
                    is_in_stock
                    qty
                }
                row_total_incl_tax
            }

            ${
    modules.rewardpoint.enabled
        ? `aw_reward_points {
                is_use_reward_points
                reward_points
                reward_points_amount
            }`
        : ''
}

            ${
    modules.rma.enabled
        ? `aw_rma {
                status
            } `
        : ''
}           
            ${
    modules.giftcard.enabled
        ? `aw_giftcard {
                giftcard_amount
                giftcard_detail {
                    giftcard_code
                    giftcard_amount_used
                }
            }`
        : ''
}
            ${
    modules.storecredit.enabled
        ? `aw_store_credit {
                is_use_store_credit
                store_credit_amount
                store_credit_reimbursed
            }`
        : ''
}
            
            ${
    modules.checkout.extraFee.enabled
        ? `applied_extra_fee {
                extrafee_value {
                  value
                }
                title
              }`
        : ''
}
            
        }
    }
`;

export const getOrder = gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int) {
        customerOrders(pageSize: $pageSize, currentPage: $currentPage) {
            ${orderOutput}
        }
    }
`;

export const getCustomerOrder = gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int) {
        customer {
            orders(pageSize: $pageSize, currentPage: $currentPage) {
                ${orderOutput}
            }
        }
    }
`;

export const getCustomerOrderDownloadable = gql`
    query{
        customerDownloadableProducts{
        items{
        date
            download_url
            order_increment_id
            remaining_downloads
            status
            link_title
            title
        }
        }
    }
`;

export const getOrderDetail = gql`
    query getCustomerOrder($order_id: String) {
        customerOrders(filters: { ids: { eq: $order_id } }) {
            ${orderOutput}
        }
    }
`;

export const getCustomerOrderDetail = gql`
    query getCustomerOrder($order_id: String) {
        customer {
            orders(filters: { ids: { eq: $order_id } }) {
                ${orderOutput}
            }
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

export const getPaymentInformation = gql`
    query getPaymentInformation($order_id: String!) {
        OrderPaymentInformation(input: {order_id : $order_id}){
            method_title
            method_code
            virtual_account
            due_date
            instructions
            is_virtual_account
            invoice_url
            payment_code
            xendit_retail_outlet
            xendit_qrcode_external_id
            xendit_mode
        }
    }
`;

export const getTrackingOrder = gql`
    query getTrackingOrder($order_id: String) {
        ordersFilter(filters: {ids: { eq: $order_id } }) {
            data {
                id
                order_number
                status
                status_label
                detail {
                    payment {
                        method
                        additional_information
                        payment_additional_info {
                            method_title
                            __typename
                        }
                        __typename
                    }
                    __typename
                    shipping_methods {
                        shipping_description
                        shipping_detail {
                            track_number
                            trackorder_type
                            data_detail
                            __typename
                        }
                        __typename
                    }
                    shipping_address {
                        firstname
                        lastname
                        __typename
                    }
                    items {
                        name
                        __typename
                    }
                    __typename
                }
                grand_total
                __typename
            }
        }
    }
`;

export default {
    getOrder,
};
