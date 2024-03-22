/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import PlayCircleIcon from '@heroicons/react/20/solid/PlayCircleIcon';
import { generateThumborUrl } from '@helpers/image';
import cx from 'classnames';
import CommonImage from '@common_image';

const ImageElement = (props) => {
    // prettier-ignore
    const {
        image, type, link,
        video_url, baseUrl,
        full_image, pauseSlick,
        height, fit, caption,
        captions, storeConfig,
        dimensions,
    } = props;
    const videoCover = React.useRef();

    const videoUrl = video_url && video_url.split('=')[1];
    // prettier-ignore
    const imgUrl = type === 'link'
        ? link
        : type === 'media'
            ? full_image
                ? `${baseUrl}${full_image}`
                : `${baseUrl}${image}`
            : `${baseUrl}${image}`;
    const enable = storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig.pwa.thumbor_https_http;
    const url = storeConfig.pwa.thumbor_url;

    const slideHeight = storeConfig.pwa?.magezon_slider_desktop_height;
    const slideWidth = storeConfig.pwa?.magezon_slider_desktop_width;
    const getImgUrl = generateThumborUrl(imgUrl, slideWidth, slideHeight, enable, useHttpsOrHttp, url);

    if (type === 'link' || type === 'media') {
        return (
            <>
                <div className="mgz-img-gallery-img-container" onClick={pauseSlick} style={{ ...dimensions }}>
                    {captions && caption && (
                        <div className="mgz-img-gallery-caption z-10">
                            <WidgetRenderer content={caption} />
                        </div>
                    )}
                    <CommonImage
                        src={getImgUrl}
                        width={slideWidth}
                        height={slideHeight}
                        useContainer={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <style jsx>
                    {`
                        .mgz-img-gallery-img-container {
                            position: relative;
                            text-align: center;
                            overflow: hidden;
                        }
                        img {
                            display: block;
                            max-width: 100%;
                            height: ${height}px;
                            object-fit: ${fit === 'scaledown' ? 'scale-down' : fit};
                        }
                        .mgz-img-gallery-caption {
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            background-color: white;
                            transform: translate(-50%);
                            opacity: 0.9;
                        }
                        .mgz-img-gallery-caption :global(*) {
                            margin: 5px 8px;
                        }
                    `}
                </style>
            </>
        );
    }
    if (type === 'video') {
        return (
            <>
                <div className="mgz-img-slider-video-container" style={{ ...dimensions }}>
                    <div
                        ref={videoCover}
                        className="mgz-img-slider-video-cover"
                        onClick={(e) => {
                            e.stopPropagation();
                            videoCover.current.style.setProperty('display', 'none');
                        }}
                    >
                        <span
                            className={cx(
                                'absolute',
                                'top-[50%]',
                                'left-[50%]',
                                '-translate-y-[50%]',
                                '-translate-x-[50%]',
                                'text-neutral-white',
                                'w-[256px]',
                                'h-[256px]',
                            )}
                        >
                            <PlayCircleIcon />
                        </span>
                    </div>
                    <iframe
                        style={{ width: '100%', height: '100%' }}
                        src={`https://www.youtube.com/embed/${videoUrl}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded Video"
                    />
                    <style jsx>
                        {`
                            .mgz-img-slider-video-container iframe {
                                z-index: 1;
                            }
                            .mgz-img-slider-video-cover {
                                z-index: 2;
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                background-image: url(${imgUrl});
                                background-repeat: no-repeat;
                                background-size: cover;
                                background-color: white;
                                background-position: center;
                            }
                            .mgz-img-slider-video-cover :global(svg) {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                color: white;
                                font-size: 24px;
                            }
                            .mgz-img-slider-video-cover:hover {
                                cursor: pointer;
                            }
                        `}
                    </style>
                </div>
            </>
        );
    }
    return null;
};

export default ImageElement;
