/* eslint-disable no-return-assign */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable react/jsx-indent */

import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import formatDate from '@core/helpers/date';
import { getProductReviews } from '@core_modules/cms/services/graphql';
import useMediaQuery from '@hook/useMediaQuery';
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import Link from 'next/link';
import { useRef } from 'react';
import Slider from 'react-slick';
import Thumbor from '@common_image';
import cx from 'classnames';
import { COLORS } from '@root/core/theme/vars';

const DEFAULT_SKU = 'Jersey Manchester City (Test Customizable Options)';

const MagezonRecentReviews = (props) => {
    // prettier-ignore
    const {
        description,
        line_color, line_position, line_width, show_line,
        title, title_align, title_tag,
        product_sku, max_items,
        review_color, review_content,
        review_customer, review_date, review_product_image,
        review_product_name, review_rating_star, review_title,
        review_star_color, review_link_color, review_background_color,
        owl_auto_height, owl_autoplay_timeout, owl_dots, owl_dots_speed,
        owl_item_xl, owl_item_lg, owl_item_md, owl_item_sm, owl_item_xs,
        owl_lazyload, owl_loop, owl_nav, owl_nav_position,
        owl_nav_size, owl_stage_padding,
        owl_active_background_color, owl_slide_by,
        owl_background_color, owl_color,
        owl_hover_background_color, owl_hover_color,
        owl_autoplay, owl_autoplay_hover_pause, storeConfig,
    } = props;
    const { data, loading } = getProductReviews({ sku: product_sku || DEFAULT_SKU, pageSize: max_items });
    const reviewData = data?.products?.items[0] || [];

    const showLineClass = show_line ? 'mgz-recent-reviews-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-recent-reviews-heading-line--bottom' : '';
    const navSize = owl_nav_size === 'mini' ? 10 : owl_nav_size === 'small' ? 15 : owl_nav_size === 'normal' ? 20 : 25;
    const {
        isXl, isLg, isMd, isSm, isXs,
    } = useMediaQuery();
    let sliderRef = useRef();

    const getItemsToShow = () => {
        let itemsToShow;

        if (isXl) itemsToShow = owl_item_xl;
        if (isLg) itemsToShow = owl_item_lg;
        if (isMd) itemsToShow = owl_item_md;
        if (isSm) itemsToShow = owl_item_sm;
        if (isXs) itemsToShow = owl_item_xs;

        return itemsToShow;
    };

    const settings = {
        autoplay: owl_autoplay,
        autoplaySpeed: owl_autoplay_timeout,
        speed: owl_dots_speed || 1000,
        dots: owl_dots,
        customPaging: () => (
                <div
                    className={cx(
                        'custom-slick-dots',
                        'cursor-pointer',
                        'rounded-full',
                        'shadow-[0_0_3px_0.5px]',
                        'w-[6px] tablet:w-[10px] desktop:w-3',
                        'h-[6px] tablet:h-[10px] desktop:h-3',
                        'mx-[6px]',
                    )}
                />
            ),
        infinite: owl_loop,
        arrows: false,
        lazyload: owl_lazyload ? 'ondemand' : null,
        pauseOnHover: owl_autoplay_hover_pause,
        adaptiveHeight: owl_auto_height,
        slidesToShow: getItemsToShow(),
        slidesToScroll: owl_slide_by,
    };

    if (loading) return null;

    return (
        <>
            <div className="mgz-recent-reviews group">
                <div className={`mgz-recent-reviews-heading ${showLineClass} ${linePosClass}`}>
                    <div className="mgz-recent-reviews-heading-title">
                        <Typography variant={title_tag} align={title_align}>
                            {title.toUpperCase()}
                        </Typography>
                    </div>
                    <div>{description}</div>
                </div>
                <div className="mgz-recent-reviews-content relative">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {reviewData?.reviews?.items?.map((review, index) => (
                            <div key={index} className="mgz-recent-reviews-content-container">
                                {review_customer && (
                                    <Typography variant="h2" type="bold" className="review-nickname text-xl">
                                        {review.nickname}
                                    </Typography>
                                )}
                                <div className="rating-star flex mt-1">
                                    {review_rating_star && <RatingStar value={review.ratings_breakdown[0].value} />}
                                    {review_title && (
                                        <Link href={reviewData.url_key} legacyBehavior>
                                            <a className="review-link ml-1">
                                                <Typography type="bold">{review.summary}</Typography>
                                            </a>
                                        </Link>
                                    )}
                                </div>
                                {review_date && <div className="review-date">{formatDate(review.created_at, 'M/DD/YY')}</div>}
                                {review_product_name && (
                                    <Link href={reviewData.url_key} legacyBehavior>
                                        <a className="review-link">
                                            <Typography variant="h4" type="bold">
                                                {reviewData.name}
                                            </Typography>
                                        </a>
                                    </Link>
                                )}
                                <div className="flex gap-2">
                                    {review_product_image && (
                                        <div className="flex h-16 w-16">
                                            <Thumbor src={reviewData.small_image.url} width={64} height={64} storeConfig={storeConfig} />
                                        </div>
                                    )}
                                    {review_content && <div className="review-text max-w-[80%] break-words">{review.text}</div>}
                                </div>
                            </div>
                        ))}
                    </Slider>
                    {owl_nav ? (
                        <div
                            className={cx('flex', 'max-desktop:hidden', 'justify-between', 'pointer-events-none', {
                                'order-3': owl_nav_position.indexOf('bottom') !== -1,
                                '!justify-start': owl_nav_position.indexOf('left') !== -1,
                                '!justify-end': owl_nav_position.indexOf('right') !== -1,
                                '!justify-center': owl_nav_position === 'bottom_center',
                                'opacity-100 group-hover:opacity-100 absolute w-full top-[50%] -translate-y-[50%] z-[2]':
                                    owl_nav_position === 'center_split',
                            })}
                        >
                            <div
                                className={cx(
                                    'mgz-recent-reviews-nav--btn',
                                    'cursor-pointer',
                                    'pointer-events-auto',
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
                                    'hidden',
                                    'group-hover:flex',
                                    'shadow-md',
                                    'ml-10',
                                )}
                                onClick={() => sliderRef.slickPrev()}
                            >
                                <ChevronLeftIcon className="w-6 h-6 hover:text-primary" />
                            </div>
                            <div
                                className={cx(
                                    'mgz-recent-reviews-nav--btn',
                                    'cursor-pointer',
                                    'pointer-events-auto',
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
                                    'hidden',
                                    'group-hover:flex',
                                    'shadow-md',
                                    'mr-10',
                                )}
                                onClick={() => sliderRef.slickNext()}
                            >
                                <ChevronRightIcon className="w-6 h-6 hover:text-primary" />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-recent-reviews {
                        overflow: visible;
                    }
                    .mgz-recent-reviews-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-recent-reviews-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-recent-reviews-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-recent-reviews-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-recent-reviews-content .rating-star :global(> div svg) {
                        color: ${review_star_color || '#ff5501'};
                    }
                    .mgz-recent-reviews-content-container > :global(*[class*='Typography']) {
                        margin: 5px 0;
                    }
                    .mgz-recent-reviews-content-container {
                        padding: 10px;
                        background-color: ${review_background_color || '#f5f5f5'};
                    }
                    .mgz-recent-reviews-content-container :global(.review-nickname),
                    .review-date,
                    .review-text {
                        color: ${review_color || '#000000'};
                    }
                    .review-link > :global(*) {
                        margin: 5px 0;
                        color: ${review_link_color || '#007bdb'};
                    }
                `}
            </style>
            <style jsx>
                {`
                    .mgz-recent-reviews {
                        ${isSm ? 'min-height: 600px;' : isXs ? 'min-height: 700px;' : ''}
                    }
                    .mgz-recent-reviews :global(.slick-slide > div) {
                        margin: 0 5px;
                    }
                    .mgz-recent-reviews :global(.slick-slider) {
                        padding: 0 ${owl_stage_padding}px;
                    }
                    .mgz-recent-reviews :global(.slick-list) {
                    }
                    .mgz-recent-reviews :global(.slick-dots) {
                        position: relative;
                    }
                    .mgz-recent-reviews :global(.slick-dots .slick-active > div) {
                        --tw-shadow-colored: 0 0 0 3px var(--tw-shadow-color) !important;
                        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
                        --tw-shadow-color: ${COLORS.primary.DEFAULT} !important;
                        --tw-shadow: var(--tw-shadow-colored) !important;
                        background-color: ${COLORS.primary[100]};
                    }
                    .mgz-recent-reviews :global(.slick-track) {
                    }
                    .mgz-recent-reviews :global(.custom-slick-dots) {
                        width: 10px;
                        height: 10px;
                        background-color: ${owl_background_color || '#eee'};
                        border-radius: 50px;
                    }
                    .mgz-recent-reviews :global(.slick-active .custom-slick-dots) {
                        background-color: ${owl_active_background_color || '#000000'} !important;
                    }
                    .mgz-recent-reviews :global(.slick-slider li:not(.slick-active) .custom-slick-dots:hover) {
                        background-color: ${owl_hover_background_color || '#000000'} !important;
                    }
                    .mgz-recent-reviews-nav--btn:hover {
                        cursor: pointer;
                        background-color: ${owl_hover_background_color};
                    }
                    .mgz-recent-reviews-nav--btn {
                        width: ${navSize * 2}px;
                        height: ${navSize * 2}px;
                        ${owl_background_color ? `background-color: ${owl_background_color};` : ''}
                    }
                    .mgz-recent-reviews-nav--btn :global(svg) {
                        ${owl_color ? `color: ${owl_color};` : ''}
                    }
                    .mgz-recent-reviews-nav--btn:hover :global(svg) {
                        color: ${owl_hover_color};
                    }
                    .mgz-recent-reviews-dots {
                        display: flex;
                        justify-content: center;
                        margin: 5px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonRecentReviews;
