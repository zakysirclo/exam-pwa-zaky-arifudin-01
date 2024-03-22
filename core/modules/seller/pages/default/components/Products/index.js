/* eslint-disable no-unused-vars */
import { getEtalase } from '@core_modules/seller/services/graphql';
import CoreBase from '@plugin_productlist/core';
import React from 'react';
import TabLayout from '@core_modules/seller/pages/default/components/TabLayout';
import SellerInfo from '@core_modules/seller/pages/default/components/SellerInfo';
import EtalaseDesktop from '@core_modules/seller/pages/default/components/Products/etalaseDesktop';
import EtalaseMobile from '@core_modules/seller/pages/default/components/Products/etalaseMobile';
import Alert from '@common/Alert';
import SellerSkeleton from '@core_modules/seller/pages/default/components/Skeleton';

const ContentProducts = (props) => {
    const {
        storeConfig, t, dataSeller, errorSeller, loadingSeller, link, sellerPath, isLogin, route, handleChat, showChat, banner, ...other
    } = props;

    const { data } = getEtalase({
        variables: {
            sellerId: parseInt(dataSeller?.getSeller[0]?.id, 10),
        },
        skip: !dataSeller?.getSeller[0],
    });

    const dataEtalase = data && data.getEtalase.length > 0 ? data.getEtalase : null;

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
                            <div className="flex flex-row">
                                {
                                    dataEtalase && (
                                        <>
                                            <div className="md:basis-2/12 hidden-mobile">
                                                <EtalaseDesktop noBanner={banner} t={t} data={dataEtalase} route={route} />
                                            </div>
                                            <div className="hidden-desktop" style={{ width: '100%' }}>
                                                <EtalaseMobile noBanner={banner} t={t} data={dataEtalase} route={route} />
                                            </div>
                                        </>
                                    )
                                }
                                <div className={dataEtalase ? 'md:basis-10/12 basis-full' : 'md:basis-full'} style={{ width: '100%' }}>
                                    {
                                        dataSeller?.getSeller[0] && (
                                            <CoreBase
                                                t={t}
                                                // FilterModalView={FilterModalView}
                                                defaultSort={{ key: 'position', value: 'ASC' }}
                                                {...props}
                                                sellerId={JSON.stringify(dataSeller?.getSeller[0]?.seller_id)}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </TabLayout>
                    </div>
                </>
            )}
        </>
    );
};

export default ContentProducts;
