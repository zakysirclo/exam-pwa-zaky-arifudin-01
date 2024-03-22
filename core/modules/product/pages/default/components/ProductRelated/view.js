import React from 'react';
import dynamic from 'next/dynamic';
import propTypes from 'prop-types';
import cx from 'classnames';
import Typography from '@common_typography';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });
const ProductItem = dynamic(() => import('@plugin_productitem'), { ssr: false });

const ProductRelatedView = ({
    data, t, storeConfig, carouselProps,
}) => (
    <div className={cx('product-related-container', 'xs:basis-full lg:basis-full')}>
        <Typography
            variant="h1"
            className={
                cx(
                    'desktop:mb-[24px] tablet:mb-[16px] mobile:mb-[16px]',
                    'desktop:mx-[0px] tablet:mx-[16px] mobile:mx-[16px]',
                )
            }
        >
            {t('common:title:relatedProduct')}
        </Typography>
        <Caraousel
            enableQuickView={false}
            data={data}
            Item={ProductItem}
            storeConfig={storeConfig}
            classNameCarousel="desktop:m-0 tablet:m-0 mobile:m-0 desktop:!p-0 tablet:!p-4 !mobile:!p-4"
            {...carouselProps}
        />
    </div>
);

ProductRelatedView.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: propTypes.array,
    t: propTypes.func.isRequired,
};

ProductRelatedView.defaultProps = {
    data: [],
};

export default ProductRelatedView;
