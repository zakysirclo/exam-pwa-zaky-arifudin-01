/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React from 'react';
import fscreen from 'fscreen';
import Dialog from '@common_dialog';
import Slider from 'react-slick';
import classNames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import { basePath } from '@config';

const PhotoSwipe = (props) => {
    const {
        open, setOpen, data, max_items, imagePosition, storeConfig,
    } = props;
    const sliderRef = React.createRef();
    const { t } = useTranslation(['common']);

    const [slideIndex, setIndex] = React.useState(imagePosition);
    const [count, setCount] = React.useState(0);
    const [openShare, setOpenShare] = React.useState(false);
    const [zoom, setZoom] = React.useState(false);
    const [zoomId, setZoomId] = React.useState(null);
    const enable = storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig.pwa.thumbor_https_http;
    const url_thumbor = storeConfig.pwa.thumbor_url;
    const handleLeftArrow = () => {
        sliderRef.slickGoTo(slideIndex - 1);
        setZoom(false);
    };
    const handleRightArrow = () => {
        sliderRef.slickGoTo(slideIndex + 1);
        setZoom(false);
    };

    const settings = {
        // className: thumbnail ? 'slick-thumbnail' : 'slick-pwa',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        centerMode: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
        initialSlide: imagePosition || 0,
    };

    const [inFullscreenMode, setInFullscreenMode] = React.useState(false);

    const handleFullscreenChange = React.useCallback(() => {
        if (fscreen.fullscreenElement !== null) {
            setInFullscreenMode(true);
        } else {
            setInFullscreenMode(false);
        }
    }, []);

    const handleFullscreenError = React.useCallback((e) => {
        // eslint-disable-next-line no-console
        console.log('Fullscreen Error', e);
    }, []);

    React.useEffect(() => {
        if (fscreen.fullscreenEnabled) {
            fscreen.addEventListener('fullscreenchange', handleFullscreenChange, false);
            fscreen.addEventListener('fullscreenerror', handleFullscreenError, false);
            return () => {
                fscreen.removeEventListener('fullscreenchange', handleFullscreenChange);
                fscreen.removeEventListener('fullscreenerror', handleFullscreenError);
            };
        }
    });

    const appElement = React.useRef();

    const toggleFullscreen = React.useCallback(() => {
        setZoom(false);
        if (inFullscreenMode) {
            fscreen.exitFullscreen();
        } else {
            fscreen.requestFullscreen(appElement.current);
        }
    }, [inFullscreenMode]);

    const anchorRef = React.useRef(null);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenShare(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenShare(false);
        }
    }

    const handleToggle = () => {
        setOpenShare((prevOpen) => !prevOpen);
    };

    const getLink = (type) => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        if (type === 'fb') {
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        }
        if (type === 'tweet') {
            const caption = data[slideIndex] ? data[slideIndex].caption : '';
            return `https://twitter.com/intent/tweet?text=${caption}&url=${url}`;
        }
        if (type === 'pin') {
            const media = data[slideIndex] ? data[slideIndex].media_url : '';
            return `http://www.pinterest.com/pin/create/button/?url=${url}&media=${media}`;
        }

        return url;
    };

    const handleZoom = () => {
        const { id } = data[slideIndex];
        const element = document.getElementsByClassName(id);
        if (zoom) {
            setZoom(false);
            if (element && element.length > 0) {
                for (let i = 0; i < element.length; i += 1) {
                    if (element[i] && element[i].style) {
                        element[i].style = '';
                    }
                }
            }
        } else {
            setZoomId(slideIndex);
            setZoom(true);
            for (let i = 0; i < element.length; i += 1) {
                if (element[i] && element[i].style) {
                    element[i].style = 'transition: transform .2s !important; transform: scale(2) !important;';
                }
            }
        }
    };

    React.useEffect(() => {
        if (zoomId !== null && zoomId !== slideIndex) {
            const { id } = data[zoomId];
            const element = document.getElementsByClassName(id);
            if (element && element.length > 0) {
                for (let i = 0; i < element.length; i += 1) {
                    if (element[i] && element[i].style) {
                        element[i].style = '';
                    }
                }
            }
        }
    }, [slideIndex]);

    return null;

    // return (
    //     <Dialog
    //         open={open}
    //         onClose={setOpen}
    //         scroll="paper"
    //         fullScreen
    //         TransitionComponent={Transition}
    //         ref={appElement}
    //     >
    //         <DialogTitle id="scroll-dialog-title" className={styles.header}>
    //             <span className={styles.countItem}>
    //                 {`${slideIndex + 1}/${max_items}`}
    //             </span>
    //             <div className={classNames(styles.action, 'row')}>
    //                 <IconButton className={styles.btnClose} onClick={handleZoom}>
    //                     {
    //                         zoom ? (<ZoomOutIcon />) : (<ZoomInIcon />)
    //                     }
    //                 </IconButton>
    //                 <IconButton className={styles.btnClose} onClick={toggleFullscreen}>
    //                     <FullscreenIcon />
    //                 </IconButton>
    //                 <IconButton
    //                     className={styles.btnClose}
    //                     ref={anchorRef}
    //                     aria-controls={openShare ? 'menu-list-grow' : undefined}
    //                     aria-haspopup="true"
    //                     onClick={handleToggle}
    //                 >
    //                     <ShareIcon />
    //                 </IconButton>
    //                 <Popper open={openShare} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
    //                     {({ TransitionProps, placement }) => (
    //                         <Grow
    //                             {...TransitionProps}
    //                             style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
    //                         >
    //                             <Paper>
    //                                 <ClickAwayListener onClickAway={handleClose}>
    //                                     <MenuList autoFocusItem={openShare} id="menu-list-grow" onKeyDown={handleListKeyDown}>
    //                                         <MenuItem onClick={handleClose}>
    //                                             <Link href={getLink('fb')} target="_blank">

    //                                                 {t('common:instagramFeed:shareFb')}

    //                                             </Link>
    //                                         </>
    //                                         <MenuItem onClick={handleClose}>
    //                                             <Link href={getLink('tweet')} target="_blank">

    //                                                 {t('common:instagramFeed:tweet')}

    //                                             </Link>
    //                                         </MenuItem>
    //                                         <MenuItem onClick={handleClose}>
    //                                             <Link href={getLink('pin')} target="_blank">

    //                                                 {t('common:instagramFeed:pinit')}

    //                                             </Link>
    //                                         </MenuItem>
    //                                         <MenuItem onClick={handleClose}>
    //                                             <Link href={data[slideIndex].media_url || '#'} target="_blank">

    //                                                 {t('common:instagramFeed:downloadImage')}

    //                                             </Link>
    //                                         </MenuItem>
    //                                     </MenuList>
    //                                 </ClickAwayListener>
    //                             </Paper>
    //                         </Grow>
    //                     )}
    //                 </Popper>
    //                 <IconButton className={styles.btnClose} onClick={() => { setOpen(); setZoom(false); }}>
    //                     <CloseIcon />
    //                 </IconButton>
    //             </div>
    //         </DialogTitle>
    //         <DialogContent className={styles.sliderContent}>
    //             <Slider ref={(slider) => sliderRef = slider} {...settings}>
    //                 {
    //                     data && data.length > 0 && data.map((item, idx) => (idx < max_items ? (
    //                         <div key={idx}>
    //                             <div className={styles.itemPopup}>
    //                                 <source srcSet={generateThumborUrl(item.media_url, 500, 500, enable, useHttpsOrHttp, url_thumbor)} type="image/webp" />
    //                                 <source srcSet={getImageFallbackUrl(generateThumborUrl(item.media_url, 500, 500, enable, useHttpsOrHttp, url_thumbor))} type="image/jpeg" />
    //                                 <img
    //                                     className={`${styles.imagePopup} ${item.id}`}
    //                                     data-pagespeed-no-defer
    //                                     src={generateThumborUrl(item.media_url, 500, 500, enable, useHttpsOrHttp, url_thumbor)}
    //                                     onError={(e) => {
    //                                         e.target.onerror = null;
    //                                         e.target.src = `${basePath}/assets/img/placeholder.png`;
    //                                     }}
    //                                     alt={item.id}
    //                                 />
    //                                 <div className={styles.footer}>
    //                                     { item.caption && item.caption !== '' && (
    //                                         <span className={styles.caption}>
    //                                             {item.caption}
    //                                         </span>
    //                                     ) }
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     ) : null))
    //                 }
    //             </Slider>
    //             <>
    //                 <div
    //                     className={classNames(styles.arrow, styles.leftArrow)}
    //                     onClick={handleLeftArrow}
    //                 >
    //                     <LeftArrowIcon fontSize="inherit" />
    //                 </div>
    //                 <div className={classNames(styles.arrow, styles.rightArrow)} onClick={handleRightArrow}>
    //                     <RightArrowIcon fontSize="inherit" />
    //                 </div>
    //             </>
    //         </DialogContent>

    //     </Dialog>
    // );
};

export default PhotoSwipe;
