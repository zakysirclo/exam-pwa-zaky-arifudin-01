import Typography from '@common_typography';
import Chip from '@core_modules/checkout/pages/default/components/giftcard/Chip';
import FieldPoint from '@core_modules/checkout/components/fieldcode';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
    selectCheckoutState,
} from '@core_modules/checkout/redux/checkoutSlice';

const GiftCardView = (props) => {
    const {
        handleApplyGift, handleRemoveGift, formik, appliedGiftCards, giftCards, t,
    } = props;
    const checkout = useSelector(selectCheckoutState);
    return (
        <>
            <FieldPoint
                id="giftCard"
                name="giftCard"
                placeholder={t('checkout:giftCard:placeholderField')}
                action={() => {
                    handleApplyGift();
                }}
                onChange={formik.handleChange}
                value={formik.values.giftCard}
                disabled={checkout.loading.giftCard || !checkout.data.cart}
                error={!!formik.errors.giftCard}
                errorMessage={formik.errors.giftCard}
                loading={checkout.loading.giftCard}
            />
            {appliedGiftCards.length || giftCards.length ? (
                <div
                    id="checkoutGiftCard"
                    className={classNames(
                        'flex flex-col border-b border-b-neutral-200',
                        'w-full py-6 gap-4',
                    )}
                >
                    {giftCards.length === 0 ? null : (
                        <div className="flex flex-col gap-3">
                            <Typography letter="capitalize">
                                {t('checkout:giftCard:yourGiftCard')}
                            </Typography>
                            <div className="flex flex-row flex-wrap gap-2">
                                {giftCards.map((item, index) => (
                                    <Chip
                                        disabled={checkout.loading.giftCard}
                                        key={index}
                                        size="small"
                                        label={item.giftcard_code}
                                        onClick={() => {
                                            handleApplyGift(item.giftcard_code);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {appliedGiftCards.length === 0 ? null : (
                        <div className="flex flex-col gap-3">
                            <Typography letter="capitalize">
                                {t('checkout:giftCard:appliedGiftCard')}
                            </Typography>
                            <div className="flex flex-row flex-wrap gap-2">
                                {appliedGiftCards.map((item, index) => (
                                    <Chip
                                        disabled={checkout.loading.giftCard}
                                        active
                                        color="primary"
                                        key={index}
                                        size="small"
                                        label={item}
                                        onDelete={() => {
                                            handleRemoveGift(item);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default GiftCardView;
