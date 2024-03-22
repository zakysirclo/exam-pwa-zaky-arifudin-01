/* eslint-disable no-param-reassign */
const { general } = require('@config');
const cookies = require('js-cookie');

/**
 * [Object] get locale based on currency
 */
const currenciesToLocale = {
    IDR: 'id-ID', // Indonesian Rupiah
    USD: 'en-US', // US Dollar
    MMK: 'my-MM', // Myanmar Kyat
    SGD: 'en-SG', // Singapore Dollar
    MYR: 'ms-MY', // Malaysian Ringgit
};

/**
 * [METHOD] get currency [CURRENT] value
 * [NOTES] Currency Base on IDR 1
 * [NOTES] {USD}/{IDR} = 1/14820 = 0.0007
 * @param {object} APP_CURRENCY
 * @param {double} value
 */
const getCurrentCurrency = ({ APP_CURRENCY, value }) => {
    const APP_CURRENCY_OBJECT = JSON.parse(APP_CURRENCY);
    const rateDefaultCurrency = APP_CURRENCY_OBJECT.default_currency_rate;
    const codeDefaultCurrency = APP_CURRENCY_OBJECT.default_display_currency_code;

    const currency = codeDefaultCurrency;
    value = Math.floor(value * rateDefaultCurrency);

    return { currency, value };
};

/**
 * [METHOD] format for price
 * @param {double} value
 * @param {string} currency
 */
export const formatPrice = (value, currency = general.defaultCurrencyCode, currencyCache) => {
    let localeConfig = general.defaultCurrencyLocale;
    let enableRemoveDecimal = false;
    // set locale from storeConfig -> locale if exists, otherwise use default locale set in swift.config.js
    if (currencyCache) {
        localeConfig = currencyCache?.locale?.replace('_', '-');
        enableRemoveDecimal = currencyCache?.enableRemoveDecimal;
    }
    /**
     * window === undefined to handle localstorage from reload
     */

    const isServer = typeof window === 'undefined';

    // /* --- CHANGE TO CURRENT CURRENCY --- */
    if (!isServer) {
        if (currencyCache && currencyCache.appCurrency) {
            const getCurrent = getCurrentCurrency({ APP_CURRENCY: currencyCache.appCurrency, value });
            currency = getCurrent.currency;
            value = getCurrent.value;
            localeConfig = currenciesToLocale[currency];
        } else {
            const APP_CURRENCY = cookies.get('app_currency');
            if (APP_CURRENCY !== undefined) {
                const getCurrent = getCurrentCurrency({ APP_CURRENCY, value });
                currency = getCurrent.currency;
                value = getCurrent.value;
                localeConfig = currenciesToLocale[currency];
            }
        }
    }
    /* --- CHANGE TO CURRENT CURRENCY --- */

    const price = new Intl.NumberFormat(localeConfig, {
        style: 'currency',
        currency,
    }).format(value);

    const decimalFeature = () => {
        const decimal = price.substr(price.length - 3).substring(1);
        const resultDecimal = parseInt(decimal, 10);
        const resultPrice = price.slice(0, -3);
        if (resultDecimal === 0) {
            return resultPrice;
        }
        return price;
    };

    return enableRemoveDecimal === true ? decimalFeature() : price;
};

export default { formatPrice };
