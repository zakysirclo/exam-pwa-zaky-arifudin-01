/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import ContainerScroll from '@common/ContainerScroll';
import cx from 'classnames';
import React from 'react';

const Caraousel = (props) => {
    const {
        data = [],
        showArrow = true,
        Item,
        storeConfig = {},
        className = '',
        classNameCarousel = '',
        classNameItem = '',
        children,
        ...other
    } = props;

    return (
        <div className={cx('carousel', className)}>
            <ContainerScroll showArrow={showArrow} className={classNameCarousel}>
                {data?.length > 0 && data.map((item, key) => (
                    <Item
                        className={cx(
                            'carousel-item',
                            '[&:not(:last-child)]:mr-4',
                            '!min-w-[160px]',
                            'tablet:!min-w-[230px]',
                            'desktop:!min-w-[288px]',
                            '!h-[initial]',
                            classNameItem,
                        )}
                        key={key}
                        {...item}
                        storeConfig={storeConfig}
                        imageProps={{
                            className: cx(
                                'product-image',
                                '!w-[144px]',
                                '!h-[144px]',
                                'tablet:!w-[205px]',
                                'tablet:!h-[205px]',
                                'desktop:!w-[256px]',
                                'desktop:!h-[256px]',
                            ),
                            classContainer: cx(
                                'product-image-container',
                                '!w-[144px]',
                                '!h-[144px]',
                                'tablet:!w-[205px]',
                                'tablet:!h-[205px]',
                                'desktop:!w-[256px]',
                                'desktop:!h-[256px]',
                            ),
                        }}
                        enableQuickView
                        {...other}
                    />
                ))}
                {data.length === 0 && children ? children : null}
            </ContainerScroll>
            <style jsx>
                {`
                    .carousel :global(.carousel-item) {
                        overflow: unset;
                        width: auto;
                    }
                `}
            </style>
        </div>
    );
};

export default Caraousel;
