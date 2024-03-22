import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setCheckoutData, setIsNewUpdate, setLoading,
} from '@core_modules/checkout/redux/checkoutSlice';

const GiftCard = (props) => {
    const {
        t,
        handleOpenMessage,
        formik,
        GiftCardView,
    } = props;

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const [applyGiftCardToCart] = gqlService.applyGiftCardToCart({ onError: () => { } });
    const [removeGiftCardFromCart] = gqlService.removeGiftCardFromCart({ onError: () => { } });
    let giftCards = [];
    let appliedGiftCards = [];
    if (checkout.data.cart) {
        if (modules.giftcard.useCommerceModule) {
            if (checkout.data.cart.applied_gift_cards && checkout.data.cart.applied_gift_cards.length > 0) {
                appliedGiftCards = checkout.data.cart.applied_gift_cards.map((item) => item.code);
            }
        } else if (checkout.data.cart.applied_giftcard
            && checkout.data.cart.applied_giftcard.giftcard_detail && checkout.data.cart.applied_giftcard.giftcard_detail.length > 0) {
            appliedGiftCards = checkout.data.cart.applied_giftcard.giftcard_detail.map((item) => item.giftcard_code);
        }
        if (!modules.giftcard.useCommerceModule) {
            if (checkout.data.customer) {
                giftCards = checkout.data.customer.gift_card.filter((item) => !appliedGiftCards.includes(item.giftcard_code));
            }
        }
    }

    const handleApplyGift = async (code = null) => {
        dispatch(setLoading({
            order: true,
            giftCard: true,
            payment: true,
        }));
        dispatch(setIsNewUpdate(true));

        const cartId = checkout.data.cart.id;
        const finalCode = code || formik.values.giftCard;

        const result = await applyGiftCardToCart({
            variables: {
                cartId,
                code: finalCode,
            },
        });

        if (result && result.data && result.data?.applyGiftCardToCart?.cart) {
            const updatedCart = {
                ...checkout.data.cart,
                ...result.data.applyGiftCardToCart.cart,
            };
            dispatch(setCheckoutData({
                cart: updatedCart,
            }));
            formik.setFieldValue('giftCard', '');
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardApplied'),
            });
        } else {
            formik.setFieldError('giftCard', t('checkout:message:giftCardError'));
        }

        dispatch(setLoading({
            order: false,
            giftCard: false,
            payment: false,
        }));
    };

    const handleRemoveGift = async (code) => {
        dispatch(setLoading({
            order: true,
            giftCard: true,
            payment: true,
        }));
        dispatch(setIsNewUpdate(true));

        const cartId = checkout.data.cart.id;
        const result = await removeGiftCardFromCart({
            variables: {
                cartId,
                code,
            },
        });

        if (result && result.data) {
            const updatedCart = {
                ...checkout.data.cart,
                ...result.data.removeGiftCardFromCart.cart,
            };

            dispatch(setCheckoutData({
                cart: updatedCart,
            }));
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardRemoved'),
            });
        }

        dispatch(setLoading({
            order: false,
            giftCard: false,
            payment: false,
        }));
    };

    if (modules.giftcard.enabled) {
        return (
            <GiftCardView
                handleRemoveGift={handleRemoveGift}
                handleApplyGift={handleApplyGift}
                giftCards={giftCards}
                formik={formik}
                appliedGiftCards={appliedGiftCards}
                checkout={checkout}
                t={t}
            />
        );
    }

    return null;
};

export default GiftCard;
