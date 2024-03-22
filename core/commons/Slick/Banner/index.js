/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Slider from 'react-slick';
import ImageSlider from '@common_slick/Banner/ImageSlider';
import classNames from 'classnames';
import ChevronLeft from '@heroicons/react/20/solid/ChevronLeftIcon';
import ChevronRight from '@heroicons/react/20/solid/ChevronRightIcon';

const Banner = (props) => {
    const {
        data = [],
        height,
        width,
        contentWidth = '',
        autoPlay = true,
        noLink = false,
        showArrow = true,
        speed = 500,
        autoplaySpeed = 4000,
        className = '',
        storeConfig = {},
    } = props;

    const [slideIndex, setIndex] = useState(0);
    const [count, setCount] = useState(0);
    let sliderRef = React.createRef();

    const handleLeftArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickPrev(data.length - 1);
        } else {
            sliderRef.slickPrev(slideIndex - 1);
        }
    };

    const generateDotItemProps = (isActive) => {
        const dotItemProps = {
            className: 'hidden',
        };

        if (data.length > 1) {
            if (isActive) {
                dotItemProps.className = 'w-[10px] h-[10px] m-[5px] cursor-pointer bg-primary-100 border-2 rounded-full border-pwa-primary';
            } else {
                dotItemProps.className = 'w-[8px] h-[8px] m-[5px] cursor-pointer bg-neutral-white rounded-full';
            }
        }

        dotItemProps.className += ' banner-slider-dots';

        return dotItemProps;
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickNext(0);
        } else {
            sliderRef.slickNext(slideIndex + 1);
        }
    };

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoPlay,
        speed,
        autoplaySpeed,
        rtl: false,
        arrows: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
    };

    return (
        <div className={classNames('w-full h-full relative sm:h-auto group', className)}>
            <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                {data.map((item, key) => (
                    <ImageSlider
                        storeConfig={storeConfig}
                        height={height}
                        width={width}
                        noLink={noLink}
                        contentWidth={contentWidth}
                        key={key}
                        preload={key === 0}
                        {...item}
                    />
                ))}
            </Slider>
            {showArrow && data.length > 1 ? (
                <>
                    <div
                        className={`
                            text-[1.5rem] bg-neutral-100 p-[10px] rounded-[6px] flex-col justify-center items-center pl-[5px] w-[40px] h-[40px] cursor-pointer absolute top-[calc(50%-1rem)] left-[20px]
                            z-10 hidden group-hover:flex banner-slider-left-arrow shadow-md
                        `}
                        onClick={handleLeftArrow}
                    >
                        <ChevronLeft className="w-6 h-6 text-primary" />
                    </div>
                    <div
                        className={`
                            text-[1.5rem] bg-neutral-100 p-[10px] rounded-[6px] flex-col justify-center items-center pl-[5px] w-[40px] h-[40px] cursor-pointer absolute top-[calc(50%-1rem)] right-[20px]
                            z-10 hidden group-hover:flex banner-slider-right-arrow shadow-md
                        `}
                        onClick={handleRightArrow}
                    >
                        <ChevronRight className="w-6 h-6 text-primary" />
                    </div>
                </>
            ) : null}
            <div className="z-[2] flex justify-around items-center absolute bottom-[33px] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                {data.map((item, id) => (
                    <div {...generateDotItemProps(slideIndex === id)} key={id} onClick={() => sliderRef.slickGoTo(id)} />
                ))}
            </div>
        </div>
    );
};

export default Banner;
