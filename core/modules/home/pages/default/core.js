import Layout from '@layout';
import { getHost } from '@helper_config';
import Content from '@core_modules/home/pages/default/components';
import { currencyVar } from '@core/services/graphql/cache';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import cx from 'classnames';

const HomeCore = (props) => {
    // eslint-disable-next-line object-curly-newline
    const { pageConfig, storeConfig, homePageConfig, ...other } = props;

    const useCms = storeConfig?.pwa?.use_cms_page_enable;

    useEffect(() => {
        if (typeof window !== 'undefined' && storeConfig) {
            const appCurrency = Cookies.get('app_currency');
            currencyVar({
                currency: storeConfig.base_currency_code,
                locale: storeConfig.locale,
                enableRemoveDecimal: storeConfig?.pwa?.remove_decimal_price_enable,
                appCurrency,
            });
        }
    }, [storeConfig]);

    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [
                {
                    '@type': 'SearchAction',
                    target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            ],
        },
    ];

    const additionalStyle = cx('w-full', 'h-full', 'overflow-x-hidden', 'relative', {
        'p-0': useCms,
        'flex flex-col justify-center items-center pb-[30px]': !useCms,
    });

    const config = {
        ...pageConfig,
        title: storeConfig.default_title,
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
        tagSelector: `swift-page-home ${additionalStyle}`,
        schemaOrg,
    };

    return (
        <>
            {useCms ? (
                <Content cmsHome={config} storeConfig={storeConfig} homePageConfig={homePageConfig} {...other} />
            ) : (
                <Layout {...props} pageConfig={config} isHomepage>
                    <Content storeConfig={storeConfig} homePageConfig={homePageConfig} {...other} />
                </Layout>
            )}
        </>
    );
};

export default HomeCore;
