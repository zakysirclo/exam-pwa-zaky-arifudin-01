import Dialog from '@common_dialog';
import Typography from '@common_typography';
import Address from '@core_modules/checkout/pages/default/components/address';
import Confirmation from '@core_modules/checkout/pages/default/components/Confirmation';
import Credit from '@core_modules/checkout/pages/default/components/credit';
import Delivery from '@core_modules/checkout/pages/default/components/delivery';
import Email from '@core_modules/checkout/pages/default/components/email';
import ExtraFee from '@core_modules/checkout/pages/default/components/ExtraFee';
import GiftCard from '@core_modules/checkout/pages/default/components/giftcard';
import InStorePickup from '@core_modules/checkout/pages/default/components/instorepickup';
import OrderComment from '@core_modules/checkout/pages/default/components/OrderComment';
import PaymentList from '@core_modules/checkout/pages/default/components/payment';
import PickupInfo from '@core_modules/checkout/pages/default/components/PickupInformation';
import Promo from '@core_modules/checkout/pages/default/components/promo';
import RewardPoint from '@core_modules/checkout/pages/default/components/rewardpoint';
import Shipping from '@core_modules/checkout/pages/default/components/shipping';
import Summary from '@core_modules/checkout/pages/default/components/summary';
import HeaderView from '@core_modules/checkout/pages/default/components/Header';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import PromoModalItemView from '@core_modules/checkout/pages/default/components/PromoModalItem/view';
import OrderCommentView from '@core_modules/checkout/pages/default/components/OrderComment/view';
import ConfirmationView from '@core_modules/checkout/pages/default/components/Confirmation/view';

import CashbackInfoView from '@core_modules/checkout/pages/default/components/CashbackInfo';
import EmailView from '@core_modules/checkout/pages/default/components/email/view';
import DeliveryView from '@core_modules/checkout/pages/default/components/delivery/view';
import DeliverySkeleton from '@core_modules/checkout/pages/default/components/delivery/skeleton';
import AddressView from '@core_modules/checkout/pages/default/components/address/view';
import ShippingView from '@core_modules/checkout/pages/default/components/shipping/view';
import PaymentView from '@core_modules/checkout/pages/default/components/payment/view';
import GiftCardView from '@core_modules/checkout/pages/default/components/giftcard/view';
import PromoView from '@core_modules/checkout/components/fieldcode';
import RewardPointView from '@core_modules/checkout/pages/default/components/rewardpoint/view';
import StoreCreditView from '@core_modules/checkout/pages/default/components/credit/view';
import ExtraFeeView from '@core_modules/checkout/pages/default/components/ExtraFee/view';
import Button from '@common/Button';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';

import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@core/helpers/env';

import { useSelector } from 'react-redux';
import { selectCheckoutState } from '@core_modules/checkout/redux/checkoutSlice';

const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const PromoModalItem = dynamic(() => import('@core_modules/checkout/pages/default/components/PromoModalItem'), { ssr: false });

