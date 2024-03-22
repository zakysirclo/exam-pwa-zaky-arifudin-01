/* eslint-disable no-lonely-if */
import React from 'react';
import View from '@core_modules/checkout/pages/default/components/ModalXendit/view';
import { modules } from '@config';
import { getHost, getStoreHost } from '@helper_config';
import { removeCheckoutData } from '@helper_cookies';
import { xenditSimulateQr } from '@core_modules/checkout/services/graphql';
import { useTranslation } from 'next-i18next';
import { getSuccessCallbackUrl } from '@core_modules/checkout/helpers/config';
import { getAppEnv } from '@core/helpers/env';

const ModalXendit = (props) => {
    const {
        payment_code, order_id, fromOrder, amount, xendit_qrcode_external_id,
    } = props;
    const originName = modules.checkout.checkoutOnly ? 'pwa-checkout' : 'pwa';
    const [requestSimulateQr] = xenditSimulateQr();
    const { t } = useTranslation(['common']);

    const [loadSimulate, setLoadSimulate] = React.useState(false);

    const generatesuccessRedirect = () => {
        const link = getSuccessCallbackUrl();
        if (link) {
            window.location.replace(`${link}${order_id ? `?orderId=${order_id}` : ''}`);
        } else {
            window.location.replace('/checkout/onepage/success');
        }
    };

    const handleCloseXendit = () => {
        if (modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(payment_code)) {
            if (fromOrder) {
                removeCheckoutData();
                window.location.replace(`/sales/order/view/order_id/${order_id}`);
            } else {
                window.location.replace('/checkout/onepage/success');
            }
        } else if (payment_code === 'qr_codes') {
            generatesuccessRedirect();
        } else {
            if (originName === 'pwa-checkout') {
                window.location.replace(`${getStoreHost(getAppEnv())}xendit/checkout/failure?order_id=${order_id}`);
            } else {
                window.location.replace(`${getHost()}/checkout/cart?paymentFailed=true&orderId=${order_id}`);
            }
        }
    };

    const handleSimulateQr = () => {
        setLoadSimulate(true);
        requestSimulateQr({
            variables: {
                external_id: xendit_qrcode_external_id,
                amount: parseInt(amount, 10),
            },
        }).then((res) => {
            setLoadSimulate(false);
            if (res && res.data && res.data.xenditSimulateQr && res.data.xenditSimulateQr.status) {
                if (res.data.xenditSimulateQr.message) {
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: res.data.xenditSimulateQr.message,
                    });
                    setTimeout(() => {
                        generatesuccessRedirect();
                    }, 1000);
                } else {
                    generatesuccessRedirect();
                }
            } else {
                handleCloseXendit();
            }
        }).catch(() => {
            setLoadSimulate(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('common:error:fetchError'),
            });
            setTimeout(() => {
                handleCloseXendit();
            }, 1000);
        });
    };

    return (
        <View
            handleCloseXendit={handleCloseXendit}
            handleSimulateQr={handleSimulateQr}
            t={t}
            loadSimulate={loadSimulate}
            {...props}
        />
    );
};

export default ModalXendit;
