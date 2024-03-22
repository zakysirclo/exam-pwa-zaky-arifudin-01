/* eslint-disable object-curly-newline */
// import { getProduct } from '@core_modules/catalog/services/graphql';
/* eslint-disable eqeqeq */
import { getSeller } from '@core_modules/seller/services/graphql';
import { getHost } from '@helper_config';
import Layout from '@layout';
import { useRouter } from 'next/router';
import React from 'react';
import Content from '@core_modules/seller/pages/default/components';
import ContentProducts from '@core_modules/seller/pages/default/components/Products';
import { getLoginInfo } from '@helper_auth';

const Seller = (props) => {
    const { t, storeConfig, pageConfig, ...other } = props;
    const router = useRouter();

    const isLogin = getLoginInfo();

    const {
        data: dataSeller,
        error: errorSeller,
        loading: loadingSeller,
    } = getSeller({
        variables: {
            seller_path: router.query.sellerPath,
        },
    });

    const bannerMobile = dataSeller?.getSeller?.length > 0 && dataSeller?.getSeller[0]?.banner_mobile;
    const bannerDesktop = dataSeller?.getSeller?.length > 0 && dataSeller?.getSeller[0]?.banner_desktop;

    const config = {
        title: dataSeller && dataSeller.getSeller.length > 0 && dataSeller.getSeller[0].name ? dataSeller.getSeller[0].name : 'Seller Page', // t('forgotpassword:title')
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: dataSeller && dataSeller.getSeller.length > 0 && dataSeller.getSeller[0].name ? dataSeller.getSeller[0].name : 'Seller Page', // t('forgotpassword:title')
        bottomNav: true,
        customFilter: false,
        search: '',
        pageSize: 8,
        currentPage: 1,
        filter: [],
        pageType: 'seller',
        tagSelector: 'swift-page-seller',
        ...storeConfig.pwa,
    };

    const link = getHost() + router.asPath;

    const [showChat, setShowChat] = React.useState(false);
    const handleChat = () => {
        if (isLogin && isLogin == 1) {
            setShowChat(!showChat);
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: 'to continue chat, please log in first',
            });
        }
    };

    return (
        <Layout isShowChat={false} pageConfig={pageConfig || config} {...props} data={dataSeller} isSellerPage>
            {bannerMobile && router.route === '/seller/[sellerPath]' ? (
                <Content
                    t={t}
                    storeConfig={storeConfig}
                    dataSeller={dataSeller}
                    errorSeller={errorSeller}
                    loadingSeller={loadingSeller}
                    link={link}
                    route={router}
                    isLogin={isLogin}
                    handleChat={handleChat}
                    showChat={showChat}
                    banner={!bannerDesktop || !bannerMobile}
                    {...other}
                />
            ) : (
                <ContentProducts
                    t={t}
                    storeConfig={storeConfig}
                    dataSeller={dataSeller}
                    errorSeller={errorSeller}
                    loadingSeller={loadingSeller}
                    link={link}
                    route={router}
                    isLogin={isLogin}
                    handleChat={handleChat}
                    showChat={showChat}
                    banner={!bannerDesktop || !bannerMobile}
                    {...other}
                />
            )}
        </Layout>
    );
};

export default Seller;
