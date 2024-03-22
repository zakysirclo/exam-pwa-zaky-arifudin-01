/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import Alert from '@common/Alert';
import Button from '@common_button';
import Typography from '@common_typography';

import { modules } from '@config';

import { setCheckoutData } from '@helper_cookies';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';

import ModalXendit from '@core_modules/checkout/pages/default/components/ModalXendit';
import OrderStatusIcon from '@core_modules/order/pages/detail/components/OrderStatusIcon';
import Table from '@core_modules/order/pages/detail/components/TableListItem';
import { checkJson } from '@core_modules/trackingorder/pages/default/helpers/checkJson';
import ModalTrackOrder from '@core_modules/trackingorder/plugins/ModalTrackOrder';

import Layout from '@layout_customer';

import cx from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

import PrinterIcon from '@heroicons/react/24/outline/PrinterIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';

const DetailOrder = (props) => {
    const {
        // prettier-ignore
        t,
        detail,
        currency,
        storeConfig,
        reOrder,
        returnUrl,
        paymentInfo,
        dataTrackingOrder,
        printOrder,
        currencyCache,
    } = props;

    const {
        checkout: {
            xendit: { paymentPrefixCodeOnSuccess },
        },
    } = modules;

    const [openXendit, setOpenXendit] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [modalData, setModalData] = React.useState('');

    let items = [];
    const shipping = {
        track_number: dataTrackingOrder.ordersFilter.data[0].detail[0].shipping_methods.shipping_detail[0].track_number,
        trackorder_type: dataTrackingOrder.ordersFilter.data[0].detail[0].shipping_methods.shipping_detail[0].trackorder_type,
    };

    if (detail.length > 0 && detail[0].detail[0].items.length) {
        const configurableProduct = [];
        detail[0].detail[0].items.map((item) => {
            if (item.parent_item_id == null) {
                const tmp = {};
                const child = detail[0].detail[0].items.filter((childItem) => childItem.parent_item_id === item.item_id);
                tmp.name = child.length ? child[0].name : item.name;
                configurableProduct.push({ ...item, ...tmp });
            }
        });
        const simpleProduct = detail[0].detail[0].items.filter((item) => !configurableProduct.find(({ sku }) => item.sku === sku) && item);
        items = [...configurableProduct, ...simpleProduct];
    }
    let dt;
    const shippingMethods = dataTrackingOrder.ordersFilter.data[0].detail[0].shipping_methods.shipping_detail;
    if (shippingMethods.length > 0) {
        // eslint-disable-next-line no-shadow
        shippingMethods.forEach((shipping) => {
            if (shipping.data_detail) {
                dt = shipping.data_detail;
                dt = dt.replace(/'/g, '`');
                dt = dt.replace(/"/g, "'");
                dt = dt.replace(/`/g, '"');

                if (checkJson(dt) && !JSON.parse(dt).errors) {
                    dt = JSON.parse(dt);
                }
            }
        });
    }
    if (detail.length > 0) {
        const handleOpenXendit = () => {
            setCheckoutData({
                email: detail[0].detail[0].customer_email,
                order_number: detail[0].order_number,
                order_id: detail[0].order_number,
            });
            setOpenXendit(!openXendit);
        };

        const handleOpenModal = (type, datas) => {
            setOpenModal(true);
            setModalType(type);
            setModalData(datas);
        };

        const { pickup_person } = detail[0].detail[0].pickup_store;

        return (
            <Layout t={t} title={t('customer:menu:myOrder')} activeMenu="/sales/order/history">
                {paymentInfo && paymentInfo.invoice_url && (
                    <ModalXendit
                        open={openXendit}
                        setOpen={() => setOpenXendit(!openXendit)}
                        iframeUrl={paymentInfo.invoice_url}
                        order_id={detail[0].order_number}
                        payment_code={paymentInfo.method_code}
                        fromOrder
                        amount={detail[0].detail[0].grand_total}
                        mode={paymentInfo.xendit_mode}
                        xendit_qrcode_external_id={paymentInfo.xendit_qrcode_external_id}
                    />
                )}
                <div className="flex flex-col gap-y-4">
                    <div className={cx('mobile:max-tablet:hidden', 'flex', 'flex-row', 'justify-between')}>
                        <div>
                            <Typography variant="h1" className={cx('mobile:text-2md', 'tablet:text-lg', 'desktop:text-xl')}>
                                {t('order:order')}
                                {' # '}
                                {detail[0].order_number || ''}
                            </Typography>
                            <Typography className={cx('tablet:pt-2')}>{formatDate(detail[0].created_at)}</Typography>
                        </div>
                        <div className={cx('flex', 'flex-row', 'gap-x-2')}>
                            <Button
                                variant="outlined"
                                id="btn-print"
                                onClick={reOrder}
                                icon={<ArrowPathIcon />}
                                iconPosition="left"
                                className={cx(
                                    'border-neutral-200',
                                    'tablet:!px-2',
                                    'tablet:py-1',
                                    'desktop:!px-4',
                                    'tablet:!px-2',
                                    'tablet:py-1',
                                    'desktop:!py-2',
                                    'rounded-lg',
                                )}
                            >
                                {t('order:reorder')}
                            </Button>
                            <Button
                                variant="outlined"
                                id="btn-print"
                                onClick={() => printOrder(detail[0].order_number)}
                                icon={<PrinterIcon />}
                                iconPosition="left"
                                className={cx(
                                    'border-neutral-200',
                                    'tablet:!px-2',
                                    'tablet:py-1',
                                    'desktop:!px-4',
                                    'tablet:!px-2',
                                    'tablet:py-1',
                                    'desktop:!py-2',
                                    'rounded-lg',
                                )}
                            >
                                {t('order:printOrder')}
                            </Button>
                        </div>
                    </div>
                    <div className={cx('flex', 'flex-row', 'justify-center', 'items-center')}>
                        <OrderStatusIcon status={detail[0].status} t={t} />
                    </div>
                    <div className={cx('tablet:hidden', 'mobile:max-tablet:px-0', 'tablet:px-4', 'flex', 'flex-row', 'justify-between')}>
                        <Button
                            variant="outlined"
                            id="btn-print"
                            onClick={reOrder}
                            icon={<ArrowPathIcon />}
                            iconPosition="left"
                            className={cx('border-neutral-200', 'mobile:!px-3', 'mobile:py-2', 'rounded-lg')}
                            classNameText={cx('text-sm')}
                            iconProps={{ className: cx('!w-4', '!h-4') }}
                        >
                            {t('order:reorder')}
                        </Button>
                        <Button
                            variant="outlined"
                            id="btn-print"
                            onClick={() => printOrder(detail[0].order_number)}
                            icon={<PrinterIcon />}
                            iconPosition="left"
                            className={cx('border-neutral-200', 'mobile:!px-3', 'mobile:py-2', 'rounded-lg')}
                            classNameText={cx('text-sm')}
                            iconProps={{ className: cx('!w-4', '!h-4') }}
                        >
                            {t('order:printOrder')}
                        </Button>
                    </div>
                    <div
                        className={cx(
                            'flex',
                            'flex-col',
                            'gap-y-4',
                            'mobile:max-tablet:p-4',
                            'p-6',
                            'border-[1px]',
                            'border-neutral-200',
                            'rounded-lg',
                            'tablet:mx-4',
                        )}
                    >
                        <Typography className={cx('mobile:text-2md', 'tablet:text-lg', 'capitalize')}>{t('order:orderInfo')}</Typography>
                        <div className="flex flex-initial flex-row flex-wrap content-start text-start gap-y-8">
                            <div className={cx('mobile:basis-full', 'tablet:hidden', 'flex', 'flex-col')}>
                                <Typography className={cx('capitalize', '!font-bold', 'tablet:pt-2')}>{t('order:orderId')}</Typography>
                                <Typography className={cx('tablet:pt-2')}>{detail[0].order_number || ''}</Typography>
                                <Typography className={cx('capitalize', '!font-bold', 'tablet:pt-2')}>{t('order:date')}</Typography>
                                <Typography className={cx('tablet:pt-2')}>{formatDate(detail[0].created_at)}</Typography>
                            </div>
                            {Object.keys(detail[0].detail[0].shipping_address).length > 0 && (
                                <div
                                    className={cx(
                                        'mobile:basis-full',
                                        'tablet:basis-1/2',
                                        'desktop:basis-1/4',
                                        'flex',
                                        'flex-col',
                                        'gap-y-0',
                                        'justify-between',
                                        'pr-2',
                                    )}
                                >
                                    <Typography className={cx('uppercase', '!font-bold')}>
                                        {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                                            ? t('order:pickupAt')
                                            : t('order:shippedTo')}
                                    </Typography>
                                    <Typography className={cx('tablet:pt-2')}>
                                        {detail[0].detail[0].shipping_address.firstname || ''} {detail[0].detail[0].shipping_address.lastname || ''}
                                        <br />
                                        {detail[0].detail[0].shipping_address.street || ''}
                                        <br />
                                        {`${detail[0].detail[0].shipping_address.city
                                            ? detail[0].detail[0].shipping_address.city.split(', ')[0] : ''}, ${
                                            detail[0].detail[0].shipping_address.region || ''
                                        } ${detail[0].detail[0].shipping_address.postcode || ''}`}
                                        <br />
                                        {detail[0]?.detail[0]?.shipping_address?.country || ''}
                                        {detail[0]?.detail[0]?.shipping_address?.telephone || ''}
                                    </Typography>
                                </div>
                            )}
                            {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store && (
                                <div
                                    className={cx(
                                        'mobile:basis-full',
                                        'tablet:basis-1/2',
                                        'desktop:basis-1/4',
                                        'flex',
                                        'flex-col',
                                        'gap-y-0',
                                        'pr-2',
                                    )}
                                >
                                    <Typography className={cx('uppercase', '!font-bold')}>{t('order:pickupBy')}</Typography>
                                    <Typography className={cx('tablet:pt-2')}>
                                        {pickup_person.name && (
                                            <>
                                                <Typography>
                                                    {pickup_person.name}
                                                </Typography>
                                                <br />
                                            </>
                                        )}
                                        {`Hp : ${pickup_person.handphone ? pickup_person.handphone : '-'}`}
                                        <br />
                                        {`Email : ${pickup_person.email ? pickup_person.email : '-'}`}
                                        <br />
                                    </Typography>
                                </div>
                            )}
                            <div
                                className={cx(
                                    'mobile:basis-full',
                                    'tablet:basis-1/2',
                                    'desktop:basis-1/4',
                                    'flex',
                                    'flex-col',
                                    'gap-y-0',
                                    'pr-2',
                                )}
                            >
                                <Typography className={cx('uppercase', '!font-bold')}>{t('order:orderStatus')}</Typography>
                                <Typography className={cx('tablet:pt-2')}>{detail[0].status_label || ''}</Typography>
                            </div>
                            <div
                                className={cx(
                                    'mobile:basis-full',
                                    'tablet:basis-1/2',
                                    'desktop:basis-1/4',
                                    'flex',
                                    'flex-col',
                                    'gap-y-0',
                                    'pr-2',
                                )}
                            >
                                <Typography className={cx('uppercase', '!font-bold')}>{t('order:billingAddress')}</Typography>
                                <Typography className={cx('tablet:pt-2')}>
                                    {detail[0].detail[0].billing_address.firstname || ''} {detail[0].detail[0].billing_address.lastname || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.street || ''}
                                    <br />
                                    {`${detail[0].detail[0].billing_address.city.split(', ')[0] || ''}, ${
                                        detail[0].detail[0].billing_address.region || ''
                                    } ${detail[0].detail[0].billing_address.postcode || ''}`}
                                    <br />
                                    {detail[0].detail[0].billing_address.country || ''}
                                    {detail[0].detail[0].billing_address.telephone || ''}
                                </Typography>
                            </div>
                            {Object.keys(detail[0].detail[0].shipping_address).length > 0 && (
                                <div className={cx('mobile:basis-full', 'tablet:basis-1/2', 'desktop:basis-1/4', 'flex', 'flex-col', 'gap-y-0')}>
                                    <Typography className={cx('uppercase', '!font-bold')}>{t('order:shippingMethod')}</Typography>
                                    <Typography className={cx('tablet:pt-2')}>
                                        {detail[0].detail[0].shipping_methods.shipping_description || ''}
                                    </Typography>
                                    {shippingMethods.length > 0 && shipping.track_number && shipping.trackorder_type && (
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleOpenModal(shipping.trackorder_type, dt)}
                                            align="left"
                                            className={cx('p-0', '-ml-1', 'mt-4')}
                                        >
                                            <Typography>
                                                {t('order:trackingOrder')}
                                                {': '}
                                                {shipping.track_number} {`(${shipping.trackorder_type})`}
                                            </Typography>
                                        </Button>
                                    )}
                                </div>
                            )}
                            <ModalTrackOrder
                                {...props}
                                modalType={modalType}
                                modalData={modalData}
                                open={openModal}
                                setOpen={setOpenModal}
                                orders={dataTrackingOrder.ordersFilter}
                            />
                            <div className={cx('mobile:basis-full', 'tablet:basis-1/2', 'desktop:basis-1/4', 'flex', 'flex-col', 'gap-y-0')}>
                                <Typography className={cx('uppercase', '!font-bold')}>{t('order:paymentMethod')}</Typography>
                                {Object.keys(detail[0].detail[0].payment.payment_additional_info).map((item) => {
                                    if (
                                        item !== '__typename' &&
                                        detail[0].detail[0].payment.payment_additional_info[item] !== '' &&
                                        detail[0].detail[0].payment.payment_additional_info[item] !== null
                                    ) {
                                        return (
                                            <React.Fragment key={item}>
                                                <Typography className={cx('capitalize', '!font-bold', 'mobile:pt-2')}>
                                                    {item.replace('_', ' ')}
                                                </Typography>
                                                <Typography className={cx('mobile:max-tablet:pt-0', 'tablet:pt-2')}>
                                                    {detail[0].detail[0].payment.payment_additional_info[item] || ''}
                                                </Typography>
                                            </React.Fragment>
                                        );
                                    }
                                })}
                                {(detail[0].status === 'pending' || detail[0].status === 'pending_payment') &&
                                    paymentInfo &&
                                    (paymentPrefixCodeOnSuccess.includes(paymentInfo.method_code) || paymentInfo.method_code === 'qr_codes') &&
                                    (paymentInfo.due_date !== null ? dayjs().isBefore(dayjs(paymentInfo.due_date)) : true) && (
                                        <>
                                            <div className={cx('mt-4')}>
                                                <Typography className={cx('tablet:pt-2')}>{t('order:onboarding')}</Typography>
                                            </div>
                                            <div className="hidden-mobile">
                                                <Button onClick={() => handleOpenXendit()} className={cx('mt-4')} align="left">
                                                    <Typography size="10" type="bold" color="white" letter="uppercase">
                                                        {t('thanks:paynow')}
                                                    </Typography>
                                                </Button>
                                            </div>
                                            <div className="hidden-desktop">
                                                <Button onClick={() => handleOpenXendit()} className={cx('mt-4')}>
                                                    <Typography size="10" type="bold" color="white" letter="uppercase">
                                                        {t('thanks:paynow')}
                                                    </Typography>
                                                </Button>
                                            </div>
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('mobile:max-tablet:p-4', 'p-6', 'border-[1px]', 'border-neutral-200', 'rounded-lg', 'tablet:mx-4')}>
                        <div className={cx('flex', 'flex-col', 'gap-y-4')}>
                            <div className="mobile:basis-full">
                                <Typography className={cx('mobile:text-2md', 'tablet:text-lg')}>{t('order:orderComment:title')}</Typography>
                            </div>
                            <div className={cx('basis-full', 'flex', 'flex-col')}>
                                <Typography className={cx('capitalize', '!font-bold')}>{t('order:orderComment:commentHistory')}</Typography>
                                {detail[0].comments.length > 0 ? (
                                    detail[0].comments.map((item) => (
                                        <div className={cx('flex', 'flex-row')}>
                                            <div className="mobile:basis-full sm:basis-4/12 tablet:basis-3/12 desktop:basis-2/12">
                                                <Typography className={cx('font-bold')}>{formatDate(item.timestamp)}</Typography>
                                            </div>
                                            <div className="mobile:basis-full sm:basis-8/12 tablet:basis-9/12 desktop:basis-10/12">
                                                <Typography className={cx('tablet:pt-2')}>{item.message}</Typography>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <Typography className={cx('tablet:pt-2')}>-</Typography>
                                )}
                            </div>
                            <div className={cx('basis-full', 'flex', 'flex-col')}>
                                <Typography className={cx('capitalize', '!font-bold')}>{t('order:orderComment:subTitle')}</Typography>
                                <Typography className={cx('tablet:pt-2')}>{detail[0].order_comment || '-'}</Typography>
                            </div>
                            {storeConfig.enable_oms_multiseller === '1' && detail[0].seller_id ? (
                                <div className={cx('basis-full', 'flex', 'flex-col')}>
                                    <Typography className={cx('capitalize', '!font-bold')}>{t('order:seller')}</Typography>
                                    <Typography className={cx('tablet:pt-2')}>
                                        {`${detail[0].seller_name} - ${detail[0].seller_city}` || '-'}
                                    </Typography>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={cx('mobile:max-tablet:p-4', 'p-6', 'border-[1px]', 'border-neutral-200', 'rounded-lg', 'tablet:mx-4')}>
                        <div className="flex flex-col">
                            <div className="mobile:basis-full">
                                <Typography className={cx('mobile:text-2md', 'tablet:text-lg', 'capitalize')}>{t('order:orderItem')}</Typography>
                            </div>
                            <div className="mobile:basis-full">
                                <Table data={items} t={t} currency={currency} currencyCache={currencyCache} storeConfig={storeConfig} />
                            </div>
                            <div className="mobile:basis-full flex flex-row tablet:justify-end mt-4">
                                <div className="mobile:basis-full tablet:basis-4/12 flex flex-col gap-y-2">
                                    {(detail[0].detail[0].subtotalt !== null || detail[0].detail[0].subtotal_incl_taxt !== null) && (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">Sub Total</Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(
                                                    detail[0].detail[0].tax_amount
                                                        ? detail[0].detail[0].subtotal
                                                        : detail[0].detail[0].subtotal_incl_tax,
                                                    currency,
                                                    currencyCache,
                                                )}
                                            </Typography>
                                        </div>
                                    )}
                                    {detail[0].detail[0].tax_amount !== null && (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">{t('order:tax')}</Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(detail[0].detail[0].tax_amount, currency, currencyCache)}
                                            </Typography>
                                        </div>
                                    )}
                                    {detail[0].detail[0].payment !== null && (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">{t('order:shipping')}</Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(detail[0].detail[0].payment.shipping_amount, currency, currencyCache)}
                                            </Typography>
                                        </div>
                                    )}
                                    {detail[0].detail[0].discount_amount !== null ? (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">{t('order:discount')}</Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(detail[0].detail[0].discount_amount, currency, currencyCache)}
                                            </Typography>
                                        </div>
                                    ) : null}
                                    {detail[0].detail[0].aw_store_credit.is_use_store_credit ? (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">{t('order:credit')}</Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(detail[0].detail[0].aw_store_credit.store_credit_amount, currency, currencyCache)}
                                            </Typography>
                                        </div>
                                    ) : null}
                                    {detail[0].detail[0].aw_reward_points.is_use_reward_points ? (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">{t('order:rewardPoints')}</Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(detail[0].detail[0].aw_reward_points.reward_points_amount, currency, currencyCache)}
                                            </Typography>
                                        </div>
                                    ) : null}
                                    {modules.giftcard.enabled && detail[0].detail[0] && detail[0].detail[0].aw_giftcard.giftcard_amount !== null ? (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">
                                                {t('order:giftcard')} (
                                                {detail[0].detail[0].aw_giftcard.giftcard_detail.length > 1
                                                    ? detail[0].detail[0].aw_giftcard.giftcard_detail.map((code, index) => {
                                                          if (index === detail[0].detail[0].aw_giftcard.giftcard_detail.length - 1) {
                                                              return code.giftcard_code;
                                                          }
                                                          return `${code.giftcard_code}, `;
                                                      })
                                                    : detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code}
                                                )
                                            </Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(-detail[0].detail[0].aw_giftcard.giftcard_amount, currency, currencyCache)}
                                            </Typography>
                                        </div>
                                    ) : null}
                                    {detail[0].detail[0].applied_extra_fee ? (
                                        <div className={cx('flex', 'flex-row', 'justify-between')}>
                                            <Typography letter="capitalize">{detail[0].detail[0].applied_extra_fee.title}</Typography>
                                            <Typography letter="capitalize">
                                                {formatPrice(
                                                    detail[0].detail[0].applied_extra_fee.extrafee_value.value,
                                                    detail[0].detail[0].applied_extra_fee.extrafee_value.currency,
                                                    currencyCache,
                                                )}
                                            </Typography>
                                        </div>
                                    ) : null}
                                    <div className={cx('flex', 'flex-row', 'justify-between')}>
                                        <Typography variant="title" type="bold" letter="capitalize">
                                            Total
                                        </Typography>
                                        <Typography variant="title" type="bold" letter="capitalize">
                                            {detail[0].detail[0].grand_total && formatPrice(detail[0].detail[0].grand_total, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('py-6', 'flex', 'flex-col')}>
                        {detail[0].detail[0].aw_rma && detail[0].detail[0].aw_rma.status && (
                            <div>
                                <Button variant="outlined" onClick={() => returnUrl(detail[0].order_number)} className={cx('border-neutral-200')}>
                                    {t('order:smReturn')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        );
    }
    return (
        <Alert className="m-4" severity="warning">
            {t('order:notFound')}
        </Alert>
    );
};

export default DetailOrder;
