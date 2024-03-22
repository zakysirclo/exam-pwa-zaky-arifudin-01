/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import { getBannerSeller } from '@core_modules/seller/services/graphql';
import Typography from '@common_typography';
import React from 'react';
import TabLayout from '@core_modules/seller/pages/default/components/TabLayout';
import SellerInfo from '@core_modules/seller/pages/default/components/SellerInfo';
import DesktopContent from '@core_modules/seller/pages/default/components/desktop';
import MobileContent from '@core_modules/seller/pages/default/components/mobile';
import Alert from '@common/Alert';
import SellerSkeleton from '@core_modules/seller/pages/default/components/Skeleton';

const Content = (props) => {
    const { storeConfig, t, dataSeller, errorSeller, loadingSeller, link, isLogin, route, handleChat, showChat, banner, ...other } = props;

    return (
        <>
            {
                loadingSeller && (
                    <SellerSkeleton />
                )
            }
            {!loadingSeller && ((dataSeller && dataSeller.getSeller.length === 0) || errorSeller) && (
                <Alert severity="error">
                    {t('seller:notFound')}
                </Alert>
            )}
            {dataSeller && dataSeller.getSeller.length > 0 && (
                <>
                    <SellerInfo {...props} />
                    <div className="mt-5">
                        <TabLayout noBanner={banner} t={t}>
                            {
                                dataSeller && dataSeller.getSeller && dataSeller.getSeller.length > 0 && (
                                    <>
                                        <div className="hidden desktop:block">
                                            <DesktopContent data={JSON.parse(dataSeller.getSeller[0].banner_desktop)} storeConfig={storeConfig} />
                                        </div>
                                        <div className="block desktop:hidden">
                                            <MobileContent data={JSON.parse(dataSeller.getSeller[0].banner_mobile)} storeConfig={storeConfig} />
                                        </div>
                                    </>
                                )
                            }
                        </TabLayout>
                    </div>
                </>
            )}
        </>
    );
};

export default Content;
