/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import Link from 'next/link';
import React from 'react';
import { basePath, modules } from '@config';
import cx from 'classnames';

const ImageDetail = (props) => {
    const {
        handleClick, small_image, spesificProduct, urlKey, name, storeConfig = {},
        classContainer = '', className = '', isGrid, preload = false,
    } = props;

    let defaultWidth = modules?.catalog?.productListing?.imageSize?.width;
    let defaultHeight = modules?.catalog?.productListing?.imageSize?.height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 10);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 10);

    let classImage = '!w-[144px] !h-[144px] tablet:!w-[205px] tablet:!h-[205px] desktop:!w-[250px] desktop:!h-[250px]';

    const imageUrl = spesificProduct.id
        ? spesificProduct.image.url
        : small_image?.url || `${basePath}/assets/img/placeholder.png`;

    const imageAlt = small_image?.label || name;

    if (!isGrid) {
        classImage = '!w-[120px] !h-[120px] tablet:!w-[320px] tablet:!h-[320px] desktop:!w-[320px] desktop:!h-[320px]';
    }

    return (
        <Link
            href={{
                pathname: '/[...slug]',
                query: {
                    slug: urlKey,
                },
            }}
            onClick={handleClick}
            className={cx('overflow-hidden flex justify-center')}
        >
            <Thumbor
                src={imageUrl}
                className={cx(classImage, 'overflow-hidden', className)}
                classContainer={cx(classImage, classContainer)}
                styleContainer={{ padding: 0 }}
                width={defaultWidth}
                height={defaultHeight}
                quality={80}
                alt={imageAlt}
                storeConfig={storeConfig}
                preload={preload}
                retina
            />
        </Link>
    );
};

export default ImageDetail;
