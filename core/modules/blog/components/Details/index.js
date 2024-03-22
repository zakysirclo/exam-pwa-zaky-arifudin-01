/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */
import Typography from '@common_typography';
import formatDate from '@helper_date';
import Divider from '@common_divider';
import Button from '@common_button';
import Link from 'next/link';
import ShareIcons from '@core_modules/blog/components/ShareIcon';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { basePath, modules } from '@config';
import { getHost } from '@helper_config';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';

const Detail = (props) => {
    const {
        title, publish_date, featured_image_url, featured_image_alt, url_key,
        short = true, t, short_content, content, storeConfig,
    } = props;

    const { link, featuredImage } = modules.blog;
    const enable = storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig.pwa.thumbor_https_http;
    const url = storeConfig.pwa.thumbor_url;
    const imageUrl = generateThumborUrl(featured_image_url, 500, 500, enable, useHttpsOrHttp, url);

    return (
        <div className="p-[15px] desktop:w-[79%] tablet:w-[79%] mobile:w-[100%]">
            <Typography variant={short ? 'h2' : 'h1'} className="text-lg mb-[15px] uppercase">
                {title}
            </Typography>
            <div className="flex flex-row mb-[15px] items-center">
                <Typography>{formatDate(publish_date || Date.now())}</Typography>
                <Divider />
                <ShareIcons url={`${getHost() + modules.blog.link.detail.as}${url_key}`} />
            </div>
            {
                featuredImage
                    ? (

                        <div className="w-[100%] h-auto my-[10px] mobile:flex mobile:flex-col mobile:max-h-fit">
                            <source srcSet={imageUrl} type="image/webp" />
                            <source srcSet={getImageFallbackUrl(imageUrl)} type="image/jpeg" />
                            <img
                                src={imageUrl}
                                alt={featured_image_alt}
                                className="w-full h-auto"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `${basePath}/assets/img/placeholder.png`;
                                }}
                            />
                        </div>
                    )
                    : null
            }
            {
                !short
                    ? (
                        <>
                            <div className="text-sm pb-[20px] [&>img]:w-full [&>img]:h-auto">
                                <CmsRenderer content={content} storeConfig={storeConfig} />
                            </div>
                            <div className="flex flex-row mx-[30px] items-center">
                                <Typography>
                                    {t('blog:share')}
                                    {' '}
                                    :
                                </Typography>
                                <ShareIcons url={`${getHost() + modules.blog.link.detail.as}${url_key}`} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-sm pb-[20px] [&>img]:w-full [&>img]:h-auto">
                                <CmsRenderer content={short_content} storeConfig={storeConfig} />
                            </div>
                            <Link href={link.detail.href} as={link.detail.as + url_key}>
                                <Button rootClassName="text-left">
                                    <Typography className="text-neutral-white uppercase font-bold" color="white">
                                        {t('blog:readMore')}
                                    </Typography>
                                </Button>
                            </Link>
                        </>
                    )
            }
        </div>
    );
};

export default Detail;