const Content = (props) => {
    const {
        storeConfig,
        chasbackMessage,
        formik,
        t,
        setCheckout,
        isOnlyVirtualProductOnCart,
        handleOpenMessage,
        config,
        updateFormik,
        modules,
        manageCustomer,
        cartId,
        paypalTokenData,
        paypalHandlingProps,
        setInitialOptionPaypal,
        initialOptionPaypal,
        setTokenData,
        refetchDataCart,
        refetchItemCart,
        checkoutTokenState,
        setCheckoutTokenState,
        setLoadingSellerInfo,
        loadingSellerInfo,
        currencyCache,
    } = props;

    const checkout = useSelector(selectCheckoutState);

    const SummaryRef = React.createRef();
    const { order: loading, all: disabled } = checkout.loading;
    // prettier-ignore
    const stripeRef = React.useRef();
    const [clientSecret, setClientSecret] = React.useState(null);

    const [displayHowToPay, setDisplayHowToPay] = React.useState(false);
    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1' || storeConfig.enable_oms_multiseller === 1;

    const backToStore = () => {
        if (modules.checkout.checkoutOnly) {
            window.location.replace(getStoreHost(getAppEnv()));
        } else {
            Router.push('/');
        }
    };

    /**
     * [VIEW]
     */
    return (
        <div id="checkout" className="flex flex-col pb-8 desktop:py-0 desktop:px-8 relative">
            <div
                className={classNames(
                    'flex flex-row items-center justify-center relative',
                    'desktop:hidden w-full absolute top-0',
                    'shadow-lg bg-neutral-white z-scroll-to-top h-[45px] tablet:h-[50px]',
                )}
            >
                <Button variant="plain" onClick={backToStore} iconOnly icon={<ArrowLeftIcon />} className="absolute left-4 !p-0" />
                <Typography variant="h1" className="!text-base tablet:!text-lg uppercase">
                    Checkout
                </Typography>
            </div>
            <Typography variant="h1" className="hidden">
                {t('common:button:checkout')}
            </Typography>
            <div className="xs:basis-full center hidden desktop:inline">
                <HeaderView storeConfig={storeConfig} />
            </div>
            <Dialog
                open={checkoutTokenState}
                positiveAction={() => {
                    setCheckoutTokenState(!checkoutTokenState);
                    Router.reload();
                }}
                positiveLabel="Reload"
                negativeAction={() => {
                    setCheckoutTokenState(!checkoutTokenState);
                    Router.push('/checkout/cart');
                }}
                negativeLabel={t('checkout:error:backToStore')}
                variant="container"
                title={`${t('checkout:invalidTokenConfirmation')}`}
                content={(
                    <>
                        <Typography>{`${t('checkout:invalidToken')}`}</Typography>
                    </>
                )}
            />
            <div className="xs:basis-full sm:basis-full md:basis-full lg:basis-full center">
                {checkout
                && checkout.data
                && checkout.data.cart
                && checkout.data.cart?.promoBanner?.length
                && checkout.data.cart?.promoBanner?.length > 0
                    ? (<GimmickBanner data={checkout.data.cart.promoBanner || []} />
                    ) : null}
            </div>
            <div className="flex flex-col desktop:flex-row-reverse gap-6 tablet:gap-8 desktop:gap-10">
                <div className="summary-cart w-full desktop:max-w-[370px]">
                    <Summary
                        {...props}
                        loading={loading}
                        disabled={disabled}
                        checkout={checkout}
                        updateFormik={updateFormik}
                        setCheckout={setCheckout}
                        handleOpenMessage={handleOpenMessage}
                        formik={formik}
                        storeConfig={storeConfig}
                        refSummary={SummaryRef}
                        isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                        checkoutTokenState={checkoutTokenState}
                        setCheckoutTokenState={setCheckoutTokenState}
                        hideButton={false}
                    />
                </div>
                <div className="content-cart w-full h-full flex flex-col px-4 desktop:px-0">
                    <PromoModalItem
                        t={t}
                        storeConfig={storeConfig}
                        checkout={checkout}
                        setCheckout={setCheckout}
                        PromoModalItemView={PromoModalItemView}
                    />
                    {modules.checkout.cashback.enabled && checkout.data.cart && checkout.data.cart?.applied_cashback?.is_cashback ? (
                        <CashbackInfoView
                            message={chasbackMessage}
                            price={checkout.data.cart.applied_cashback.data[0].amount}
                            currency={storeConfig.base_currency_code}
                            promo_name={checkout.data.cart.applied_cashback.data[0].promo_name}
                        />
                    ) : null}

                    {/* {modules.checkout.inStorePickup.enabled && (
                    <div className="flex flex-row xs:basis-full">
                        <div className="xs:basis-6/12">
                            <Button onClick={() => setInStore(false)}>Shipping</Button>
                        </div>
                        <div className="xs:basis-6/12">
                            <Button onClick={() => setInStore(true)}>In Store Pickup</Button>
                        </div>
                    </div>
                )} */}

                    <>
                        {modules.checkout.pickupStore.enabled || modules.checkout.inStorePickup.enabled ? (
                            <Delivery
                                t={t}
                                DeliveryView={DeliveryView}
                                Skeleton={DeliverySkeleton}
                                formik={formik}
                                checkout={checkout}
                                setCheckout={setCheckout}
                                handleOpenMessage={handleOpenMessage}
                                storeConfig={storeConfig}
                                isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                                checkoutTokenState={checkoutTokenState}
                                setCheckoutTokenState={setCheckoutTokenState}
                            />
                        ) : null}

                        <Email
                            t={t}
                            formik={formik}
                            EmailView={EmailView}
                            checkout={checkout}
                            config={config}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            cartId={cartId}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                        />
                        {/* eslint-disable */}
                        {checkout.selected.delivery === 'home' ? (
                            <Address
                                checkout={checkout}
                                t={t}
                                setCheckout={setCheckout}
                                defaultAddress={checkout.data.defaultAddress}
                                updateFormik={updateFormik}
                                AddressView={AddressView}
                                manageCustomer={manageCustomer}
                                storeConfig={storeConfig}
                                formik={formik}
                                isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                                refetchDataCart={refetchDataCart}
                                refetchItemCart={refetchItemCart}
                                checkoutTokenState={checkoutTokenState}
                                setCheckoutTokenState={setCheckoutTokenState}
                                setLoadingSellerInfo={setLoadingSellerInfo}
                            />
                        ) : checkout.selected.delivery === 'pickup' ? (
                            <PickupInfo t={t} formik={formik} checkout={checkout} setCheckout={setCheckout} />
                        ) : (
                            <InStorePickup handleOpenMessage={handleOpenMessage} t={t} checkout={checkout} setCheckout={setCheckout} />
                        )}

                        <Shipping
                            t={t}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            updateFormik={updateFormik}
                            formik={formik}
                            handleOpenMessage={handleOpenMessage}
                            storeConfig={storeConfig}
                            ShippingView={ShippingView}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                            setLoadingSellerInfo={setLoadingSellerInfo}
                            loadingSellerInfo={loadingSellerInfo}
                            currencyCache={currencyCache}
                        />

                        <div className={classNames('flex flex-col border-b border-b-neutral-200', 'w-full py-6 gap-4')}>
                            <Typography variant="h2" className="uppercase">
                                {t('checkout:feePromoLabel')}
                            </Typography>
                            <div className="flex flex-col gap-4">
                                {modules.checkout.extraFee.enabled ? (
                                    <ExtraFee
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        updateFormik={updateFormik}
                                        handleOpenMessage={handleOpenMessage}
                                        t={t}
                                        storeConfig={storeConfig}
                                        ExtraFeeView={ExtraFeeView}
                                        currencyCache={currencyCache}
                                    />
                                ) : null}
                                {modules.promo.enabled ? (
                                    <div className="xs:basis-full sm:basis-full md:basis-full xl:basis-full">
                                        <Promo
                                            t={t}
                                            checkout={checkout}
                                            setCheckout={setCheckout}
                                            handleOpenMessage={handleOpenMessage}
                                            formik={formik}
                                            storeConfig={storeConfig}
                                            PromoView={PromoView}
                                            refetchItemCart={refetchItemCart}
                                        />
                                    </div>
                                ) : null}
                                {modules.giftcard.enabled ? (
                                    <div className="xs:basis-full sm:basis-full md:basis-full xl:basis-full">
                                        <GiftCard
                                            t={t}
                                            checkout={checkout}
                                            setCheckout={setCheckout}
                                            handleOpenMessage={handleOpenMessage}
                                            formik={formik}
                                            storeConfig={storeConfig}
                                            GiftCardView={GiftCardView}
                                        />
                                    </div>
                                ) : null}
                                {modules.rewardpoint.enabled ? (
                                    <div className="xs:basis-full sm:basis-full md:basis-1/2 xl:basis-6/12">
                                        <RewardPoint
                                            t={t}
                                            checkout={checkout}
                                            setCheckout={setCheckout}
                                            handleOpenMessage={handleOpenMessage}
                                            formik={formik}
                                            storeConfig={storeConfig}
                                            RewardPointView={RewardPointView}
                                            currencyCache={currencyCache}
                                        />
                                    </div>
                                ) : null}
                                {modules.storecredit.enabled ? (
                                    <div className="xs:basis-full sm:basis-full md:basis-1/2 xl:basis-6/12">
                                        <Credit
                                            t={t}
                                            checkout={checkout}
                                            setCheckout={setCheckout}
                                            handleOpenMessage={handleOpenMessage}
                                            formik={formik}
                                            storeConfig={storeConfig}
                                            StoreCreditView={StoreCreditView}
                                            currencyCache={currencyCache}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <PaymentList
                            checkout={checkout}
                            setCheckout={setCheckout}
                            formik={formik}
                            updateFormik={updateFormik}
                            handleOpenMessage={handleOpenMessage}
                            t={t}
                            storeConfig={storeConfig}
                            PaymentView={PaymentView}
                            modules={modules}
                            paypalTokenData={paypalTokenData}
                            paypalHandlingProps={paypalHandlingProps}
                            setInitialOptionPaypal={setInitialOptionPaypal}
                            initialOptionPaypal={initialOptionPaypal}
                            setTokenData={setTokenData}
                            stripeRef={stripeRef}
                            clientSecret={clientSecret}
                            setClientSecret={setClientSecret}
                            displayHowToPay={displayHowToPay}
                            setDisplayHowToPay={setDisplayHowToPay}
                            checkoutTokenState={checkoutTokenState}
                            refSummary={SummaryRef}
                            setCheckoutTokenState={setCheckoutTokenState}
                            config={config}
                        />

                        <Confirmation
                            t={t}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            storeConfig={storeConfig}
                            ConfirmationView={ConfirmationView}
                        />

                        {enableMultiSeller ? (
                            <div className={classNames('flex flex-col border-b border-b-neutral-200', 'w-full py-6 gap-4')}>
                                <div className="xs:basis-full sm:basis-full md:basis-full xl:basis-full">
                                    <OrderComment
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        OrderCommentView={OrderCommentView}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </>
                    <div className="hidden desktop:block w-full mt-5">
                        <Summary
                            {...props}
                            loading={loading}
                            disabled={disabled}
                            checkout={checkout}
                            updateFormik={updateFormik}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            formik={formik}
                            storeConfig={storeConfig}
                            refSummary={SummaryRef}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                            buttonOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
