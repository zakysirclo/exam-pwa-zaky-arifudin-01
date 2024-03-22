/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import { translation } from '@config';
import { getStoreName } from '@core_modules/setting/services/graphql';
import ViewLanguage from '@core_modules/theme/components/header/components/burgermenu/account/plugins/language/view';
import cookies from 'js-cookie';
import { withTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';

const COOKIES_APP_LANG = 'app_lang';
const COOKIES_STORE_CODE = 'store_code_storage';

const SwitcherLanguage = (props) => {
    const { i18n, onCallbackLanguage } = props;
    const { data: remoteLang, loading: loadDataLang } = getStoreName();
    const [open, setOpen] = React.useState(false);
    const mount = useRef();
    const [lang, setLang] = useState({});

    const dataLang = [];
    /**
     * [useEffect] life cycle react
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current && remoteLang !== undefined) {
            if (remoteLang && remoteLang.availableStores) {
                const getLangFromStorage = () => {
                    // prettier-ignore
                    const defaultLangFromDatabase = translation.defaultLanguage;
                    const defaultLabel = translation.languagesLabel[translation.defaultLanguage];
                    const storeCode = cookies.get(COOKIES_STORE_CODE);
                    let defaultDataLang = {};
                    let loginAsCustomer = {};
                    remoteLang.availableStores.forEach(({ is_default_store, locale, store_code, store_name }) => {
                        if (is_default_store) {
                            defaultDataLang = {
                                label: store_name,
                                value: locale.slice(0, 2),
                                storeCode: store_code,
                            };
                        }
                        if (storeCode !== undefined && storeCode === store_code) {
                            loginAsCustomer = {
                                label: store_name,
                                value: locale.slice(0, 2),
                                storeCode: store_code,
                            };
                        }
                        return null;
                    });
                    if ((defaultDataLang && defaultDataLang.value === 'en') || (defaultDataLang && defaultDataLang.value === 'id')) {
                        const getDataCookies =
                            cookies.get(COOKIES_APP_LANG) !== undefined
                                ? JSON.parse(cookies.get(COOKIES_APP_LANG))
                                : {
                                      label: defaultDataLang && defaultDataLang.label,
                                      value: defaultDataLang && defaultDataLang.value,
                                  };
                        // i18n.changeLanguage(getDataCookies.value);
                        cookies.set(COOKIES_APP_LANG, getDataCookies);
                        setLang(getDataCookies);
                    } else {
                        const getDataCookies =
                            cookies.get(COOKIES_APP_LANG) !== undefined && defaultDataLang !== undefined
                                ? JSON.parse(cookies.get(COOKIES_APP_LANG))
                                : {
                                      label: defaultLabel,
                                      value: defaultLangFromDatabase,
                                  };
                        i18n.changeLanguage(getDataCookies.value);
                        cookies.set(COOKIES_APP_LANG, getDataCookies);
                        setLang(getDataCookies);
                    }
                    if (storeCode !== undefined && loginAsCustomer) {
                        const tempLang =
                            loginAsCustomer.value === 'en' || loginAsCustomer.value === 'id' ? loginAsCustomer.value : defaultLangFromDatabase;
                        const getDataCookies = {
                            label: loginAsCustomer.label,
                            value: tempLang,
                            storeCode: loginAsCustomer.storeCode,
                        };
                        i18n.changeLanguage(getDataCookies.value);
                        cookies.set(COOKIES_APP_LANG, getDataCookies);
                        setLang(getDataCookies);
                    }
                };
                getLangFromStorage();
            }
        }
        return () => (mount.current = false);
    }, [remoteLang]);
    /**
     * [METHOD] on click language
     */
    const onClickLanguage = ({ item }) => {
        const getDataSelect =
            item.value !== 'en' && item.value !== 'id'
                ? {
                      label: item.label,
                      value: translation.defaultLanguage,
                      storeCode: item.storeCode,
                  }
                : {
                      label: item.label,
                      value: item.value,
                      storeCode: item.storeCode,
                  };
        i18n.changeLanguage(getDataSelect.value);
        cookies.set(COOKIES_STORE_CODE, getDataSelect.storeCode);
        cookies.set(COOKIES_APP_LANG, getDataSelect);
        setLang(getDataSelect);
        setOpen(false);
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    React.useEffect(() => {
        if (window !== 'undefined' && open) {
            const header = document.getElementById('header-inner');
            const checkScrollTop = () => {
                // handle show hide header
                if (header) {
                    if (
                        document.getElementById('top-header__content--currency-language-changer-menu__language-switcher') &&
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

    if (remoteLang) {
        remoteLang.availableStores.map((item) => {
            dataLang.push({
                label: item.store_name,
                value: item.locale.slice(0, 2),
                storeCode: item.store_code,
            });
            return null;
        });
        const propsOther = {
            open,
            setOpen,
            dataLang,
            loadDataLang,
            lang,
            onCallbackLanguage,
            onClickLanguage,
        };
        return <ViewLanguage {...props} {...propsOther} remoteLang={remoteLang} />;
    }
    return null;
};

export default withTranslation()(SwitcherLanguage);
