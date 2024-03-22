/* eslint-disable semi-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React from 'react';

import Button from '@common_button';
import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import commonConfig, { basePath } from '@config';
import FieldPoint from '@core_modules/checkout/components/fieldcode';
import RadioItem from '@core_modules/checkout/components/radioitem';
import ModalHowtoPay from '@core_modules/checkout/pages/default/components/ModalHowtoPay';
import StripeCheckoutForm from '@core_modules/checkout/pages/default/components/payment/components/StripeCheckoutForm';
import Skeleton from '@common_skeleton';
import classNames from 'classnames';
import Accordion from '@common_acccordion';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useSelector } from 'react-redux';
import {
    selectCheckoutState,
} from '@core_modules/checkout/redux/checkoutSlice';

const PO = 'purchaseorder';
const PaypalCode = 'paypal_express';
const stripePayments = 'stripe_payments';

/**
 * Loader
 * @returns {COMPONENT}
 */
const Loader = () => (
    <>
        <Skeleton className="rounded-[50%] mb-[10px]" width="100%" height={20} />
        <Skeleton className="rounded-[50%] mb-[10px]" width="100%" height={20} />
        <Skeleton className="rounded-[50%] mb-[10px]" width="100%" height={20} />
    </>
);

const PaymentGroupIcon = (props) => {
    const { baseMediaUrl, src } = props;
    const fallbacks = [`${baseMediaUrl}checkout/payment/paymenticons-${src.replace('pg-', '')}.svg`, null];

    // check if image exist on the backoffice, otherwise use fallback image from PWA
    const [imageSrc, setImageSrc] = React.useState(`${basePath}/assets/img/paymenticons-${src.replace('pg-', '')}.svg`);
    const [fallbackImageIndex, setFallbackImageIndex] = React.useState(0);

    // set image fallback url
    const getFallbackImageSrc = () => {
        if (fallbackImageIndex > fallbacks.length) {
            return;
        }
        setImageSrc(fallbacks[fallbackImageIndex]);
        setFallbackImageIndex(fallbackImageIndex + 1);
    };

    return (
        <>
            {(imageSrc && (
                <img
                    className="w-11 h-11 mr-3"
                    src={imageSrc}
                    alt={src.replace('pg-', '')}
                    onError={() => getFallbackImageSrc()}
                />
            ))
                || ''}
        </>
    );
};

/**
 * [VIEW] Payment
 * @param {object} props
 * @returns
 */
