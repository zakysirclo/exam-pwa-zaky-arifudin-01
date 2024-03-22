// /* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable radix */
/* eslint-disable max-len */
import {
    // custDataNameCookie,
    features,
    modules,
    // sentry
} from '@config';
import { getLastPathWithoutLogin } from '@helper_auth';
import { setLocalStorage, setResolver, testLocalStorage } from '@helper_localstorage';
import { getAppEnv } from '@core/helpers/env';
import { cmsPageVar, currencyVar, storeConfigVar } from '@core/services/graphql/cache';
import { storeConfig as ConfigSchema, getCategories } from '@services/graphql/schema/config';
import { appWithTranslation } from 'next-i18next';
import Cookie from 'js-cookie';
import App from 'next/app';
import React from 'react';
import { gql } from '@apollo/client';
import graphRequest from '@graphql_request';
import getConfig from 'next/config';
import TagManager from 'react-gtm-module';
import ModalCookies from '@core_modules/theme/components/modalCookies';
import { getDeviceByUA, getUAString } from '@core/helpers/deviceDection';
import { availableRoute } from '@core/middlewares/routeServer';
import { getStoreHost } from '@core/helpers/config';

/* Firebase /*
/* Commented by default to avoid unused code which directly impact on performance socre
 * Uncomment this if firebase is used in you progect
 */
import firebase from '@lib_firebase/index';
import Notification from '@lib_firebase/notification';

/* Sentry /*
/* Commented by default to avoid unused code which directly impact on performance socre
 * Uncomment this if sentry is used in you progect
 */
// import { RewriteFrames } from '@sentry/integrations';
// import { Integrations } from '@sentry/tracing';
// import * as Sentry from '@sentry/node';

// sentry imports
// import * as Sentry from '@sentry/node';
// import { RewriteFrames } from '@sentry/integrations';
// import { Integrations } from '@sentry/tracing';
// import { RewriteFrames } from '@sentry/integrations';
// import { Integrations } from '@sentry/tracing';

// import { useApollo } from '@core/lib/apollo/apolloClient';

const { publicRuntimeConfig } = getConfig();

/*
 * ---------------------------------------------
 * SENTRY INITIALIZATION
 * code is commented avoid Sentry in js bundle (performance purposed). feel free to uncoment if you need to implement sentry
 */
// if (sentry.enabled && typeof publicRuntimeConfig !== 'undefined' && sentry.dsn[publicRuntimeConfig.appEnv]) {
//     const distDir = `${publicRuntimeConfig.rootDir}/.next`;
//     Sentry.init({
//         enabled: process.env.NODE_ENV === sentry.enableMode,
//         integrations: [
//             new RewriteFrames({
//                 iteratee: (frame) => {
//                     // eslint-disable-next-line no-param-reassign
//                     frame.filename = frame.filename.replace(distDir, 'app:///_next');
//                     return frame;
//                 },
//             }),
//             new Integrations.BrowserTracing(),
//         ],
//         environment: publicRuntimeConfig.appEnv,
//         dsn: sentry.dsn[publicRuntimeConfig.appEnv],
//         tracesSampleRate: 0.5,
//     });
// }

