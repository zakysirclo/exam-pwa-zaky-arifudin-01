/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable @next/next/no-img-element */
import Typography from '@common_typography';
import { modules } from '@config';
import Table from '@core_modules/order/pages/print/components/TableListItem';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';

const PrintOrder = (props) => {
    const { t, detail, currency, storeConfig, currencyCache } = props;

    let items = [];

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

    return (
        <>
            <div className={cx('flex flex-col', 'mx-auto', 'px-10')}>
                <div className={cx('')}>
                    <div className="header-middle__left">
                        <div className="box header-middle__logo">
                            <Link href="/" legacyBehavior>
                                <img
                                    className="swift-header-middle__logo-link"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-4">
                        <Typography variant="h1" className={cx('!text-2xl')}>
                            {t('order:order')}
                            {' # '}
                            {detail[0].order_number || ''}
                        </Typography>
                        <Typography id="status_label" className={cx('px-4', 'py-2', 'border-[1px]', 'border-neutral-400')}>
                            {detail[0].status_label || ''}
                        </Typography>
                    </div>
                    <Typography className="clear-margin-padding">{formatDate(detail[0].created_at)}</Typography>
                </div>
                <div>
                    <div className={cx('flex', 'flex-col')}>
                        <div className="mobile:basis-full">
                            <div>
                                <Table data={items} t={t} currency={currency} currencyCache={currencyCache} {...props} />
                            </div>
                        </div>
                        <div className="mobile:basis-full flex flex-row mt-4 justify-end text-end">
                            <div className="basis-4/12 flex flex-col gap-y-2">
                                {(detail[0].detail[0].subtotal || detail[0].detail[0].subtotal_incl_tax) && (
                                    <div className="flex flex-row justify-between">
                                        <Typography className={cx('capitalize')}>Sub total</Typography>
                                        <Typography letter="capitalize">
                                            {formatPrice(
                                                detail[0].detail[0].tax_amount ? detail[0].detail[0].subtotal : detail[0].detail[0].subtotal_incl_tax,
                                                currency,
                                                currencyCache,
                                            )}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].payment && (
                                    <div className="flex flex-row justify-between">
                                        <Typography className={cx('capitalize')}>{t('order:shipping')}</Typography>
                                        <Typography letter="capitalize">
                                            {formatPrice(detail[0].detail[0].payment.shipping_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].discount_amount ? (
                                    <div className="flex flex-row justify-between">
                                        <Typography className={cx('capitalize')}>{t('order:discount')}</Typography>
                                        <Typography letter="capitalize">
                                            {formatPrice(detail[0].detail[0].discount_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].aw_store_credit.is_use_store_credit ? (
                                    <div className="flex flex-row justify-between">
                                        <Typography className={cx('capitalize')}>{t('order:credit')}</Typography>
                                        <Typography letter="capitalize">
                                            {formatPrice(detail[0].detail[0].aw_store_credit.store_credit_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {modules.giftcard.enabled && detail[0].detail[0] && detail[0].detail[0].aw_giftcard.giftcard_amount ? (
                                    <div className="flex flex-row justify-between">
                                        <Typography className={cx('capitalize')}>
                                            {t('order:giftcard')} ({detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code})
                                        </Typography>
                                        <Typography letter="capitalize">
                                            {formatPrice(-detail[0].detail[0].aw_giftcard.giftcard_amount, currency, currencyCache)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].applied_extra_fee ? (
                                    <div className="flex flex-row justify-between">
                                        <Typography className={cx('capitalize')}>{detail[0].detail[0].applied_extra_fee.title}</Typography>
                                        <Typography letter="capitalize">
                                            {formatPrice(
                                                detail[0].detail[0].applied_extra_fee.extrafee_value.value,
                                                detail[0].detail[0].applied_extra_fee.extrafee_value.currency,
                                                currencyCache,
                                            )}
                                        </Typography>
                                    </div>
                                ) : null}
                                <div className="flex flex-row justify-between">
                                    <Typography variant="title" type="bold" className={cx('capitalize')}>
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
                <div className={cx('py-8')}>
                    <div className="mobile:basis-full">
                        <Typography className={cx('clear-margin-padding', 'text-xl')}>{t('order:orderInfo')}</Typography>
                        <hr className={cx('mt-2')} />
                    </div>
                    <div className="flex flex-row flex-wrap">
                        {Object.keys(detail[0].detail[0].shipping_address).length > 0 && (
                            // shipped to block
                            <div className="mobile:basis-6/12 tablet:basis-4/12 desktop:basis-3/12 col-xs-print-4 flex flex-col">
                                <Typography className={cx('pt-6', 'uppercase', 'font-semibold')}>
                                    {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                                        ? t('order:pickupAt')
                                        : t('order:shippedTo')}
                                </Typography>
                                <Typography className="clear-margin-padding">
                                    {detail[0].detail[0].shipping_address.firstname || ''} {detail[0].detail[0].shipping_address.lastname || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.street || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.city || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.region || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.country_id || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.telephone || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.postcode || ''}
                                </Typography>
                            </div>
                        )}
                        {detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store && (
                            // pickup store
                            <div className="mobile:basis-6/12 tablet:basis-4/12 desktop:basis-3/12 col-xs-print-3 flex flex-col">
                                <Typography className={cx('pt-6', 'uppercase', 'font-semibold')}>{t('order:pickupBy')}</Typography>
                                <Typography className="clear-margin-padding">
                                    {detail[0].detail[0].pickup_store.pickup_person.name}
                                    <br />
                                </Typography>
                                <Typography className="clear-margin-padding">
                                    {`Hp : ${detail[0].detail[0].pickup_store.pickup_person.handphone}`}
                                    <br />
                                </Typography>
                                <Typography className="clear-margin-padding">
                                    {`Email : ${detail[0].detail[0].pickup_store.pickup_person.email}`}
                                    <br />
                                </Typography>
                            </div>
                        )}
                        {/* shipping method */}
                        {Object.keys(detail[0].detail[0].shipping_address).length > 0 && (
                            <div className="mobile:basis-6/12 tablet:basis-4/12 desktop:basis-3/12 col-xs-print-3 flex flex-col">
                                <Typography className={cx('pt-6', 'uppercase', 'font-semibold')}>{t('order:shippingMethod')}</Typography>
                                <Typography className="clear-margin-padding">
                                    {detail[0].detail[0].shipping_methods.shipping_description || ''}
                                </Typography>
                            </div>
                        )}
                        {/* billing address */}
                        <div className="mobile:basis-6/12 tablet:basis-4/12 desktop:basis-3/12 col-xs-print-3 flex flex-col">
                            <Typography className={cx('pt-6', 'uppercase', 'font-semibold')}>{t('order:billingAddress')}</Typography>
                            <Typography className="clear-margin-padding">
                                {detail[0].detail[0].billing_address.firstname || ''} {detail[0].detail[0].billing_address.lastname || ''}
                                <br />
                                {detail[0].detail[0].billing_address.street || ''}
                                <br />
                                {detail[0].detail[0].billing_address.city || ''}
                                <br />
                                {detail[0].detail[0].billing_address.region || ''}
                                <br />
                                {detail[0].detail[0].billing_address.country_id || ''}
                                <br />
                                {detail[0].detail[0].billing_address.telephone || ''}
                                <br />
                                {detail[0].detail[0].billing_address.postcode || ''}
                            </Typography>
                        </div>
                        <div className="mobile:basis-6/12 tablet:basis-4/12 desktop:basis-3/12 col-xs-print-2 flex flex-col">
                            <Typography className={cx('pt-6', 'uppercase', 'font-semibold', 'pb-2')}>{t('order:paymentMethod')}</Typography>
                            {Object.keys(detail[0].detail[0].payment.payment_additional_info).map((item) => {
                                if (
                                    item !== '__typename' &&
                                    detail[0].detail[0].payment.payment_additional_info[item] !== '' &&
                                    detail[0].detail[0].payment.payment_additional_info[item] !== null
                                ) {
                                    return (
                                        <React.Fragment key={item}>
                                            <Typography className={cx('capitalize', 'font-semibold')}>{item.replace('_', ' ')}</Typography>
                                            <Typography className="clear-margin-padding">
                                                {detail[0].detail[0].payment.payment_additional_info[item] || ''}
                                            </Typography>
                                        </React.Fragment>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .swift-header-middle__logo-link {
                        cursor: pointer;
                        width: 120px;
                    }
                    .header-middle__left {
                        padding-bottom: 30px;
                    }

                    @media only print {
                        .col-xs-print-4 {
                            flex-basis: 33.333333%;
                            max-width: 33.333333%;
                        }
                        .col-xs-print-3 {
                            flex-basis: 25%;
                            max-width: 25%;
                        }
                        .col-xs-print-2 {
                            flex-basis: 16.666666%;
                            max-width: 16.666666%;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default PrintOrder;
