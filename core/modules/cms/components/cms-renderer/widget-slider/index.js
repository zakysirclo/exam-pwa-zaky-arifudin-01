import React, { useMemo } from 'react';
import gqlService from '@core_modules/home/service/graphql';
import BannerSliderSkeleton from '@core_modules/cms/components/cms-renderer/widget-slider/skeleton';
import Banner from '@common_slick/Banner';
import Alert from '@common_alert';
import Show from '@common_show';

const WidgetSlider = (props) => {
    const { storeConfig, t, slider_id } = props;
    const logoUrl = `${storeConfig && storeConfig.secure_base_media_url}logo/${storeConfig && storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getSlider({
        skip: !storeConfig,
        variables: {
            input: slider_id === undefined ? { title: '' } : { id: typeof slider_id === 'string' ? parseInt(slider_id, 10) : slider_id },
        },
    });

    const bannerImages = useMemo(() => {
        if (data?.slider) {
            return data?.slider?.images?.map((image) => ({
                imageUrl: image.image_url,
                mobileImageUrl: image.mobile_image_url || image.image_url,
                link: image.url_redirection,
                video: image.video,
            }));
        }
        return null;
    }, [data?.slider]);

    if (loading && !data) {
        return <BannerSliderSkeleton logoUrl={logoUrl} storeConfig={storeConfig} />;
    }
    if (error) {
        return <Alert variant="error">{t('home:errorFetchData')}</Alert>;
    }
    if (!data || data.slider.images.length === 0) {
        return <Alert variant="warning">{t('home:nullData')}</Alert>;
    }
    if (data && data.slider) {
        return (
            <div className="w-full" id="home-banner">
                <Show when={bannerImages?.length}>
                    <Banner data={bannerImages} storeConfig={storeConfig} />
                </Show>
            </div>
        );
    }

    return <></>;
};

export default WidgetSlider;
