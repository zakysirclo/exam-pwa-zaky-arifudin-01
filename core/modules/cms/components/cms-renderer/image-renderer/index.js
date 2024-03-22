import Image from '@common_image';
import { strToCSSObject } from '@helpers/text';
import { generateThumborUrl } from '@core/helpers/image';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';

const ImageRenderer = (props) => {
    const { domNode, storeConfig } = props;
    const {
        src = '', alt = '', style = '', ...attribs
    } = domNode.attribs;

    if (!domNode.attribs.src.includes('thumbor')) {
        let finalSrc = src;
        // check media url variable
        if (src.includes('media url=')) {
            const urlClean = finalSrc.replace('{{media url=', '').replace('}}', '').replace(/"/g, '');
            finalSrc = `${getStoreHost(getAppEnv())}media/${urlClean}`;
        }
        const optImg = generateThumborUrl(finalSrc, 0, 0, true, false, storeConfig.pwa.thumbor_url);

        return (
            <span>
                <Image
                    className={attribs.class}
                    classContainer="!pt-[unset]"
                    src={optImg}
                    alt={alt ?? 'image'}
                    width={attribs.width ? attribs.width.replace('px', '') : 0}
                    height={attribs.height ? attribs.height.replace('px', '') : 0}
                    storeConfig={storeConfig}
                />
                <style jsx>
                    {`
                        span :global(img.img) {
                            ${attribs.width ? `width: ${attribs.width} !important;` : ''}
                            ${attribs.height ? `height: ${attribs.height} !important;` : ''}
                            position: relative !important;
                            object-fit: cover;
                        }
                    `}
                </style>
            </span>
        );
    }

    return <img src={src} alt={alt ?? 'image'} style={strToCSSObject(style)} {...attribs} />;
};

export default ImageRenderer;
