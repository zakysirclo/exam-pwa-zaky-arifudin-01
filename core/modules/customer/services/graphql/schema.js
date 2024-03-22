/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';
import swiftConfig from '@config';

const { modules } = swiftConfig;

export const getRegion = gql`
    query getRegions($country_id: String!) {
        getRegions(country_id: $country_id) {
            item {
                code
                name
                region_id
            }
        }
    }
`;

export const getCmsBlocks = gql`
    query ($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getCountries = gql`
    {
        countries {
            id
            full_name_locale
            full_name_english
        }
    }
`;

export const getCityByRegionId = gql`
    query Cities($regionId: Int!) {
        getCityByRegionId(region_id: $regionId) {
            item {
                id
                city
                postcode
            }
        }
    }
`;

export const customerWishlist = gql`
    query customerWishlist($sharing_code: ID) {
        customerWishlist(sharing_code: $sharing_code) {
            items {
                added_at
                description
                id
                product {
                    id
                    name
                    url_key
                    sku
                    small_image {
                        url
                    }
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
                }
                qty
            }
            items_count
            name
            sharing_code
            updated_at
        }
    }
`;

export const shareWishlist = gql`
    mutation shareWishlist($emails: [ID]!, $message: String) {
        shareWishlist(input: { emails: $emails, message: $message })
    }
`;

// schema settingsPage

export const updateCustomer = gql`
    mutation updateCustomerSetting($isSubscribed: Boolean!) {
        updateCustomer(input: { is_subscribed: $isSubscribed }) {
            customer {
                is_subscribed
            }
        }
    }
`;

export const getCustomerSettings = gql`
    {
        customer {
            firstname
            lastname
            email
            is_subscribed
        }
    }
`;

const productDetail = () => `
    id
    name
    sku
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url
    }
    image{
      url
    }
    review {
      rating_summary
      reviews_count
    }
    special_from_date
    special_to_date
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

export const getCustomer = (config = {}) => gql`
{
    customer {
      id
      firstname
      lastname
      email
      is_subscribed
      phonenumber
      whatsapp_number
      addresses {
        id
        city
        default_billing
        default_shipping
        extension_attributes {
            attribute_code
            value
        }
        firstname
        lastname
        postcode
        country_code
        country {
          code
          label
        }
        region {
            region
            region_code
        }
        street
        telephone
        latitude
        longitude
    }
     wishlist {
      id
      items {
        id
        product {
          ${productDetail(config)}
          ${priceRange}
          ${priceTiers}
        }
      }
    }
    }
  }
`;

export const getCustomerAddress = gql`
    {
        customer {
            id
            firstname
            lastname
            email
            is_subscribed
            phonenumber
            whatsapp_number
            addresses {
                id
                city
                default_billing
                default_shipping
                extension_attributes {
                    attribute_code
                    value
                }
                firstname
                lastname
                postcode
                country_code
                country {
                    code
                    label
                }
                region {
                    region
                    region_code
                }
                street
                telephone
                latitude
                longitude
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

export const customerNotificationList = gql`
    query customerNotificationList {
        customerNotificationList {
            totalUnread
            items {
                content
                createdAt
                entityId
                subject
                unread
            }
        }
    }
`;

export const getGiftCard = gql`
    {
        customer {
            gift_card {
                giftcard_code
                giftcard_balance
            }
        }
    }
`;

export const checkBalance = gql`
    query checkBalance($gift_card_code: String!) {
        giftCardAccount(input: { gift_card_code: $gift_card_code }) {
            code
            balance
            initial_balance
            expiration_date
        }
    }
