import { gql } from '@apollo/client';

export const register = gql`
    mutation register(
        $firstName: String!
        $lastName: String
        $email: String!
        $gender: Int
        $dob: String
        $password: String!
        $phoneNumber: String
        $subscribe: Boolean
        $otp: String
        $whatsappNumber: String
    ) {
        internalCreateCustomerToken(
            input: {
                firstname: $firstName
                lastname: $lastName
                email: $email
                gender: $gender
                date_of_birth: $dob
                password: $password
                phonenumber: $phoneNumber
                is_subscribed: $subscribe
                otp: $otp
                whatsapp_number: $whatsappNumber
            }
        ) {
            token
            is_email_confirmation
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
            phonenumber
            is_phonenumber_valid
            customer_group
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

export const mergeCart = gql`
    mutation mergeCart($sourceCartId: String!, $destionationCartId: String!) {
        mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destionationCartId) {
            id
            total_quantity
        }
    }
`;

export const otpConfig = gql`
    {
        otpConfig {
            otp_enable {
                enable_otp_register
            }
            otp_expired_time {
                expired_time_otp_register
            }
            otp_general_email_required
            otp_length {
                length_otp_register
            }
            otp_max_try {
                max_try_otp_register
            }
        }
    }
`;

export const getGuestCustomer = gql`
    query getGuestCustomer($ids: FilterEqualTypeInput) {
        ordersFilter(filters: { ids: $ids }) {
            data {
                detail {
                    customer_firstname
                    customer_lastname
                    customer_email
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

export default {
    register,
};
