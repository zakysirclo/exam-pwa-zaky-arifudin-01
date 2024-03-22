import React from 'react';
import Alert from '@common/Alert';
import Button from '@common_button';
import Typography from '@common_typography';
import _ from 'lodash';
import ModalAddress from '@core_modules/checkout/pages/default/components/ModalAddress';
import { storeConfigVar } from '@core/services/graphql/cache';
import classNames from 'classnames';
import Show from '@common/Show';
import dynamic from 'next/dynamic';

import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setPickupLocationCode, setStatusState,
} from '@core_modules/checkout/redux/checkoutSlice';

const AddressFormDialog = dynamic(() => import('@plugin_addressform'), { ssr: false });

const CLOSE_ADDRESS_DIALOG = 100;

const AddressView = (props) => {
    const {
        data,
        setAddress,
        t,
        dialogProps,
        loading,
        address,
        content,
        manageCustomer,
        isOnlyVirtualProductOnCart,
        showEmptyPinpoint,
        ...other
    } = props;

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const pwaConfig = storeConfigVar();
    const gmapKey = pwaConfig && pwaConfig.icube_pinlocation_gmap_key ? pwaConfig.icube_pinlocation_gmap_key : null;
    const { formik } = other;

    const [openAddress, setOpenAddress] = React.useState(false);

    return (
        <div
            id="checkoutAddress"
            className={classNames(
                'flex flex-col border-b border-b-neutral-200',
                'w-full py-6 gap-4',
            )}
        >
            <style jsx>
                {`
                    .alert-empty-pin-point :global(.MuiAlert-icon) {
                        font-size: 16px;
                    }
                `}
            </style>
            <ModalAddress
                open={openAddress}
                setOpen={(status) => setOpenAddress(status)}
                t={t}
                setAddress={setAddress}
                manageCustomer={manageCustomer}
                {...other}
            />
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <Typography variant="h2" type="bold" className="uppercase">
                        {isOnlyVirtualProductOnCart ? t('checkout:billingAddress') : t('checkout:shippingAddress')}
                    </Typography>
                    <Typography>{content}</Typography>
                </div>
                <div>
                    <AddressFormDialog
                        t={t}
                        onSubmitAddress={async (dataAddress) => {
                            const { cart } = checkout.data;

                            await setAddress(dataAddress, cart);
                            dispatch(setStatusState({ addresses: true }));
                            dispatch(setPickupLocationCode({ addresses: null }));

                            _.delay(async () => {
                                dispatch(setStatusState({ openAddressDialog: false, addresses: false }));
                                // await setAddress(dataAddress, cart);
                            }, CLOSE_ADDRESS_DIALOG);
                        }}
                        loading={checkout.loading.addresses}
                        success={checkout.status.addresses}
                        open={checkout.status.openAddressDialog}
                        disableDefaultAddress
                        setOpen={() => {
                            dispatch(setStatusState({ openAddressDialog: false }));
                        }}
                        pageTitle={t('checkout:address:addTitle')}
                        {...other}
                        {...dialogProps}
                    />
                    {loading.addresses || loading.all ? null : (
                        <Button
                            // eslint-disable-next-line no-nested-ternary, max-len
                            className={data.isGuest && !address ? 'swift-checkout-addAddress-btn' : _.isNull(address) ? 'swift-checkout-manage-btn' : 'swift-checkout-change-btn'}
                            variant={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail ? 'contained' : 'outlined'}
                            disabled={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail}
                            // href={data.isGuest ? null : '/customer/account/address'}
                            onClick={
                                data.isGuest
                                    ? () => {
                                        dispatch(setStatusState({
                                            openAddressDialog: true,
                                        }));
                                    }
                                    : () => setOpenAddress(true)
                            }
                        >
                            <Typography variant="p-3" type="bold" letter="uppercase">
                                {data.isGuest && !address
                                    ? t('common:button:addAddress')
                                    : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
            <Show when={showEmptyPinpoint || checkout.error.shippingAddress}>
                <div className="flex flex-col justify-between h-[100px]">
                    {
                        showEmptyPinpoint && gmapKey && (
                            <Alert style={{ fontSize: 10 }} severity="warning">
                                {t('customer:address:emptyPinPointMessage')}
                            </Alert>
                        )
                    }
                    {
                        checkout.error.shippingAddress && (
                            <Alert style={{ fontSize: 10 }} severity="error">
                                {t('checkout:address:invalidAddress')}
                            </Alert>
                        )
                    }
                </div>
            </Show>
        </div>
    );
};

export default AddressView;
