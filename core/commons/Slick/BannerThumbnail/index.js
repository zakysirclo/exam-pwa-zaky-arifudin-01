/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable radix */
import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import classNames from 'classnames';
import Slider from 'react-slick';
import ImageSlide from '@common_slick/Banner/ImageSlider';
import Image from '@common_image';
import Plus from '@heroicons/react/24/outline/PlusIcon';
import Min from '@heroicons/react/24/outline/MinusIcon';
import Button from '@common_button';

const BannerThumbnail = ({
    data = [],
    height,
    width,
    contentWidth = '',
    autoPlay = true,
    noLink = false,
    thumbnail = false,
    showArrow = true,
    speed = 500,
    autoplaySpeed = 4000,
    actionImage = () => { },
    zoom = false,
    customClassCaraousel = '',
    customProduct = '',
    children,
    storeConfig = {},
    className = '',
}) => {
    const [slideIndex, setIndex] = useState(0);
    const [count, setCount] = useState(0);
    let sliderRef = React.createRef();

    const dots = 'z-[2] flex flex-row absolute justify-arround bottom-[33px] lef-[50%] -transform-x-1/2 -transform-y-1/2';
    const dotActive = data.length > 1
        ? classNames('w-[7px] h-[7px] rounded-full bg-white m-[5px] cursor-pointer', 'bg-pwa-primary w-[10px] h-[10px]')
        : 'hidden';
    const dotItem = data.length > 1 ? 'w-[7px] h-[7px] rounded-full bg-white m-[5px] cursor-pointer' : 'hidden';
    const handleLeftArrow = () => {
        sliderRef.slickGoTo(slideIndex - 1);
    };
    const handleRightArrow = () => {
        sliderRef.slickGoTo(slideIndex + 1);
    };

    const classCarousel = (customClassCaraousel && customClassCaraousel !== '')
        ? customClassCaraousel : 'relative md:w-[calc(100%-150px)] w-full h-full lg:w-full';

    const customProductCaraosel = (customProduct && customProduct !== '')
        ? customProduct : 'w-[99%] h-auto xs:w-full sm:w-auto sm:h-[calc(100vh-100px)]';

    const settings = {
        // className: thumbnail ? 'slick-thumbnail' : 'slick-pwa',
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoPlay,
        speed,
        autoplaySpeed,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
        arrows: false,
    };

    let defaultWidthMobile = storeConfig?.pwa?.home_slider_desktop_width;
    let defaultHeightMobile = storeConfig?.pwa?.home_slider_desktop_height;

    if (typeof defaultWidthMobile === 'string') defaultWidthMobile = parseInt(defaultWidthMobile, 0);
    if (typeof defaultHeightMobile === 'string') defaultHeightMobile = parseInt(defaultHeightMobile, 0);

    const arrow = 'text-[1.5rem] bg-[rgba(255,255,255,0.5)] absolute flex flex-col justify-center items-center p-[10px] rouded-[5px] text-center pl-[10px] top-[calc(50%-1rem)] w-[40px] h-[40px] cursor-pointer hover:bg-pwa-primary hover:text-white xs:hidden';

    return (
        <div className={classNames('sm:flex', className)}>
            {thumbnail ? (
                <div>
                    {data.map((item, id) => (
                        <div
                            className={slideIndex === id
                                ? classNames(
                                    'border-solid border-2 border-[#dcdcdc] mt-[10px] rounded-[3px] cursor-pointer p-[5px] w-full',
                                    'border-solid border-2 border-[#6b6868] cursor-default',
                                    'sm:hidden',
                                )
                                : classNames(
                                    'border-solid border-2 border-[#dcdcdc] mt-[10px] rounded-[3px] cursor-pointer p-[5px] w-full', 'sm:hidden',
                                )}
                            key={id}
                            onClick={() => {
                                sliderRef.slickGoTo(id);
                            }}
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.imageAlt}
                                width={100}
                                height={100}
                                quality={80}
                                className="w-full h-full"
                                videoUrl={item.videoUrl}
                                widthMobile={width || defaultWidthMobile}
                                heightMobile={height || defaultHeightMobile}
                                storeConfig={storeConfig}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            <div className={classCarousel}>
                <Slider ref={(slider) => sliderRef = slider} {...settings}>
                    {data.map((item, key) => (
                        <div onClick={(e) => actionImage(e, key)} key={key}>
                            {
                                zoom ? (
                                    <TransformWrapper>
                                        {({ zoomIn, zoomOut, ...rest }) => (
                                            <div>
                                                <div className="flex flex-col absolute z-50">
                                                    <Button
                                                        className="m-10 bg-[#B4B4B4] text-[3rem]"
                                                        onClick={() => zoomIn()}
                                                        icon={<Plus className="text-primary" />}
                                                        iconOnly
                                                    />
                                                    <Button
                                                        className="m-10 bg-[#B4B4B4] text-[3rem]"
                                                        onClick={() => zoomOut()}
                                                        icon={<Min className="text-primary" />}
                                                        iconOnly
                                                    />
                                                </div>
                                                <TransformComponent
                                                    wrapperStyle={{ width: '100%' }}
                                                    contentStyle={{ justifyContent: 'center', width: '100%' }}
                                                >
                                                    <ImageSlide
                                                        height={height}
                                                        customClass={customProductCaraosel}
                                                        width={width}
                                                        noLink={noLink}
                                                        key={key}
                                                        {...item}
                                                        videoUrl={item.videoUrl}
                                                        storeConfig={storeConfig}
                                                    />
                                                </TransformComponent>
                                            </div>
                                        )}
                                    </TransformWrapper>
                                ) : (
                                    <ImageSlide
                                        height={height}
                                        customClass={customProductCaraosel}
                                        width={width}
                                        noLink={noLink}
                                        key={key}
                                        {...item}
                                        videoUrl={item.videoUrl}
                                        storeConfig={storeConfig}
                                        alt={item.imageAlt}
                                    />
                                )
                            }
                        </div>
                    ))}
                </Slider>
                {
                    showArrow ? (
                        <>
                            <div
                                className={thumbnail
                                    ? classNames(
                                        arrow, 'left-[20px]',
                                    )
                                    : classNames(
                                        arrow, 'left-[20px]',
                                    )}
                                onClick={handleLeftArrow}
                            >
                                <i class="fas fa-chevron-left" />
                            </div>
                            <div className={classNames(arrow, 'right-[20px]')} onClick={handleRightArrow}>
                                <i class="fas fa-chevron-right" />
                            </div>
                        </>
                    ) : null
                }
                <div className={dots}>
                    {data.map((item, id) => (
                        /* eslint-disable jsx-a11y/click-events-have-key-events */
                        /* eslint-disable jsx-a11y/no-static-element-interactions */
                        <div
                            className={slideIndex === id ? dotActive : dotItem}
                            key={id}
                            onClick={() => {
                                sliderRef.slickGoTo(id);
                            }}
                        />
                    ))}
                </div>
                { children }
            </div>
        </div>
    );
};
export default BannerThumbnail;
