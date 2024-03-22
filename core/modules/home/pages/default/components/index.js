/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
// import Thumbor from '@common_image';
import CmsPage from '@core_modules/cms/pages/default/core';
import Layout from '@layout';

const Content = (props) => {
    const {
        cmsHome, homePageConfig, storeConfig: config, ...other
    } = props;
    let storeConfig = config;
    let useCmsPage = {};

    if (homePageConfig && homePageConfig.pwa) {
        storeConfig = {
            ...config,
            pwa: {
                ...config.pwa,
                ...homePageConfig.pwa,
            },
        };
        useCmsPage = {
            enable: storeConfig.pwa.use_cms_page_enable,
            identifier: storeConfig.pwa.use_cms_page_identifier,
        };
    }

    let content = '';

    if (homePageConfig && useCmsPage && useCmsPage.enable) {
        content = (
            <CmsPage
                slug={[useCmsPage.identifier]}
                withLayoutHeader
                withLayoutFooter
                withCmsTitle={false}
                {...other}
                storeConfig={storeConfig}
                pageConfig={cmsHome}
            />
        );
    } else {
        const Config = {
            title: storeConfig && storeConfig.store_name ? storeConfig.store_name : 'PWA Homepage',
            headerTitle: storeConfig && storeConfig.store_name ? storeConfig.store_name : 'PWA Homepage',
            bottomNav: false,
            header: 'relative', // available values: "absolute", "relative", false (default)
        };
        content = (
            <Layout {...props} pageConfig={Config} isCms={false} isHomepage>
                <>You need to develop your own non-CMS component for Homepage.</>
            </Layout>
        );
    }

    return <>{content}</>;
};

export default Content;
