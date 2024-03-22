/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-console */
import { getCurrency } from '@core_modules/setting/services/graphql';
import cookies from 'js-cookie';
import React from 'react';

import ViewSwitcherCurrency from '@core_modules/theme/components/header/components/burgermenu/account/plugins/currency/view';

import { currencyVar } from '@core/services/graphql/cache';

const COOKIES_APP_CURRENCY = 'app_currency';

const SwitcherCurrency = (props) => {
    const [open, setOpen] = React.useState(false);

    const { data, loading } = getCurrency();
    const [currencyState, setCurrencyState] = React.useState(null);

    const mount = React.useRef();

    // cache currency
    const cacheCurrency = currencyVar();

    React.useEffect(() => {
        mount.current = true;
        return () => (mount.current = false);
    }, []);

    React.useEffect(() => {
        if (mount.current) {
            const getCurrencyFromStorage = () => {
                try {
                    /** [GET] Currency */
                    if (data && data.currency) {
                        /** [SET] Currency if not store in local storage */
                        const { currency } = data;
                        const { base_currency_code } = currency;
                        const { default_display_currency_code } = currency;
                        const { exchange_rates } = currency;
                        const exchange_rates_base = exchange_rates.filter((item) => item.currency_to === base_currency_code);
                        const exchange_rates_default = exchange_rates.filter((item) => item.currency_to === default_display_currency_code);
                        const base_currency_rate = exchange_rates_base[0].rate;
                        const default_currency_rate = exchange_rates_default[0].rate;

                        const getDataCookies =
                            cookies.get(COOKIES_APP_CURRENCY) !== undefined
                                ? JSON.parse(cookies.get(COOKIES_APP_CURRENCY))
                                : {
                                      base_currency_code,
                                      base_currency_rate,
                                      default_display_currency_code,
                                      default_currency_rate,
                                  };

                        const dataStore = { ...getDataCookies, exchange_rates };
                        cookies.set(COOKIES_APP_CURRENCY, getDataCookies);
                        currencyVar({
                            ...cacheCurrency,
                            appCurrency: JSON.stringify(getDataCookies),
                        });
                        setCurrencyState(dataStore);
                    }
                } catch (err) {
                    console.log('[err] get currency error', err);
                }
            };
            getCurrencyFromStorage();
        }
    }, [data]);

    /**
     * [METHOD] set default currency code
     * @param {string} code
     */
    const setDefaultCurrency = ({ default_display_currency_code, default_currency_rate }) => {
        const currentDefaultCurrency = { default_display_currency_code, default_currency_rate };
        const dataStore = { ...currencyState, ...currentDefaultCurrency };

        const dataCookiesObject = JSON.parse(cookies.get(COOKIES_APP_CURRENCY));
        const dataCookiesCurrency = { ...dataCookiesObject, ...currentDefaultCurrency };
        cookies.set(COOKIES_APP_CURRENCY, dataCookiesCurrency);
        setCurrencyState(dataStore);

        window.location.reload();
    };

    React.useEffect(() => {
        if (window !== 'undefined' && open) {
            const header = document.getElementById('header-inner');
            const checkScrollTop = () => {
                // handle show hide header
                if (header) {
                    if (
                        document.getElementById('top-header__content--currency-language-changer-menu__currency-switcher') &&
                        window.pageYOffset > 100
                    ) {
                        setOpen(false);
                    }
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        } else {
            window.removeEventListener('scroll', () => {}, false);
        }
    }, [open, window]);

    const propsOther = {
        open,
        setOpen,
        data,
        loading,
        currencyState,
        setDefaultCurrency,
    };

    return <ViewSwitcherCurrency {...props} {...propsOther} />;
};

export default SwitcherCurrency;