class MyApp extends App {
    static async getInitialProps(appContex) {
        const { Component, ctx } = appContex;
        const uastring = getUAString(appContex);
        const deviceType = getDeviceByUA(uastring);

        let { pageProps } = await App.getInitialProps(appContex);

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const { req, res, pathname } = ctx;
        /*
         * ---------------------------------------------
         * MAINTAIN LOGIN FLAG
         * check if login from server
         */
        let lastPathNoAuth = '';
        // let customerData = {};
        let removeDecimalConfig;
        if (typeof window !== 'undefined') {
            lastPathNoAuth = getLastPathWithoutLogin();
            // customerData = Cookie.getJSON(custDataNameCookie);
        } else {
            // customerData = allcookie[custDataNameCookie];
            lastPathNoAuth = req.cookies && typeof req.cookies !== 'undefined' && req.cookies.lastPathNoAuth && typeof req.cookies.lastPathNoAuth !== 'undefined'
                ? req.cookies.lastPathNoAuth
                : '/customer/account';
        }

        /*
         * ---------------------------------------------
         * [COOKIES] OTHER
         */
        const app_cookies = { cookies_currency: req ? req.cookies.app_currency : null };

        /*
         * ---------------------------------------------
         * Set Cache Control response header to enable varnish caching
         */
        if (typeof window === 'undefined') {
            res.setHeader('Cache-Control', 'public');
        }

        /**
         * Handling Checkout Only
         */

        if (modules.checkout.checkoutOnly) {
            const allow = availableRoute(pathname.trim().split('?')[0]);
            if (!allow) {
                if (typeof window !== 'undefined') {
                    window.location.href = getStoreHost(getAppEnv());
                } else {
                    res.statusCode = 302;
                    res.setHeader('Location', getStoreHost(getAppEnv()));
                }
            }
        }

        /*
         * ---------------------------------------------
         * GET CONFIGURATIONS FROM COOKIES
         * TO BE PROVIDED INTO PAGE PROPS
         */
        let dataMenu;
        let frontendOptions;
        let { storeConfig } = pageProps;

        if (typeof window === 'undefined' && (!storeConfig || typeof storeConfig.secure_base_media_url === 'undefined')) {
            // storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
            /** comment data cache from internal request * */
            // storeConfig = await requestInternal('getConfig');
            storeConfig = await graphRequest(ConfigSchema);
            frontendOptions = storeConfig;
            // Handle redirecting to tomaintenance page automatically when GQL is in maintenance mode.
            // We do this here since query storeConfig is the first query and be done in server side
            if (ctx && storeConfig.response && storeConfig.response.status && storeConfig.response.status > 500) {
                ctx.res.writeHead(302, {
                    Location: '/maintenance',
                });
                ctx.res.end();
            }
            storeConfig = storeConfig.storeConfig;
            if (!modules.checkout.checkoutOnly) {
                dataMenu = await graphRequest(getCategories, {}, {}, { method: 'GET' });
            }
            frontendOptions = frontendOptions.storeConfig;
            removeDecimalConfig = storeConfig?.pwa?.remove_decimal_price_enable !== null ? storeConfig?.pwa?.remove_decimal_price_enable : false;
        } else if (typeof window !== 'undefined' && !storeConfig) {
            storeConfig = storeConfigVar();
            if (!storeConfig || storeConfig === '' || (typeof storeConfig === 'object' && Object.keys(storeConfig).length === 0)) {
                storeConfig = await pageProps.apolloClient
                    .query({
                        query: gql`
                            ${ConfigSchema}
                        `,
                    })
                    .then(({ data }) => data);

                // Handle redirecting to tomaintenance page automatically when GQL is in maintenance mode.
                // We do this here since query storeConfig is the first query and be done in server side
                if (ctx && storeConfig.response && storeConfig.response.status && storeConfig.response.status > 500) {
                    ctx.res.writeHead(302, { Location: '/maintenance' });
                }

                storeConfig = storeConfig.storeConfig;
            }

            frontendOptions = storeConfig;
            removeDecimalConfig = storeConfig?.pwa?.remove_decimal_price_enable !== null ? storeConfig?.pwa?.remove_decimal_price_enable : false;
        }

        /*
         * ---------------------------------------------
         * RETURNS
         */

        return {
            pageProps: {
                ...pageProps,
                app_cookies,
                storeConfig,
                lastPathNoAuth,
                removeDecimalConfig,
                dataMenu,
                frontendOptions,
                deviceType,
            },
        };
    }

    componentDidMount() {
        /*
         * ---------------------------------------------
         * ADDING CUSTOM SERVICE WORKER
         */
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production' && typeof document !== 'undefined') {
            if (document.readyState === 'complete') {
                this.registerServiceWorker();
            } else {
                window.addEventListener('load', () => {
                    this.registerServiceWorker();
                });
            }
        }

        /*
         * ---------------------------------------------
         * REMOVE CONSOLE
         * remove all console.log statement when APP_ENV = 'prod'
         */
        if (getAppEnv() === 'prod') {
            // eslint-disable-next-line no-console
            console.log = () => {};
        }