`;

export const updatedDefaultAddress = gql`
    mutation updatedDefaultAddress($addressId: Int!, $street: String!) {
        updateCustomerAddress(id: $addressId, input: { default_billing: true, default_shipping: true, street: [$street] }) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const updateCustomerAddress = gql`
    mutation updateCustomerAddress(
        $city: String!
        $countryCode: CountryCodeEnum!
        $defaultBilling: Boolean!
        $defaultShipping: Boolean!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $addressId: Int!
        $region: String!
        $regionCode: String
        $regionId: Int
        $longitude: String
        $latitude: String
    ) {
        updateCustomerAddress(
            id: $addressId
            input: {
                city: $city
                country_code: $countryCode
                country_id: $countryCode
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
                firstname: $firstname
                lastname: $lastname
                postcode: $postcode
                street: [$street]
                telephone: $telephone
                region: { region: $region, region_code: $regionCode, region_id: $regionId }
                longitude: $longitude
                latitude: $latitude
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const createCustomerAddress = gql`
    mutation createCustomerAddress(
        $city: String!
        $countryCode: CountryCodeEnum!
        $defaultBilling: Boolean!
        $defaultShipping: Boolean!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
        $regionCode: String
        $regionId: Int
        $longitude: String
        $latitude: String
    ) {
        createCustomerAddress(
            input: {
                city: $city
                country_code: $countryCode
                country_id: $countryCode
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
                firstname: $firstname
                lastname: $lastname
                postcode: $postcode
                street: [$street]
                telephone: $telephone
                region: { region: $region, region_code: $regionCode, region_id: $regionId }
                longitude: $longitude
                latitude: $latitude
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const updateCustomerProfile = gql`
    mutation updateCustomer(
        $firstname: String!
        $lastname: String!
        $email: String!
        $password: String!
        $whatsapp_number: String
        $phonenumber: String
    ) {
        updateCustomerCustom(
            input: {
                firstname: $firstname
                lastname: $lastname
                email: $email
                password: $password
                whatsapp_number: $whatsapp_number
                phonenumber: $phonenumber
            }
        ) {
            customer {
                id
                firstname
                lastname
                email
                phonenumber
                is_phonenumber_valid
                customer_group
            }
        }
    }
`;

export const changeCustomerPassword = gql`
    mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
        changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            firstname
            lastname
            email
        }
    }
`;

export const addSimpleProductsToCart = gql`
    mutation addSimpleProductsToCart($cartId: String!, $qty: Float!, $sku: String!) {
        addSimpleProductsToCart(input: { cart_id: $cartId, cart_items: { data: { quantity: $qty, sku: $sku } } }) {
            cart {
                id
                total_quantity
            }
        }
    }
`;

export const removeWishlist = gql`
    mutation removeWishlist($wishlistItemId: Int!) {
        removeItemWishlist(wishlistItemId: $wishlistItemId) {
            info
        }
    }
`;

export const removeAddress = gql`
    mutation deleteCustomerAddress($id: Int!) {
        deleteCustomerAddress(id: $id)
    }
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const setNewPassword = gql`
    mutation ($password: String!, $confirmPassword: String!, $token: String!) {
        setNewPassword(input: { password: $password, password_confirmation: $confirmPassword, token: $token }) {
            info
        }
    }
`;

export const getCustomerOrder = gql`
  {
    customerOrders(pageSize: 5) {
      items {
        id
        grand_total
        order_number
        status
        status_label
        created_at
        detail {
          global_currency_code
          shipping_address {
            firstname
            lastname
          }
          billing_address {
            firstname
            lastname
          }
          grand_total
          ${
    modules.rma.enabled
        ? `aw_rma {
                        status
                    } `
        : ''
} 
        }
      }
    }
  }
`;

export const subscribeNewsletter = gql`
    mutation updateCustomer($email: String!) {
        subscribe(input: { email: $email }) {
            status {
                code
                message
                response
            }
        }
    }
`;

export const reOrder = gql`
    mutation reOrder($order_id: String!) {
        reorder(input: { order_id: $order_id }) {
            cart_id
        }
    }
`;

// CHAT RELATED SCHEMA

export const getSessionMessageListSchema = gql`
    query getSessionList($customer_email: String) {
        getSessionMessageList(customer_email: $customer_email, pageSize: 1000, currentPage: 1) {
            answered
            # chat_session_id
            chat_id
            created_at
            customer_email
            customer_id
            customer_name
            ip_address
            is_read
            agent_code
            updated_at
            last_message {
                time
                message
            }
        }
    }
`;

export const getMessageListSchema = gql`
    query getMessageList($chat_session_id: Int!) {
        getMessageList(chat_session_id: $chat_session_id, pageSize: 1000, currentPage: 1) {
            # chat_session_id
            chat_id
            customer_email
            customer_id
            customer_name
            messages {
                body_message
                # chat_message_id
                message_id
                created_at
                is_robot
                question_id
                updated_at
                sender
                is_read
                is_read_customer
                filename
                filetype
            }
            agent_code
        }
    }
`;

export const addMessageSchema = gql`
    mutation sendMessage(
        $body_message: String!
        $chat_session_id: Int!
        $customer_email: String!
        $customer_id: Int
        $customer_name: String!
        $is_robot: Int!
        $agent_code: String!
        $sender: Int!
        $file: String
        $response_question_id: Int
    ) {
        addMessage(
            input: {
                body_message: $body_message
                chat_session_id: $chat_session_id
                customer_email: $customer_email
                customer_id: $customer_id
                customer_name: $customer_name
                is_robot: $is_robot
                agent_code: $agent_code
                sender: $sender
                file: $file
                response_question_id: $response_question_id
            }
        ) {
            body_message
            chat_message_id
            chat_session_id
            created_at
            customer_email
            customer_id
            customer_name
            is_robot
            product_id
            agent_code
            updated_at
            auto_response {
                agent_code
                auto_response_text
                message
                question_id
                answer {
                    message
                    answer_id
                    question_id
                    response_question_id
                }
            }
        }
    }
`;

export const createFirebaseDocSchema = gql`
    mutation createFirebaseDoc($agent_code: String!, $agent_name: String!, $customer_email: String!, $customer_name: String!, $phone_number: String) {
        createFirebaseDocument(
            input: {
                agent_code: $agent_code
                agent_name: $agent_name
                customer_email: $customer_email
                customer_name: $customer_name
                phone_number: $phone_number
            }
        ) {
            status
        }
    }
`;

export const getBlacklistSchema = gql`
    query getBlacklist($email: String!) {
        getBlacklist(email: $email) {
            status
        }
    }
`;

// END CHAT RELATED SCHEMA
