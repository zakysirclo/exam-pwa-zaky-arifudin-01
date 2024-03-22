/* eslint-disable max-len */
import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import classNames from 'classnames';

const RewardPointView = (props) => {
    const {
        checkout, t, handleUsePoint, loading, reward_point, total, currencyCache,
    } = props;
    return (
        <div
            className={classNames(
                'border border-neutral-200 rounded-lg',
                'w-full max-w-[420px]',
                'flex flex-row items-center justify-between p-3',
            )}
            id="checkoutRewardPoint"
        >
            <div className="flex flex-col gap-2">
                <Typography variant="bd-2a" className="capitalize">
                    {checkout.data.cart.applied_reward_points.is_use_reward_points
                        ? `${t('checkout:myPoint:used')} 
                        ${checkout.data.cart.applied_reward_points.is_use_reward_points} 
                        ${t('checkout:myPoint:rewardPoints')}`
                        : t('checkout:myPoint:title')}
                </Typography>
                <Typography variant="bd-2" className="text-lg">
                    {checkout.data.cart.applied_reward_points.is_use_reward_points
                        ? formatPrice(
                            checkout.data.cart.applied_reward_points.reward_points_amount,
                            checkout.data.cart.prices.grand_total.currency,
                            currencyCache,
                        )
                        : `${
                            checkout.data.rewardPoints.balance
                                ? checkout.data.rewardPoints.balance.toLocaleString(undefined, { minimumFractionDigits: 0 })
                                : 0
                        }
                         (${formatPrice(checkout.data.rewardPoints.balanceCurrency, checkout.data.cart.prices.grand_total.currency, currencyCache)})`}
                </Typography>
            </div>
            <div>
                <Button
                    variant="outlined"
                    size="sm"
                    onClick={handleUsePoint}
                    disabled={loading || (!reward_point.is_use_reward_points && total === 0)}
                >
                    <Typography
                        variant="bd-3"
                        className="uppercase"
                        color={loading || (!reward_point.is_use_reward_points && total === 0) ? 'text-neutral-200' : 'text-neutral'}
                    >
                        {reward_point.is_use_reward_points ? t('checkout:myPoint:removeButton') : t('checkout:myPoint:button')}
                    </Typography>
                    {loading && <CircularProgress />}
                </Button>
            </div>
        </div>
    );
};

export default RewardPointView;