        /*
         * ---------------------------------------------
         * FIREBASE INITIALIZATION
         */
        if (publicRuntimeConfig && publicRuntimeConfig.firebaseApiKey && features.firebase.pushNotification.enabled) {
            // initial firebase messaging
            Notification.init();
            // handle if have message on focus
            try {
                // eslint-disable-next-line no-undef
                const messaging = firebase.messaging();
                // Handle incoming messages. Called when:
                // - a message is received while the app has focus
                // - the user clicks on an app notification created by a service worker
                //   `messaging.setBackgroundMessageHandler` handler.
                messaging.onMessage((payload) => {
                    navigator.serviceWorker.ready.then((registration) => {
                        // This prevents to show one notification for each tab
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.log('[firebase-messaging-sw.js] Received foreground message ', payload);
                            const lastNotification = localStorage.getItem('lastNotification');
                            const isDifferentContent = payload.data.updated_date !== lastNotification;
                            if (isDifferentContent) {
                                localStorage.setItem('lastNotification', payload.data.updated_date + payload.data.title);
                                registration.showNotification(payload.data.title, {
                                    body: payload.data.body,
                                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                                    icon: payload.data.icons || '',
                                    image: payload.data.image || '',
                                    requireInteraction: true,
                                    data: payload.data,
                                });
                            }
                        }, Math.random() * 1000);
                    });
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        }

        /*
         * ---------------------------------------------
         * GTM INITIALIZATION
         */

        /* Google Tag Manager
         * this gtm configuration is enabled via backoffice.
         * before enable this configuration, firstly you need to import the gtm tags json.
         * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
         * adjust the tag name if you want before import into GTM dashboard setting.
         * as reference you can find sample gtm tags in folder "sample/gtm" folder
         * NOTE: this GTM functionality includes connecting to GA via GTM tag.
         */

        const storeConfig = storeConfigVar();
        let GTM = {};

        if (storeConfig && storeConfig.pwa) {
            GTM = {
                enable: storeConfig && storeConfig.pwa.gtm_enable,
                // enable: true,
                gtmId: {
                    local: 'GTM-5G5TGZ6',
                    dev: storeConfig && storeConfig.pwa.gtm_id_dev ? storeConfig.pwa.gtm_id_dev : '',
                    stage: storeConfig && storeConfig.pwa.gtm_id_stage ? storeConfig.pwa.gtm_id_stage : '',
                    prod: storeConfig && storeConfig.pwa.gtm_id_prod ? storeConfig.pwa.gtm_id_prod : '',
                },
            };
        }

        const tagManagerArgs = {
            gtmId: 'GTM-5G5TGZ6',
        };
        if (GTM.enable) TagManager.initialize(tagManagerArgs);

        /*
         * ---------------------------------------------
         * COOKIE CLEARANCE
         * remove config cookie if the page is reloaded
         */
        if (typeof window !== 'undefined') {
            window.onbeforeunload = function () {
                setResolver({});
            };
        }
    }

    registerServiceWorker() {
        // navigator.serviceWorker.register(`${basePath}/service-worker.js`).then(
        //     (registration) => {
        //         // eslint-disable-next-line no-console
        //         console.log('Service Worker registration successful with scope: ', registration.scope);
        //     },
        //     (err) => {
        //         // eslint-disable-next-line no-console
        //         console.log('Service Worker registration failed: ', err);
        //     },
        // );
    }

    render() {
        const { Component, pageProps } = this.props;
        pageProps.storeConfig = pageProps.storeConfig ? pageProps.storeConfig : {};
        if (typeof window !== 'undefined' && testLocalStorage() === false) {
            // not available
            return <ModalCookies {...pageProps} />;
        }

        if (typeof window !== 'undefined') {
            cmsPageVar(pageProps.storeConfig && pageProps.storeConfig.cms_page ? pageProps.storeConfig.cms_page : '');
            storeConfigVar(pageProps.storeConfig);
            setLocalStorage('remove_decimal_config', pageProps.removeDecimalConfig);
            setLocalStorage('pricing_config', {
                locales: pageProps.storeConfig && pageProps.storeConfig.locale,
                remove_decimal_config: pageProps.removeDecimalConfig,
            });
            const appCurrency = Cookie.get('app_currency');
            currencyVar({
                currency: pageProps.storeConfig.base_currency_code,
                locale: pageProps.storeConfig.locale,
                enableRemoveDecimal: pageProps.storeConfig?.pwa?.remove_decimal_price_enable,
                appCurrency,
            });
        }

        return (
            <>
                <Component {...pageProps} />
            </>
        );
    }
}

export default appWithTranslation(MyApp);
