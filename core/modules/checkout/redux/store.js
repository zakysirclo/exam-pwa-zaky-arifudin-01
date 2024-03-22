import { configureStore } from '@reduxjs/toolkit';
import { checkoutSlice } from '@core_modules/checkout/redux/checkoutSlice';

export const store = configureStore({
    reducer: {
        [checkoutSlice.name]: checkoutSlice.reducer,
    },
    devTools: true,
});

export default {
    store,
};
