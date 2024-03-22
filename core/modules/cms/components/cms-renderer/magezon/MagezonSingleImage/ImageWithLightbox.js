/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import { basePath } from '@config';
import { useState } from 'react';
import SimpleReactLightbox, { SRLWrapper, useLightbox } from 'simple-react-lightbox';

const ImageWithAction = ({
    withPopup, onClick, url, classContainer, classImage, image_width, image_height, title, storeConfig, ...other
}) => {
    const { openLightbox } = useLightbox();
    const handleClick = () => {
        onClick();
        setTimeout(() => {
            openLightbox();
        }, 100);
    };

    return (
        <a onClick={handleClick}>
            <Thumbor
                magezon
                src={url || `${basePath}/assets/img/placeholder.png`}
                className={classImage}
                quality={80}
                width={image_width ? image_width.replace('px', '') : ''}
                height={image_height ? image_height.replace('px', '') : ''}
                alt={title}
                classContainer={classContainer}
                storeConfig={storeConfig}
                {...other}
            />
        </a>
    );
};

const ImageWithLightbox = (props) => {
    const {
        url,
        popupImageUrl,
        className,
        width,
        height,
        alt,
        classContainer,
        onMouseOver,
        onMouseOut,
        storeConfig,
    } = props;
    const [openPopup, setOpenPopup] = useState(false);
    const callbacks = {
        onLightboxClosed: () => { onMouseOut(); setOpenPopup(false); },
    };

    const lightboxSetting = {
        buttons: {
            showThumbnailsButton: false,
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
            showNextButton: false,
            showPrevButton: false,
        },
        thumbnails: {
            showThumbnails: false,
        },
        caption: {
            captionContainerPadding: '10px 25% 30px 25%',
        },
    };

    return (
        <SimpleReactLightbox>
            <div className={openPopup ? '' : 'hide'}>
                <SRLWrapper options={lightboxSetting} callbacks={callbacks}>
                    <Thumbor
                        magezon
                        src={popupImageUrl}
                        className={className}
                        quality={80}
                        width={width}
                        height={height}
                        alt={alt}
                        classContainer={classContainer}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        storeConfig={storeConfig}
                    />
                </SRLWrapper>
            </div>
            {!openPopup && (
                <ImageWithAction
                    url={url}
                    image_width={width}
                    image_height={height}
                    classImage={className}
                    title={alt}
                    classContainer={classContainer}
                    onClick={() => setOpenPopup(!openPopup)}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    storeConfig={storeConfig}
                />
            )}
        </SimpleReactLightbox>
    );
};

export default ImageWithLightbox;