const PaymentView = (props) => {
    const {
        loading,
        data,
        clientSecret,
        t,
        paymentMethodList,
        handlePayment,
        handlePurchaseOrder,
        handlePurchaseOrderSubmit,
        selected,
        paypalTokenData,
        paypalHandlingProps,
        initialOptionPaypal,
        storeConfig,
        displayHowToPay,
        setDisplayHowToPay,
    } = props;

    const checkout = useSelector(selectCheckoutState);

    const { modules } = commonConfig;
    const [expanded, setExpanded] = React.useState(null);
    const [openModal, setModal] = React.useState(false);
    const [stripePromise, setStripePromise] = React.useState(null);

    React.useEffect(() => {
        if (storeConfig && storeConfig.stripe_config && storeConfig.stripe_config.stripe_enable
            && storeConfig.stripe_config.test_pk && storeConfig.stripe_config.stripe_mode === 'test') {
            const key = storeConfig.stripe_config.test_pk;
            setStripePromise(loadStripe(key));
        } else if (storeConfig && storeConfig.stripe_config && storeConfig.stripe_config.stripe_enable
            && storeConfig.stripe_config.live_pk && storeConfig.stripe_config.stripe_mode === 'live') {
            const key = storeConfig.stripe_config.live_pk;
            setStripePromise(loadStripe(key));
        }
    }, []);

    let content;

    /**
     * [METHOD] handle modal
     * @param {*} state
     */
    const handleModal = (state = false) => {
        setModal(state);
    };

    /**
     * [MAIN] return of view
     */
    if (loading.payment || loading.all) {
        content = <Loader />;
    } else if (data.cart.prices.grand_total.value === 0) {
        content = <Typography>{t('checkout:noNeedPayment')}</Typography>;
    } else if (data.paymentMethod.length !== 0 && paymentMethodList && paymentMethodList.storeConfig) {
        let paymentConfig = JSON.parse(`${paymentMethodList.storeConfig.payments_configuration}`);
        const groups = paymentConfig ? Object.keys(paymentConfig) : [];
        // create grouping by config
        paymentConfig = groups.map((key) => {
            const groupData = [];
            let config = paymentConfig[key];
            config = config.split(',');
            for (let idx = 0; idx < data.paymentMethod.length; idx++) {
                const element = data.paymentMethod[idx];
                for (let idc = 0; idc < config.length; idc++) {
                    if (config[idc] === element.code) {
                        groupData.push(element);
                    }
                }
            }
            let active = false;
            if (groupData.length > 0) {
                // ad active key if on group data selected payment method
                if (selected.payment) {
                    for (let idx = 0; idx < groupData.length; idx += 1) {
                        const element = groupData[idx];
                        if (element.code === selected.payment) {
                            active = true;
                        }
                    }
                }
            }
            return {
                group: key,
                data: groupData,
                active,
            };
        });

        // check if have active on group data by default selected if
        let itemActive = false;
        if (paymentConfig) {
            for (let idx = 0; idx < paymentConfig.length; idx += 1) {
                const element = paymentConfig[idx];
                if (element.active) {
                    itemActive = true;
                }
            }
        }
        content = (
            <div>
                <Typography>{t('checkout:paymentSubtitle')}</Typography>
                {paymentConfig && (
                    <div className="mt-4">
                        {paymentConfig.map((item, index) => {
                            if (item.data.length !== 0) {
                                const open = expanded === index || (expanded === null && item.active)
                                || (!itemActive && expanded === null && index === 0);
                                return (
                                    <Accordion
                                        key={index}
                                        open={open}
                                        handleOpen={() => setExpanded(index)}
                                        handleClose={() => setExpanded(null)}
                                        label={(
                                            <div className="flex flex-row items-center px-2">
                                                <PaymentGroupIcon src={item.group} baseMediaUrl={storeConfig.base_media_url} />
                                                <Typography className="uppercase" variant="bd-2" type="bold">
                                                    {t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)
                                                        === `paymentGrouping.${item.group.replace('pg-', '')}`
                                                        ? item.group.replace('pg-', '')
                                                        : t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)}
                                                </Typography>
                                            </div>
                                        )}
                                        classSummary={classNames(
                                            'border-x h-[55px] border-neutral-200',
                                            'pl-2 pr-4',
                                            index === 0 ? 'rounded-t-lg border-t' : '',
                                            open ? 'border-b' : '',
                                            index === paymentConfig.length - 1 ? 'rounded-b-lg border-y' : '',
                                            (index > 0 && index < paymentConfig.length - 0) ? 'border-t' : '',
                                            (open && index === paymentConfig.length - 1) ? 'rounded-b-none' : '',
                                        )}
                                        classIcon="w-3 h-3"
                                        classContent={classNames(
                                            'border-x border-neutral-200 !mt-0',
                                            (open && index === paymentConfig.length - 1) ? 'border-b rounded-b-lg' : '',
                                        )}
                                    >
                                        <div className="flex flex-col p-4">
                                            <Radio
                                                key={`${index}-${item.group}`}
                                                value={selected.payment}
                                                onChange={handlePayment}
                                                data={item.data}
                                                CustomItem={RadioItem}
                                                ComponentOptional={(item) => {
                                                    // prettier-ignore
                                                    const isPurchaseOrder = item.code === PO && selected.payment === PO;
                                                    const isPaypal = item.code === PaypalCode && selected.payment === PaypalCode;
                                                    const isStripe = item.code === stripePayments && selected.payment === stripePayments;
                                                    // eslint-disable-next-line max-len

                                                    if (isPurchaseOrder) {
                                                        return (
                                                            <FieldPoint
                                                                id="purchase-order"
                                                                name="purchase-order"
                                                                placeholder={t('checkout:purchaseOrderNumber')}
                                                                action={handlePurchaseOrderSubmit}
                                                                onChange={handlePurchaseOrder}
                                                                value={checkout.selected.purchaseOrderNumber || ''}
                                                                disabled={checkout.loading.purchaseOrderNumber}
                                                                loading={checkout.loading.purchaseOrderNumber}
                                                                styleFrame={{ marginTop: 0, marginBottom: 0 }}
                                                                styleFrameText={{ marginTop: 0, marginBottom: 0 }}
                                                                styleTextField={{ marginTop: 0, marginBottom: 0 }}
                                                            />
                                                        );
                                                    }
                                                    if (
                                                        isPaypal
                                                                    && !paypalTokenData.loading
                                                                    && initialOptionPaypal['data-order-id'] !== ''
                                                    ) {
                                                        return (
                                                            <PayPalScriptProvider defer options={initialOptionPaypal}>
                                                                <PayPalButtons
                                                                    style={{ layout: 'horizontal' }}
                                                                    {...paypalHandlingProps}
                                                                />
                                                            </PayPalScriptProvider>
                                                        );
                                                    }
                                                    if (isStripe
                                                                    && storeConfig
                                                                    && storeConfig.stripe_config
                                                                    && storeConfig.stripe_config.stripe_enable
                                                                    && (storeConfig.stripe_config.live_pk || storeConfig.stripe_config.test_pk)
                                                    ) {
                                                        return (
                                                            <>
                                                                {stripePromise && clientSecret && (
                                                                    <Elements
                                                                        stripe={stripePromise}
                                                                        options={{ clientSecret }}
                                                                    >
                                                                        <StripeCheckoutForm {...props} />
                                                                    </Elements>
                                                                )}
                                                            </>
                                                        );
                                                    }

                                                    return null;
                                                }}
                                                propsItem={{
                                                    borderBottom: false,
                                                    classContent: '',
                                                    RightComponent: true,
                                                }}
                                                className="!mb-0"
                                                classNames={{
                                                    radioGroupClasses: '!gap-2',
                                                }}
                                                size="sm"
                                                disabled={loading.order || loading.all}
                                            />
                                        </div>
                                    </Accordion>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    } else if (checkout.selected.delivery === 'pickup') {
        content = <Typography>{t('checkout:noPaymentPickup')}</Typography>;
    } else {
        content = <Typography>{t('checkout:noPayment')}</Typography>;
    }

    return (
        <div
            id="checkoutPayment"
            className={classNames(
                'flex flex-col border-b border-b-neutral-200',
                'w-full py-6 gap-4',
            )}
        >
            <ModalHowtoPay
                open={openModal}
                setOpen={() => handleModal(false)}
                setDisplayHowToPay={setDisplayHowToPay}
            />
            <div className="flex flex-row justify-between items-start">
                <Typography variant="h2" className="uppercase">
                    {t('checkout:payment')}
                </Typography>
                {(modules.checkout.howtoPay.enabled && displayHowToPay) ? (
                    <div>
                        <Button
                            className="px-2 py-2 swift-action-howtopay"
                            onClick={() => handleModal(true)}
                            disabled={loading.order || loading.all}
                        >
                            {t('checkout:howtoPay')}
                        </Button>
                    </div>
                ) : null}
            </div>
            <div>{content}</div>
        </div>
    );
};

export default PaymentView;
