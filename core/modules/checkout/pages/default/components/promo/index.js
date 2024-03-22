import PromoView from '@core_modules/checkout/components/fieldcode';
import gqlService from '@core_modules/checkout/services/graphql';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setIsNewUpdate, setLoading, setCheckoutData, setRefetchItemOnly,
} from '@core_modules/checkout/redux/checkoutSlice';

const DiscountSection = (props) => {
    const {
        t,
        handleOpenMessage,
        formik,
        refetchItemCart,
    } = props;
    const [applyCouponTocart] = gqlService.applyCouponToCart({ onError: () => { } });
    const [removeCouponFromCart] = gqlService.removeCouponFromCart({ onError: () => { } });

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const handlePromo = async () => {
        let cart;

        dispatch(setLoading({
            all: false,
            shipping: false,
            payment: true,
            extraFee: false,
            order: true,
            coupon: true,
        }));

        dispatch(setIsNewUpdate(true));

        const isApplied = !checkout.data.isCouponAppliedToCart;

        let cartId = '';
        if (checkout && checkout.data && checkout.data.cart && checkout.data.cart.id) {
            cartId = checkout.data.cart.id;
        }

        if (isApplied) {
            const result = await applyCouponTocart({ variables: { cartId, coupon: formik.values.coupon } });
            if (result && result.data && result.data.applyCouponToCart && result.data.applyCouponToCart.cart) {
                cart = {
                    ...checkout.data.cart,
                    ...result.data.applyCouponToCart.cart,
                };
            }
            if (cart) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponApplied'),
                });
            }
        } else {
            const result = await removeCouponFromCart({ variables: { cartId } });
            if (result && result.data && result.data.removeCouponFromCart && result.data.removeCouponFromCart.cart) {
                cart = result && {
                    ...checkout.data.cart,
                    ...result.data.removeCouponFromCart.cart,
                };
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponRemoved'),
                });
            }
        }

        dispatch(setLoading({ coupon: false }));

        if (cart) {
            dispatch(setCheckoutData({
                cart,
                sCouponAppliedToCart: !checkout.data.isCouponAppliedToCart,
            }));
        } else {
            await formik.setFieldError('coupon', t('checkout:message:couponError'));
        }
        dispatch(setRefetchItemOnly(true));
        dispatch(setLoading({
            all: false,
            shipping: false,
            payment: false,
            extraFee: false,
            order: false,
        }));

        if (refetchItemCart && typeof refetchItemCart === 'function') {
            dispatch(setLoading({
                payment: true,
                order: true,
                coupon: true,
                shipping: true,
            }));
            await refetchItemCart();
            dispatch(setLoading({
                all: false,
                shipping: false,
                payment: false,
                extraFee: false,
                order: false,
                coupon: false,
            }));
        }
    };

    return (
        <PromoView
            id="coupon"
            name="coupon"
            placeholder="Promo Code"
            action={handlePromo}
            onChange={formik.handleChange}
            value={formik.values.coupon}
            disabled={checkout.loading.coupon || !checkout.data.cart}
            toggleField={checkout.data.isCouponAppliedToCart}
            loading={checkout.loading.coupon}
            error={!!formik.errors.coupon}
            errorMessage={formik.errors.coupon}
        />
    );
};

export default DiscountSection;
