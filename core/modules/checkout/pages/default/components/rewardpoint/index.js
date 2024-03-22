/* eslint-disable no-unused-vars */
import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';

import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setCheckoutData, setIsNewUpdate,
} from '@core_modules/checkout/redux/checkoutSlice';

const RewardPoint = ({
    t, handleOpenMessage, formik, RewardPointView, storeConfig, currencyCache,
}) => {
    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const [loading, setLoading] = React.useState(false);

    const [removeRewardPointsFromCart, applRewardPoint] = gqlService.removeRewardPointsFromCart({
        onError: (e) => {
            const message = e.message.split(':');
            handleOpenMessage({
                variant: 'error',
                text: message[1] ? message[1] : e.message,
            });
        },
    });

    const [applyRewardPointsToCart, removeRewardPoint] = gqlService.applyRewardPointsToCart({
        onError: (e) => {
            const message = e.message.split(':');
            handleOpenMessage({
                variant: 'error',
                text: message[1] ? message[1] : e.message,
            });
        },
    });

    let reward_point = {};
    let total = 0;
    if (checkout.data.customer && checkout.data.cart) {
        reward_point = checkout.data.cart.applied_reward_points;
        total = checkout.data.cart.prices.grand_total.value;
    }

    const handleUsePoint = async () => {
        let cart;
        const { id } = checkout.data.cart;
        setLoading(true);
        if (reward_point.is_use_reward_points) {
            const result = await removeRewardPointsFromCart({ variables: { cartId: checkout.data.cart.id, coupon: formik.values.coupon } });
            cart = result && {
                ...checkout.data.cart,
                ...result.data.removeRewardPointsFromCart.cart,
            };
            if (result) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:rewardPointsRemoved'),
                });
            }
        } else {
            const result = await applyRewardPointsToCart({ variables: { cartId: id } });
            cart = result && {
                ...checkout.data.cart,
                ...result.data.applyRewardPointsToCart.cart,
            };
            if (result) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:rewardPointsApplied'),
                });
            }
        }
        if (cart) {
            dispatch(setCheckoutData({
                cart,
            }));
        }
        dispatch(setIsNewUpdate(true));
        setLoading(false);
    };
    if (modules.rewardpoint.enabled && checkout.data.cart && checkout.data.customer) {
        return (
            <RewardPointView
                checkout={checkout}
                t={t}
                handleUsePoint={handleUsePoint}
                loading={loading}
                reward_point={reward_point}
                total={total}
                storeConfig={storeConfig}
                currencyCache={currencyCache}
            />
        );
    }

    return null;
};

export default RewardPoint;
