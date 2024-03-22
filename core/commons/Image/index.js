/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { generateThumborUrl } from '@helpers/image';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import NextImage from 'next/image';

const Container = ({
    children, enable, className, style,
}) =>
    (enable ? (
        <span className={className} style={style}>
            {children}
        </span>
    ) : (
        <>{children}</>
    ));

const CustomImage = ({
    src,
    width = 0,
    height = 0,
    // srcMobile = '',
    // widthMobile = 0,
    // heightMobile = 0,
    magezon,
    useContainer = true,
    classContainer = '',
    styleContainer: initStyleContainer = {},
    className = '',
    alt = 'Image',
    quality = 80,
    storeConfig = {},
    slickBanner = false,
    preload = false,
    style = '',
    retina = false,
}) => {
    const enable = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_https_http;
    const thumborUrl = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_url;

    let w = width;
    let h = height;
    if (retina) {
        w = width * 2;
        h = height * 2;
    }
    const optimizedUrl = src?.toLowerCase().indexOf('http://') === 0 || src?.toLowerCase().indexOf('https://') === 0
        ? generateThumborUrl(src, w, h, enable, useHttpsOrHttp, thumborUrl, quality)
        : src;

    const [imageUrl, setImageUrl] = useState(optimizedUrl);

    useEffect(() => {
        if (optimizedUrl !== imageUrl) {
            setImageUrl(optimizedUrl);
        }
    }, [optimizedUrl]);

    let styleContainer = {};
    let styleImage = style;
    if (useContainer) {
        styleContainer = {
            width: '100%',
            position: 'relative',
            paddingTop: `${(height / width) * 100}%`,
            overflow: 'hidden',
            display: 'block',
            ...initStyleContainer,
        };
        styleImage = {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            objectFit: 'cover',
        };
    }

    if (magezon) {
        styleContainer = {
            width: 'fit-content',
            overflow: 'hidden',
            display: 'block',
        };
        styleImage = {
            maxWidth: '100%',
            maxHeight: '100%',
            height: 'auto',
        };
    }

    if (slickBanner) {
        styleContainer = {};
        styleImage = {};
    }

    return (
        <Container enable={useContainer} className={classContainer} style={styleContainer}>
            <NextImage
                src={imageUrl}
                style={styleImage}
                className={cx('img', className)}
                alt={alt}
                width={width || 100}
                height={height || 100}
                unoptimized
                priority={preload}
                quality={quality}
            />
        </Container>
    );
};

export default CustomImage;
