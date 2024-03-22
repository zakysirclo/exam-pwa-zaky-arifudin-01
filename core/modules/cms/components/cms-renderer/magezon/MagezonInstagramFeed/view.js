/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Typography from '@common_typography';
import Link from 'next/link';
import PhotoSwipe from '@core_modules/cms/components/cms-renderer/magezon/MagezonInstagramFeed/components/PhotoSwipe';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import { getFlexBasisTailwind } from '@core/helpers/style';
import cx from 'classnames';

const MagezonInstagramFeedView = (props) => {
    const {
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        title,
        title_tag,
        title_align,
        line_position,
        line_color,
        line_width,
        title_color,
        link_text,
        instagram_username,
        data,
        max_items,
        item_xl,
        item_lg,
        item_md,
        item_sm,
        item_xs,
        gap,
        hover_effect,
        onclick,
        link_target,
    } = props;
    let Popup = <></>;

    switch (onclick) {
        case 'photoswipe':
            Popup = PhotoSwipe;
            break;
        default:
            Popup = PhotoSwipe;
    }

    const [open, setOpen] = React.useState(false);
    const [imagePosition, setImagePosition] = React.useState(false);

    const handleClick = (id) => {
        if (onclick && onclick !== '') {
            if (onclick === 'photoswipe') {
                setImagePosition(id);
                setOpen(true);
            }
        }
    };

    const lightboxSetting = {
        buttons: {
            showThumbnailsButton: false,
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
        },
        thumbnails: {
            showThumbnails: false,
        },
        caption: {
            captionContainerPadding: '10px 25% 30px 25%',
        },
    };

    return (
        <>
            {open && data && data.length > 0 && (
                <Popup open={open} setOpen={() => setOpen(false)} data={data} imagePosition={imagePosition} max_items={max_items} />
            )}
            <div
                className={cx('magezon-instagram', {
                    'max-sm:hidden': xs_hide,
                    'max-md:hidden': sm_hide,
                    'max-lg:hidden': md_hide,
                    'max-xl:hidden': lg_hide,
                })}
            >
                <div className="magezone-title-instagram-box">
                    <Typography variant={title_tag} align={title_align} className="magezon-title-instagram">
                        {title}
                    </Typography>
                </div>
                <div className="flex flex-wrap gap-2">
                    {onclick && onclick === 'magnific' ? (
                        <SimpleReactLightbox>
                            <SRLWrapper options={lightboxSetting}>
                                <div className="flex flex-wrap gap-2">
                                    {data?.length > 0 &&
                                        data.slice(0, max_items).map((item, key) => (
                                            <div
                                                key={key}
                                                className={cx(
                                                    'flex-shrink-0',
                                                    'min-w-[120px]',
                                                    'max-w-[120px]',
                                                    'min-h-[120px]',
                                                    'max-h-[120px]',
                                                    'overflow-hidden',
                                                    'relative',
                                                    'm-0',
                                                    {
                                                        [getFlexBasisTailwind(item_xs !== 5 ? 12 / item_xs : item_xs, 'xs')]: item_xs,
                                                        [getFlexBasisTailwind(item_sm !== 5 ? 12 / item_sm : item_sm, 'sm')]: item_sm,
                                                        [getFlexBasisTailwind(item_md !== 5 ? 12 / item_md : item_md, 'md')]: item_md,
                                                        [getFlexBasisTailwind(item_xl !== 5 ? 12 / item_xl : item_xl, 'lg')]: item_lg || item_xl,
                                                    },
                                                )}
                                            >
                                                <img
                                                    src={item.media_url}
                                                    alt={item.caption || ''}
                                                    className={cx('min-h-full', 'min-w-full', 'object-cover')}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </SRLWrapper>
                        </SimpleReactLightbox>
                    ) : (
                        data?.length > 0 &&
                        data.slice(0, max_items).map((item, key) => (
                            <div
                                key={key}
                                className={cx(
                                    'magezon-instagram-item',
                                    'flex-shrink-0',
                                    'min-w-[120px]',
                                    'max-w-[120px]',
                                    'min-h-[120px]',
                                    'max-h-[120px]',
                                    'overflow-hidden',
                                    'relative',
                                    'm-0',
                                    {
                                        [getFlexBasisTailwind(item_xs !== 5 ? 12 / item_xs : item_xs, 'xs')]: item_xs,
                                        [getFlexBasisTailwind(item_sm !== 5 ? 12 / item_sm : item_sm, 'sm')]: item_sm,
                                        [getFlexBasisTailwind(item_md !== 5 ? 12 / item_md : item_md, 'md')]: item_md,
                                        [getFlexBasisTailwind(item_xl !== 5 ? 12 / item_xl : item_xl, 'lg')]: item_lg || item_xl,
                                    },
                                )}
                            >
                                {onclick && onclick === 'photo' ? (
                                    <Link href={item.media_url} legacyBehavior>
                                        <a target={link_target}>
                                            <img src={item.media_url} alt={item.caption || ''} />
                                        </a>
                                    </Link>
                                ) : (
                                    <img
                                        src={item.media_url}
                                        alt={item.caption || ''}
                                        onClick={() => handleClick(key)}
                                        className={cx('min-h-full', 'min-w-full', 'object-cover')}
                                    />
                                )}
                            </div>
                        ))
                    )}
                </div>

                <Link href={`https://instagram.com/${instagram_username}`} legacyBehavior>
                    <a target="_blank" color="inherit" underline="none">
                        <Typography variant="span" letter="capitalize" size="14">
                            {link_text}
                        </Typography>
                    </a>
                </Link>
                <style jsx>
                    {`
                        @media only screen and (max-width: 47em) {
                            .col-xs-5 {
                                flex: 1 20%;
                                max-width: 20%;
                            }
                        }
                        @media only screen and (min-width: 48em) and (max-width: 63em) {
                            .sm:basis-5/12 {
                                flex: 1 20%;
                                max-width: 20%;
                            }
                        }
                        @media only screen and (min-width: 64em) and (max-width: 74em) {
                            .md:basis-5/12 {
                                flex: 1 20%;
                                max-width: 20%;
                            }
                        }
                        @media only screen and (min-width: 75em) {
                            .col-lg-5 {
                                flex: 1 20%;
                                max-width: 20%;
                            }
                        }
                    `}
                </style>
                <style jsx global>
                    {`
                        @media (max-width: 768px) {
                            .SRLNextButton {
                                display: block !important;
                            }
                            .SRLPrevButton {
                                display: block !important;
                            }
                        }

                        .magezon-instagram-item {
                            overflow: hidden !important;
                            margin: ${gap ? (hover_effect === 'zoomin' ? gap / 2 : gap / 4) : 0}px 0px;
                        }
                        .magezon-instagram-img {
                            object-fit: cover;
                            width: 100%;
                            transform: scale(1);
                            ${onclick && onclick !== '' && hover_effect === 'zoomin'
                                ? 'transition: transform 1s, filter 2s ease-in-out;'
                                : onclick && onclick !== null && hover_effect === 'zoomout'
                                  ? 'transition: transform 1s, visibility 1s ease-in-out;'
                                  : ''}
                        }
                        .magezon-instagram-img:hover {
                            ${onclick && onclick !== '' && hover_effect === 'zoomin'
                                ? ' transform: scale(1.1);'
                                : onclick && onclick !== null && hover_effect === 'zoomout'
                                  ? 'transform: scale(0.9);'
                                  : ''}
                        }
                        .magezon-instagram {
                            width: 100%;
                            margin-bottom: 20px;
                        }
                        .magezone-title-instagram-box {
                            width: 100%;
                            text-align: ${title_align};
                            position: relative;
                            margin-bottom: 10px;
                        }
                        .magezon-title-instagram {
                            position: relative;
                            padding: 12px;
                            color: ${title_color};
                            background: #fff;
                            display: inline-block;
                            text-transform: uppercase;
                            z-index: 1;
                        }
                        .magezone-title-instagram-box::after {
                            content: '';
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: ${line_position === 'center' ? '50%' : '100%'};
                            height: ${line_width}px;
                            background: ${line_color};
                            z-index: 0;
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default MagezonInstagramFeedView;
