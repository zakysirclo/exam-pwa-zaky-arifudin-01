// Library
import { modules } from '@config';
import gqlService from '@core_modules/customer/services/graphql';
import Layout from '@layout_customer';
import React from 'react';
import { getHost } from '@helpers/config';
import Skeleton from '@core_modules/customer/pages/account/components/Skeleton';
import Show from '@common/Show';
import { getLoginInfo } from '@helper_auth';

const Customer = (props) => {
    const {
        t, CustomerView, storeConfig, reOrder, ...other
    } = props;
    let userData = {};
    let wishlist = [];
    const { data, loading, error } = gqlService.getCustomer(storeConfig);
    const { data: customerOrders } = gqlService.getCustomerOrder();

    const isLogin = getLoginInfo();

    if (!data || loading || error) {
        return (
            <Layout {...props}>
                <Skeleton />
            </Layout>
        );
    }
    if (data) {
        userData = data;
        if (modules.wishlist.enabled) {
            wishlist = data.customer
                && data.customer.wishlist
                && data.customer.wishlist.items.map(({ product }) => ({
                    ...product,
                    name: product.name,
                    link: product.url_key,
                    imageSrc: product.small_image.url,
                    price: product.price_range.minimum_price.regular_price.value,
                    showWishlistAction: false,
                }));
        }
    }

    if (customerOrders && customerOrders.customerOrders) {
        userData = { ...userData, customerOrders: customerOrders.customerOrders };
    }

    const returnUrl = (order_number) => {
        if (storeConfig && storeConfig?.OmsRma?.enable_oms_rma) {
            const omsRmaLink = storeConfig.OmsRma.oms_rma_link;
            const omsChannelCode = storeConfig.oms_channel_code;
            const backUrl = window.location.href;
            const customerEmail = userData?.customer?.email;
            // eslint-disable-next-line max-len
            const encodedQuerystring = `email=${encodeURIComponent(customerEmail)}&order_number=${encodeURIComponent(
                order_number,
            )}&channel_code=${encodeURIComponent(omsChannelCode)}&from=${encodeURIComponent(backUrl)}`;
            const omsUrl = `${omsRmaLink}?${encodedQuerystring}`;
            window.location.replace(omsUrl);
        } else {
            window.location.replace(`${getHost()}/rma/customer/new/order_id/${order_number}`);
        }
    };

    const pushIf = (condition, ...elements) => (condition ? elements : []);

    const menu = [
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/inboxnotification/notification', title: t('customer:menu:notification') },
        { href: '/customer/account/profile', title: t('customer:menu:myAccount') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        { href: '/sales/downloadable/history', title: t('customer:menu:myDownload') },
        ...pushIf(wishlist.length && modules.wishlist.enabled <= 0, {
            href: '/wishlist',
            title: 'Wishlist',
        }),
        ...pushIf(modules.productreview.enabled, {
            href: '/review/customer',
            title: t('customer:menu:myProductReview'),
        }),
        ...pushIf(modules.giftcard.enabled, {
            href: '/awgiftcard/card',
            title: 'Gift Card',
        }),
        ...pushIf(modules.storecredit.enabled, {
            href: '/customer/account/storecredit',
            title: t('customer:menu:storeCredit'),
        }),
        ...pushIf(modules.notification.enabled, {
            href: '/inboxnotification/notification',
            title: t('notification:notification'),
        }),
        { href: '/customer/newsletter', title: t('customer:setting:newsletter') },
        {
            href: (storeConfig && storeConfig?.OmsRma?.enable_oms_rma) ? storeConfig?.OmsRma?.oms_rma_link : '/rma/customer',
            title: t('customer:menu:return'),
        },
    ];

    return (
        <Layout {...props}>
            <Show when={!data || loading || error}>
                <Skeleton />
            </Show>
            <CustomerView
                {...other}
                t={t}
                modules={modules}
                menu={menu}
                userData={userData}
                wishlist={wishlist}
                storeConfig={storeConfig}
                isLogin={isLogin}
                reOrder={reOrder}
                returnUrl={returnUrl}
            />
        </Layout>
    );
};

export default Customer;
