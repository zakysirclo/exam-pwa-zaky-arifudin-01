/* eslint-disable no-lonely-if */
import config from '@config';
import { formatPrice } from '@helper_currency';
import { currencyVar } from '@core/services/graphql/cache';
import propTypes from 'prop-types';
import DesktopView from '@plugin_summary/components/DesktopSummary';
import { useEffect, useState } from 'react';

const CoreSummary = (props) => {
    const {
        isDesktop, dataCart, globalCurrency = 'IDR', storeConfig,
        ...other
    } = props;
    // cache currency
    const currencyCache = currencyVar();

    const [dataSummary, setDataSummary] = useState([]);
    const [total, setTotal] = useState(0);

    const { t } = other;
    const { modules } = config;

    useEffect(() => {
        const {
            prices = {},
            items = [],
            applied_store_credit = {},
            applied_reward_points = {},
            shipping_addresses = [],
            applied_extra_fee = {},
        } = dataCart;

        let { applied_giftcard = {} } = dataCart;

        if (modules.giftcard.useCommerceModule) {
            applied_giftcard = dataCart.applied_giftcards;
        }

        if (dataCart && items) {
            let newDataSummary = [];
            let subtotal;
            if (prices && prices.applied_taxes && prices.applied_taxes.length) {
                subtotal = formatPrice(
                    prices.subtotal_excluding_tax.value,
                    prices.subtotal_excluding_tax.currency, currencyCache || globalCurrency,
                    currencyCache,
                );
            } else {
                subtotal = formatPrice(
                    prices.subtotal_including_tax.value,
                    prices.subtotal_including_tax.currency || globalCurrency,
                    currencyCache,
                );
            }
            setTotal(prices.grand_total);
            const [shipping] = shipping_addresses;

            let haveOthersTotal;

            if (prices && prices.applied_taxes && prices.applied_taxes.length) {
                const taxes = prices.applied_taxes.reduce(
                    (prev, curr) => ({
                        value: prev.value + curr.amount.value,
                        currency: curr.amount.currency,
                    }),
                    // eslint-disable-next-line comma-dangle
                    { value: 0 }
                );
                const price = formatPrice(taxes.value, taxes.currency, currencyCache);
                newDataSummary.push({ item: t('common:summary:tax'), value: price });
                haveOthersTotal = true;
            }

            if (modules.checkout.extraFee.enabled && applied_extra_fee && applied_extra_fee.extrafee_value) {
                newDataSummary.push({
                    item: applied_extra_fee.title || '',
                    value: formatPrice(
                        applied_extra_fee.extrafee_value.value ? applied_extra_fee.extrafee_value.value : 0,
                        globalCurrency,
                        currencyCache,
                    ),
                });
                haveOthersTotal = true;
            }

            if (storeConfig.enable_oms_multiseller && storeConfig.enable_oms_multiseller !== '0') {
                const multiShipping = shipping_addresses;
                let totalShipping = 0;
                // eslint-disable-next-line array-callback-return
                multiShipping.map((ship) => {
                    if (ship.selected_shipping_method) {
                        totalShipping += ship.selected_shipping_method.amount.value;
                    }
                });
                const price = formatPrice(totalShipping, storeConfig.base_currency_code, currencyCache);
                newDataSummary.push({ item: 'shipping', value: price });
                haveOthersTotal = true;
            } else {
                if (shipping && shipping.selected_shipping_method) {
                    const shippingMethod = shipping.selected_shipping_method;
                    const price = formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency, currencyCache);
                    newDataSummary.push({ item: 'shipping', value: price });
                    haveOthersTotal = true;
                }
            }
            if (prices && prices.discounts && prices.discounts.length) {
                const discounts = prices.discounts.map((disc) => {
                    const price = formatPrice(disc.amount.value, disc.amount.currency, currencyCache);
                    return { item: `${disc.label}`, value: `-${price}` };
                });
                newDataSummary = newDataSummary.concat(discounts);
                haveOthersTotal = true;
            }

            if (modules.storecredit.enabled) {
                let price = '';
                if (
                    modules.storecredit.useCommerceModule
                                           && applied_store_credit.applied_balance
                                           && applied_store_credit.applied_balance.value > 0
                ) {
                    price = formatPrice(Math.abs(applied_store_credit.applied_balance.value), globalCurrency, currencyCache);
                } else if (applied_store_credit.is_use_store_credit) {
                    price = formatPrice(Math.abs(applied_store_credit.store_credit_amount), globalCurrency, currencyCache);
                }
                if (price !== '') {
                    newDataSummary.push({ item: `${t('common:summary:storeCredit')} `, value: `-${price}` });
                    haveOthersTotal = true;
                }
            }

            if (modules.rewardpoint.enabled && applied_reward_points.is_use_reward_points) {
                const price = formatPrice(Math.abs(applied_reward_points.reward_points_amount), globalCurrency, currencyCache);
                newDataSummary.push({ item: `${t('common:summary:rewardPoint')} `, value: `-${price}` });
                haveOthersTotal = true;
            }

            if (modules.giftcard.enabled && Object.keys(applied_giftcard).length > 0) {
                let giftCards = [];
                if (modules.giftcard.useCommerceModule) {
                    if (applied_giftcard && applied_giftcard.length > 0) {
                        giftCards = applied_giftcard.map((item) => {
                            const price = formatPrice(Math.abs(item.applied_balance.value), globalCurrency, currencyCache);
                            return { item: `${t('common:summary:giftCard')} (${item.code}) - ${price}`, value: `-${price}` };
                        });
                    }
                } else {
                    giftCards = applied_giftcard.giftcard_detail.map((item) => {
                        const price = formatPrice(Math.abs(item.giftcard_amount_used), globalCurrency, currencyCache);
                        return { item: `${t('common:summary:giftCard')} (${item.giftcard_code}) - ${price}`, value: `-${price}` };
                    });
                }
                if (giftCards.length) haveOthersTotal = true;
                newDataSummary = newDataSummary.concat(giftCards);
            }

            if (haveOthersTotal) {
                newDataSummary.unshift({ item: 'Subtotal', value: subtotal });
            }
            setDataSummary(newDataSummary);
        }
    }, [dataCart]);

    return (
        <DesktopView
            items={dataCart.items}
            summary={{ total, data: dataSummary }}
            isDesktop={isDesktop}
            {...other}
            dataCart={dataCart}
            storeConfig={storeConfig}
            currencyCache={currencyCache}
        />
    );
};

CoreSummary.propTypes = {
    deleteCart: propTypes.func,
    updateCart: propTypes.func,
    withAction: propTypes.bool,
};

CoreSummary.defaultProps = {
    deleteCart: () => {},
    updateCart: () => {},
    withAction: false,
};

export default CoreSummary;
