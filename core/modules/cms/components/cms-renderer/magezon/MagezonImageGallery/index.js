/* eslint-disable no-nested-ternary */
/* eslint-disable object-curly-newline */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from '@common_image';
import ArrowsPointingOutIcon from '@heroicons/react/20/solid/ArrowsPointingOutIcon';
import ArrowsPointingInIcon from '@heroicons/react/20/solid/ArrowsPointingInIcon';
import dynamic from 'next/dynamic';
import Slider from 'react-slick';
import cx from 'classnames';
import PlayCircleIcon from '@heroicons/react/20/solid/PlayCircleIcon';
import ChevronLeft from '@heroicons/react/20/solid/ChevronLeftIcon';
import ChevronRight from '@heroicons/react/20/solid/ChevronRightIcon';

const ImageElement = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonImageGallery/ImageElement'), { ssr: false });

const MagezonImageGallery = (props) => {
    // prettier-ignore
    const {
        autoplay, fit,
        items, loop, arrows,
        maxwidth, minwidth, minheight, nav, navposition, rtl,
        startindex, stopautoplayontouch, swipe, thumbheight,
        thumbmargin, thumbwidth, width, keyboard,
        shuffle, transition, captions,
        click, allowfullscreen,
        storeConfig, height,
    } = props;
    const { secure_base_media_url } = storeConfig;
    const [slideIndex, setIndex] = useState(startindex || 0);
    const [zoom, setZoom] = useState(false);
    const [itemsArr, setItemsArr] = useState(items);
    const [hasSetPosition, setHasSetPosition] = useState(false);
    let focusSlider;
    let sliderRef = useRef();
    const navRef = useRef();
    const elementRef = useRef();
    const slideHeight = storeConfig.pwa?.magezon_slider_desktop_height;
    const slideWidth = storeConfig.pwa?.magezon_slider_desktop_width;
    const dimensionProps = {
        maxWidth: maxwidth ? maxwidth.indexOf('%') !== -1 ? maxwidth : `${maxwidth}px` : `${slideWidth}px`,
        minWidth: minwidth ? minwidth.indexOf('%') !== -1 ? minwidth : `${minwidth}px` : `${slideWidth}px`,
        minHeight: minheight ? minheight.indexOf('%') !== -1 ? minheight : `${minheight}px` : `${slideHeight}px`,
        width: width ? width.indexOf('%') !== -1 ? width : `${width}px` : `${slideWidth}px`,
        height: !zoom && height ? (height.indexOf('%') !== -1 ? height : `${height}px`) : `${slideHeight}px`,
    };

    const setAutoplay = () => {
        let autoPlayValue = false;
        let autoPlaySpeed = 3000;

        if (autoplay) {
            if (autoplay === 'true' || autoplay === 'false') {
                if (autoplay === 'true') autoPlayValue = true;
                if (autoplay === 'false') autoPlayValue = false;
            }

            if (!isNaN(Number(autoplay))) {
                if (Number(autoplay) > 0) {
                    autoPlayValue = true;
                    autoPlaySpeed = Number(autoplay);
                }
            }
        }

        return {
            autoplay: autoPlayValue,
            autoplaySpeed: autoPlaySpeed,
        };
    };

    const pauseSlick = () => {
        if (stopautoplayontouch) {
            sliderRef.slickPause();
        }
    };

    const shuffleSlick = () =>
        items
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

    const adjustItems = () => {
        let adjustedItems = items;

        if (rtl) {
            adjustedItems = items.reverse();
        }

        if (shuffle) {
            adjustedItems = shuffleSlick();
        }

        return adjustedItems;
    };

    const settings = {
        arrows: false,
        fade: transition !== 'slide',
        infinite: loop,
        initialSlide: startindex || 0,
        autoplay: setAutoplay().autoplay,
        autoplaySpeed: setAutoplay().autoplaySpeed,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: 500,
        swipe,
        beforeChange: (old, next) => {
            setIndex(next);
        },
        pauseOnHover: true,
    };

    const updatedItems = useMemo(() => adjustItems(), [items]);
    useEffect(() => {
        if (keyboard) {
            const track = sliderRef.innerSlider.list.querySelector('.slick-track');
            focusSlider = setTimeout(() => {
                const slide = track.querySelector('.slick-slide');
                slide.focus();
            }, 0);
        }

        setItemsArr(updatedItems);

        return () => clearTimeout(focusSlider);
    }, []);

    const clickNavigate = (e) => {
        e.stopPropagation();
        if (click) {
            const rect = e.target.getBoundingClientRect();
            const elementRect = elementRef.current.offsetWidth;
            const mouseX = e.clientX - rect.left;

            if (mouseX < elementRect / 2) sliderRef.slickPrev();
            if (mouseX > elementRect / 2) sliderRef.slickNext();
        }
    };

    const zoomHandler = (e) => {
        e.stopPropagation();
        setZoom(!zoom);
    };

    useEffect(() => {
        if (sliderRef && !hasSetPosition) {
            sliderRef.slickGoTo(startindex || 0);
            setHasSetPosition(true);
        }
    }, [hasSetPosition]);

    return (
        <>
            <div className={cx('group', 'mgz-img-gallery', { fullscreen: zoom })}>
                <div className="mgz-img-gallery-container" ref={elementRef} onClick={clickNavigate}>
                    {arrows ? (
                        <div
                            className={cx(
                                'flex',
                                'justify-between',
                                'opacity-0',
                                'group-hover:opacity-100',
                                'pointer-events-none',
                                'absolute',
                                'w-full',
                                'top-[50%]',
                                '-translate-y-[50%]',
                                'z-[2]',
                                'max-tablet:hidden',
                            )}
                        >
                            <div
                                className={cx(
                                    'magezon-slider--button-nav-item',
                                    'pointer-events-auto',
                                    'cursor-pointer',
                                    'text-[1.5rem]',
                                    'bg-neutral-100',
                                    'p-[10px]',
                                    'rounded-[6px]',
                                    'flex-col',
                                    'justify-center',
                                    'items-center',
                                    'w-[40px]',
                                    'h-[40px]',
                                    'cursor-pointer',
                                    'shadow-md',
                                    'ml-10',
                                    'flex',
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    sliderRef.slickPrev();
                                }}
                            >
                                <ChevronLeft className="w-6 h-6 hover:text-primary" />
                            </div>
                            <div
                                className={cx(
                                    'magezon-slider--button-nav-item',
                                    'pointer-events-auto',
                                    'cursor-pointer',
                                    'text-[1.5rem]',
                                    'bg-neutral-100',
                                    'p-[10px]',
                                    'rounded-[6px]',
                                    'flex-col',
                                    'justify-center',
                                    'items-center',
                                    'w-[40px]',
                                    'h-[40px]',
                                    'cursor-pointer',
                                    'shadow-md',
                                    'mr-10',
                                    'flex',
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    sliderRef.slickNext();
                                }}
                            >
                                <ChevronRight className="w-6 h-6 hover:text-primary" />
                            </div>
                        </div>
                    ) : null}
                    {allowfullscreen && (
                        <div className="mgz-img-gallery-zoom-btn max-desktop:!opacity-100 w-8 h-8 m-2" onClick={zoomHandler}>
                            {!zoom ? (
                                <ArrowsPointingOutIcon className="text-neutral-white" />
                            ) : (
                                <ArrowsPointingInIcon className="text-neutral-white" />
                            )}
                        </div>
                    )}
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {itemsArr.map((item, index) => (
                            <ImageElement
                                key={index}
                                {...item}
                                baseUrl={secure_base_media_url}
                                pauseSlick={pauseSlick}
                                fit={fit}
                                captions={captions}
                                storeConfig={storeConfig}
                                dimensions={dimensionProps}
                            />
                        ))}
                    </Slider>
                </div>
                {nav && nav !== 'false' && (
                    <div className="mgz-img-gallery-nav">
                        {itemsArr.map((item, index) => {
                            const { type, image, link } = item;
                            const imgUrl = type === 'link' ? link : `${secure_base_media_url}${image}`;

                            return (
                                <div
                                    key={index}
                                    ref={navRef}
                                    tabIndex={index}
                                    className={cx('border-2', 'border-[transparent]', {
                                        'nav-thumbs': nav === 'thumbs',
                                        'mgz-active': nav === 'thumbs' && slideIndex === index,
                                        'mgz-img-gallery-nav-dots-item': nav === 'dots',
                                        'mgz-img-gallery-nav-dots-item-active': nav === 'dots' && slideIndex === index,
                                        'my-2': nav === 'dots',
                                    })}
                                    onClick={() => {
                                        sliderRef.slickGoTo(index);
                                    }}
                                    onKeyDown={({ key }) => {
                                        if (key === 'ArrowLeft') {
                                            sliderRef.slickPrev();
                                        }
                                        if (key === 'ArrowRight') {
                                            sliderRef.slickNext();
                                        }
                                    }}
                                >
                                    {nav === 'thumbs' ? (
                                        <span className="relative">
                                            <Image src={imgUrl} storeConfig={storeConfig} width={thumbwidth} height={thumbheight} />
                                            {item.type === 'video' ? (
                                                <span
                                                    className={cx(
                                                        'absolute',
                                                        'top-[50%]',
                                                        'left-[50%]',
                                                        '-translate-y-[50%]',
                                                        '-translate-x-[50%]',
                                                        'text-neutral-white',
                                                        'w-[32px]',
                                                        'h-[32px]',
                                                    )}
                                                >
                                                    <PlayCircleIcon />
                                                </span>
                                            ) : null}
                                        </span>
                                    ) : (
                                        <div
                                            key={index}
                                            className={cx(
                                                'cursor-pointer',
                                                'rounded-full',
                                                'shadow-[0_0_3px_0.5px]',
                                                'w-[6px] tablet:w-[10px] desktop:w-3',
                                                'h-[6px] tablet:h-[10px] desktop:h-3',
                                                'mx-[6px]',
                                                {
                                                    'magezon-slider--dot-nav-item-active': slideIndex === index,
                                                    'bg-primary-100 !shadow-[0_0_0_3px] !shadow-primary': slideIndex === index,
                                                    'bg-neutral-white': slideIndex !== index,
                                                },
                                            )}
                                            onClick={() => sliderRef.slickGoTo(index)}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-img-gallery {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: ${navposition === 'bottom' ? 'column' : 'column-reverse'};
                    }
                    .mgz-img-gallery.fullscreen {
                        position: fixed;
                        height: 100vh;
                        inset: 0;
                        background-color: black;
                        z-index: 1500;
                    }
                    .fullscreen .mgz-img-gallery-container {
                        max-height: 100%;
                        max-width: 100%;
                    }
                    .mgz-img-gallery-container {
                        position: relative;
                        width: 100%;
                        overflow: hidden;
                    }
                    .mgz-active {
                        border: 2px solid #00afea;
                        outline: none;
                    }
                    .mgz-img-gallery-zoom-btn {
                        opacity: 0;
                        position: absolute;
                        right: 0;
                        z-index: 1;
                    }
                    .mgz-img-gallery-container:hover .mgz-img-gallery-zoom-btn {
                        opacity: 1;
                        transition: opacity 0.3s;
                    }
                    .fullscreen .mgz-img-gallery-zoom-btn {
                        position: fixed;
                        top: 0;
                        opacity: 1;
                    }
                    .mgz-img-gallery-zoom-btn:hover {
                        cursor: pointer;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-img-gallery-container .slick-slide {
                        height: 100%;
                    }
                    .mgz-img-gallery-container .slick-track {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: center;
                    }
                    .mgz-img-gallery.fullscreen .slick-track {
                        height: 100%;
                    }
                    .mgz-img-gallery-container .slick-prev {
                        left: 0;
                    }
                    .mgz-img-gallery-container .slick-next {
                        right: 0;
                    }
                    .mgz-img-gallery.fullscreen .mgz-img-gallery-container .slick-arrow {
                        z-index: 1500;
                    }
                    .mgz-img-gallery-container .slick-arrow {
                        transition: opacity 0.3s;
                        opacity: 0;
                        z-index: 1;
                        background: rgba(0, 0, 0, 0.1);
                    }
                    .mgz-img-gallery-container:hover .slick-arrow {
                        opacity: 1;
                    }
                    .mgz-img-gallery.fullscreen .slick-arrow {
                        opacity: 1;
                    }
                    .mgz-img-gallery-container .slick-prev svg,
                    .mgz-img-gallery-container .slick-next svg {
                        font-size: 20px !important;
                        color: white;
                    }
                    .mgz-img-gallery-container .slick-prev:before,
                    .mgz-img-gallery-container .slick-next:before {
                        content: '' !important;
                    }
                    .slick-slide > div {
                        height: 100%;
                        width: 100%;
                        position: relative;
                    }
                    .mgz-img-gallery.fullscreen .slick-slide > div {
                        height: 100vh;
                    }
                    .mgz-img-gallery-nav {
                        display: flex;
                    }
                    .mgz-img-gallery-nav .nav-thumbs {
                        margin: ${thumbmargin ? `${thumbmargin}px` : '2px'};
                        width: ${thumbwidth ? `${thumbwidth}px` : '2px'};
                        height: ${thumbheight ? `${thumbheight}px` : '2px'};
                        overflow: hidden;
                    }
                    .mgz-img-gallery-nav div:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonImageGallery;
