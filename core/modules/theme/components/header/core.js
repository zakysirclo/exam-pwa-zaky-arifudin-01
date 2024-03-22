/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
import { useApolloClient } from '@apollo/client';
import { custDataNameCookie, modules } from '@config';
import Content from '@core_modules/theme/components/header/components';
import { getCategories, getCustomerLazy, removeToken } from '@core_modules/theme/services/graphql';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import { removeCookies } from '@helper_cookies';
import { priceVar } from '@core/services/graphql/cache';
import { localCompare, localTotalCart } from '@services/graphql/schema/local';
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { getCmsBlocks } from '@core_modules/cart/services/graphql';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const CoreTopNavigation = (props) => {
    const {
        dataMenu: propsMenu,
        storeConfig,
        t,
        app_cookies,
        isLogin,
        showGlobalPromo,
        enablePopupInstallation,
        appName,
        installMessage,
        isHomepage,
        deviceType,
        ...other
    } = props;
    const cmsStaticMainMenuIdentifier = storeConfig?.pwa?.megamenu_cms_block;
    let data = propsMenu;
    let loading = !propsMenu;
    const [deviceWidth, setDeviceWidth] = React.useState(0);
    const [customerData, setCustomerData] = React.useState({});

    const [getCustomerInfoLazy] = getCustomerLazy();
    if (!data && storeConfig && storeConfig.pwa) {
        const { data: dataMenu, loading: loadingMenu } = getCategories();
        data = dataMenu;
        loading = loadingMenu;
    }

    let cmsMenu;

    const { data: resCmsMenu } = getCmsBlocks({ identifiers: [cmsStaticMainMenuIdentifier] }, {
        skip: !cmsStaticMainMenuIdentifier,
    });

    if (resCmsMenu?.cmsBlocks?.items) {
        cmsMenu = resCmsMenu?.cmsBlocks?.items[0].content;
    }

    const [value, setValue] = React.useState('');
    const [deleteTokenGql] = removeToken();
    const client = useApolloClient();

    React.useEffect(() => {
        // get customer info data
        const getCustomerInfo = async () => {
            if (isLogin) {
                const custCookie = Cookies.getJSON(custDataNameCookie);
                if (custCookie) {
                    setCustomerData({ customer: custCookie });
                } else {
                    const res = await getCustomerInfoLazy();
                    const resData = res?.data;
                    if (resData) {
                        setCustomerData(resData);
                    }
                }
            }
        };

        if (typeof window !== 'undefined') {
            getCustomerInfo();
            setDeviceWidth(window.innerWidth);
        }
    }, []);

    const handleLogout = async () => {
        window.backdropLoader(true);
        if (publicRuntimeConfig && publicRuntimeConfig?.firebaseApiKey !== '') {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    // Sign-out successful.
                })
                .catch(() => {
                    // An error happened.
                });
        }
        await deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                Cookies.remove('admin_id');
                removeIsLoginFlagging();
                priceVar({});
                removeCartId();
                removeCookies('uid_product_compare');
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            })
            .catch(() => {
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            });
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            Router.push(`/catalogsearch/result?q=${encodeURIComponent(ev.target.value)}`);
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            Router.push(`/catalogsearch/result?q=${encodeURIComponent(value)}`);
        }
    };

    return (
        <Content
            t={t}
            isLogin={isLogin}
            data={data}
            loading={loading}
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            customer={customerData}
            handleLogout={handleLogout}
            value={value}
            app_cookies={app_cookies}
            showGlobalPromo={showGlobalPromo}
            modules={modules}
            enablePopupInstallation={enablePopupInstallation}
            appName={appName}
            installMessage={installMessage}
            isHomepage={isHomepage}
            deviceType={deviceType}
            deviceWidth={deviceWidth}
            cmsMenu={cmsMenu}
            {...other}
        />
    );
};

export default CoreTopNavigation;
