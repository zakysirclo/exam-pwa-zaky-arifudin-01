/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    order_id: '',
    newupdate: false,
    refetchItemOnly: false,
    data: {
        errorItems: false,
        cart: null,
        customer: null,
        shippingMethods: [],
        paymentMethod: [],
        isGuest: false,
        isCouponAppliedToCart: false,
        order_comment: null,
        rewardPoints: {},
        credit: 0,
        message: {
            open: false,
            text: 'default',
            variant: '',
        },
        defaultAddress: null,
        summary: {
            prices: null,
            items: null,
            shipping_addresses: null,
        },
        seller: [],
    },
    selected: {
        address: null,
        shipping: {
            name: { carrier_code: null, method_code: null },
            price: null,
            original_price: null,
        },
        payment: null,
        purchaseOrderNumber: null,
        billing: null,
        delivery: 'home',
    },
    loading: {
        all: true,
        addresses: false,
        shipping: false,
        payment: false,
        purchaseOrderNumber: false,
        billing: false,
        order: false,
        coupon: false,
        storeCredit: false,
        giftCard: false,
        extraFee: false,
        paypal: false,
        confirmation: false,
        totalPrice: false,
    },
    status: {
        addresses: false,
        openAddressDialog: false,
        backdrop: false,
        purchaseOrderApply: false,
    },
    pickupInformation: {},
    selectStore: {},
    pickup_location_code: null,
    error: {
        pickupInformation: false,
        selectStore: false,
        shippingAddress: false,
    },
    disabled: {
        address: false,
    },
    confirmation: false,
};

// Actual Slice
export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
    // Action to set the authentication status
        setLoading(state, action) {
            state.loading = {
                ...state.loading,
                ...action.payload,
            };
        },
        setSelectedData(state, action) {
            state.selected = {
                ...state.selected,
                ...action.payload,
            };
        },
        setErrorState(state, action) {
            state.error = {
                ...state.error,
                ...action.payload,
            };
        },
        setCheckoutData(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
                // cart: {
                //     ...(state.data.cart || {}),
                //     ...(action.payload.cart || {}),
                // },
            };
        },
        setPickupLocationCode(state, action) {
            state.pickup_location_code = action.payload;
        },
        setPickupInformation(state, action) {
            state.pickupInformation = {
                ...state.pickupInformation,
                ...action.payload,
            };
        },
        setRefetchItemOnly(state, action) {
            state.refetchItemOnly = action.payload;
        },
        setOrderId(state, action) {
            state.order_id = action.payload;
        },
        setIsNewUpdate(state, action) {
            state.newupdate = action.payload;
        },
        setStatusState(state, action) {
            state.status = {
                ...state.status,
                ...action.payload,
            };
        },
        setConfirmation(state, action) {
            state.confirmation = action.payload;
        },
        setSelectedStore(state, action) {
            state.selectStore = action.payload;
        },
        setPinckupInformation(state, action) {
            state.pickupInformation = action.payload;
        },
    },
});

export const {
    setLoading, setSelectedData, setErrorState, setCheckoutData, setPickupLocationCode,
    setPickupInformation, setRefetchItemOnly, setOrderId, setIsNewUpdate, setConfirmation,
    setSelectedStore, setPinckupInformation,
    setStatusState,
} = checkoutSlice.actions;

export const selectCheckoutState = (state) => state.checkout;

export default checkoutSlice.reducer;
