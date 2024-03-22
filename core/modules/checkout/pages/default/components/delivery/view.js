/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import cx from 'classnames';
import { modules } from '@config';
import { useSelector } from 'react-redux';
import {
    selectCheckoutState,
} from '@core_modules/checkout/redux/checkoutSlice';

const ShippingView = (props) => {
    const {
        handleSelect, t,
    } = props;
    const checkout = useSelector(selectCheckoutState);

    const checkStyles = (delivery) => ((checkout.selected.delivery === delivery)
        ? cx(
            'p-4 border border-neutral-200 rounded-xl flex flex-row items-center cursor-pointer',
            'border-primary',
            `swift-${delivery}Delivery`,
        )
        : cx(
            'p-4 border border-neutral-200 rounded-xl flex flex-row items-center cursor-pointer',
            `swift-${delivery}Delivery`,
        ));
    const checkActiveColor = (delivery) => (((checkout.selected.delivery === delivery))
        ? 'text-primary'
        : 'text-pwa-font');

    return (
        <div
            id="swift-checkoutDeliveryMethod"
            className={cx(
                'flex flex-col border-b border-b-neutral-200',
                'w-full pb-6 gap-4',
            )}
        >
            <Typography variant="h2" type="bold" className="uppercase">
                {t('checkout:deliveryMethod:label')}
            </Typography>
            <div className="flex flex-row gap-4">
                <div className="xs:basis-6/12">
                    <div className={checkStyles('home')} onClick={() => handleSelect('home')}>
                        <div className="flex flex-col gap-1">
                            <Typography color={checkActiveColor('home')} variant="bd-2" type="bold">
                                {t('checkout:deliveryMethod:homeDelivery')}
                            </Typography>
                            <Typography variant="bd-2b" className="hidden tablet:block">
                                {t('checkout:deliveryMethod:homeDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </div>
                {modules.checkout.pickupStore.enabled && (
                    <div className="xs:basis-6/12">
                        <div className={checkStyles('pickup')} onClick={() => handleSelect('pickup')}>
                            <div className="flex flex-col">
                                <Typography color={checkActiveColor('pickup')} variant="bd-2" type="bold">
                                    {t('checkout:deliveryMethod:pickupDelivery')}
                                </Typography>
                                <Typography variant="bd-2b" className="hidden tablet:block">
                                    {t('checkout:deliveryMethod:pickupDeliveryDesc')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
                {modules.checkout.inStorePickup.enabled && (
                    <div className="xs:basis-6/12">
                        <div className={checkStyles('instore')} onClick={() => handleSelect('instore')}>
                            <div className="flex flex-col">
                                <Typography color={checkActiveColor('instore')} variant="bd-2" type="bold">
                                    {t('checkout:deliveryMethod:instorePickup')}
                                </Typography>
                                <Typography variant="bd-2b" className="hidden tablet:block">
                                    {t('checkout:deliveryMethod:instorePickupDesc')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShippingView;
