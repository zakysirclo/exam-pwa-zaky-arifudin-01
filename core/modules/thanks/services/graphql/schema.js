import { gql } from '@apollo/client';

export const getOrder = () => gql`
    query getOrder($order_number: String) {
        ordersFilter(filters: { ids: { eq: $order_number } }) {
            data {
                order_number
                id
                created_at
                status
                detail {
                    customer_email
                    tax_amount
                    payment {
                        shipping_amount
                        additional_information
                        payment_additional_info {
                            due_date
                            method_title
                            transaction_id
                            transaction_time
                            virtual_account
                        }
                        method
                    }
                    grand_total
                    total_qty_ordered
                    global_currency_code
                    discount_amount
                    coupon {
                        code
                        rule_name
                        is_use_coupon
                    }
                    items {
                        item_id
                        parent_item_id
                        name
                        sku
                        price
                        qty_ordered
                        row_weight
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
                    }
                }
            }
        }
    }
`;

export const getOrderSchema = gql`
    query getOrder($email: String, $order_number: String) {
        ordersFilter(filters: { email: $email, ids: { eq: $order_number } }) {
            data {
                order_number
                id
                created_at
                status
                seller_id
                seller_name
                seller_city
                detail {
                    tax_amount
                    payment {
                        shipping_amount
                        additional_information
                        payment_additional_info {
                            due_date
                            method_title
                            transaction_id
                            transaction_time
                            virtual_account
                        }
                        method
                    }
                    grand_total
                    total_qty_ordered
                    global_currency_code
                    discount_amount
                    coupon {
                        code
                        rule_name
                        is_use_coupon
                    }
                    items {
                        item_id
                        parent_item_id
                        name
                        sku
                        price
                        qty_ordered
                        row_weight
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
                        seller_id
                        seller_name
                    }
                }
            }
        }
    }
`;

export const getPaymentInformation = () => gql`
    query getPaymentInformation($order_number: String) {
        OrderPaymentInformation(input: {order_id : $order_number}){
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

export const getPaymentBankList = gql`
    query {
      getPaymentBankList{
        bankname
        banknumber
        placeholder
      }
    }
`;

export const getSeller = gql`
    query getSeller($sellerId: [Int!]) {
        getSeller(input: { seller_id: $sellerId }) {
            id
            name
            city
        }
    }
`;

export const getCustomerOrder = gql`
    query getCustomerOrder($order_number: String!) {
        customer {
            orders(filters: {
                ids: {
                    eq: $order_number
                }
            }) {
                items {
                    id
                    detail {
                        tax_amount
                        payment {
                            shipping_amount
                            additional_information
                            payment_additional_info {
                                due_date
                                method_title
                                transaction_id
                                transaction_time
                                virtual_account
                            }
                            method
                        }
                        grand_total
                        total_qty_ordered
                        global_currency_code
                        discount_amount
                        coupon {
                            code
                            rule_name
                            is_use_coupon
                        }
                        items {
                            item_id
                            parent_item_id
                            sku
                            name
                            price
                            note
                            qty_ordered
                            row_weight
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
                            seller_id
                            seller_name
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getOrder,
    getPaymentBankList,
    getPaymentInformation,
    getSeller,
};
