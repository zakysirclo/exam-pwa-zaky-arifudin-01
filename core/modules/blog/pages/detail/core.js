/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import Skeleton from '@common/Skeleton';
import Caraousel from '@common/Slick/Caraousel';
import Typography from '@common/Typography';
import Alert from '@common_alert';
import CommonImage from '@common_image';
import { getBlogPostList } from '@core_modules/blog/services/graphql';
import { getDetailProduct } from '@core_modules/catalog/services/graphql';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import formatDate from '@helper_date';
import Layout from '@layout';
import ProductItem from '@plugin_productitem';
import cx from 'classnames';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import Share from '@common_share';

const RelatedProduct = (props) => {
    const { url_key, storeConfig } = props;
    const [getProduct, { data }] = getDetailProduct();

    useEffect(() => {
        getProduct({
            variables: {
                url_key,
            },
        });
    }, []);

    if (data?.products?.items?.length > 0) {
        const productData = data.products.items[0];
        return (
            <ProductItem
                className="carousel-item [&:not(:last-child)]:mr-4 !min-w-[160px] tablet:!min-w-[230px] desktop:!min-w-[288px] !h-[initial]"
                {...productData}
                storeConfig={storeConfig}
                imageProps={{
                    className: cx(
                        'product-image',
                        '!w-[144px]',
                        '!h-[144px]',
                        'tablet:!w-[205px]',
                        'tablet:!h-[205px]',
                        'desktop:!w-[256px]',
                        'desktop:!h-[256px]',
                    ),
                    classContainer: cx(
                        'product-image-container',
                        '!w-[144px]',
                        '!h-[144px]',
                        'tablet:!w-[205px]',
                        'tablet:!h-[205px]',
                        'desktop:!w-[256px]',
                        'desktop:!h-[256px]',
                    ),
                }}
                enableQuickView
            />
        );
    }

    return null;
};

const CoreDetail = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const { t, pageConfig = {}, storeConfig } = props;
    const config = {
        title: 'Blog',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog',
        bottomNav: false,
        ...pageConfig,
        tagSelector: 'swift-page-blogdetail',
    };

    const [getBlogs, { loading, data, error }] = getBlogPostList();

    const blogPost = (data?.getBlogPostList?.blog_data?.length > 0 && data.getBlogPostList.blog_data[0]) || null;

    useEffect(() => {
        getBlogs({
            variables: {
                filter: {
                    identifier: {
                        eq: id,
                    },
                },
            },
        });
    }, [id]);

    return (
        <Layout {...props} pageConfig={config}>
            {error ? (
                <Alert severity="error">
                    <Typography className="text-red">{t('blog:error:notFound')}</Typography>
                </Alert>
            ) : null}
            {loading ? (
                <div className="flex flex-col">
                    <Skeleton />
                    <Skeleton className="my-4 !w-[200px]" />
                    <Skeleton className="my-4 !w-full desktop:!w-[1200px] !h-[600px] !rounded-2xl" />
                </div>
            ) : null}
            {blogPost ? (
                <>
                    <div>
                        {blogPost?.categories?.map((category, idx) => (
                            <Typography key={idx} className="!text-neutral-500 text-lg font-normal">
                                {category?.title}
                            </Typography>
                        ))}
                    </div>
                    <Typography variant="h1" className="!text-2xl tablet:!text-3xl my-4">
                        {blogPost?.title}
                    </Typography>
                    <div className="mb-6">
                        <Typography className="!text-neutral-500 text-lg font-normal">
                            {`Last Updated: ${formatDate(blogPost.update_time, 'D MMMM YYYY')}`}
                        </Typography>
                    </div>
                    {blogPost?.image ? (
                        <div className="tablet:w-[720px] tablet:h-[360px] desktop:w-[1200px] desktop:h-[600px] rounded-2xl overflow-hidden">
                            <CommonImage src={blogPost?.image} height={600} width={1200} storeConfig={storeConfig} />
                        </div>
                    ) : null}
                    <div className="mt-6">{blogPost?.content ? <CmsRenderer content={blogPost.content} storeConfig={storeConfig} /> : null}</div>
                    <div className="flex my-10 gap-1">
                        <Typography className="tablet:hidden">{t('blog:share')}</Typography>
                        <Share />
                    </div>
                    {blogPost?.related_products?.length > 0 ? (
                        <div>
                            <Typography variant="h1" className="capitalize mb-6 mt-10 text-3xl">
                                {t('blog:relatedProducts')}
                            </Typography>
                            <Caraousel>
                                {blogPost.related_products.map((relatedProduct, idx) => (
                                    <RelatedProduct key={idx} url_key={relatedProduct.url_key} storeConfig={storeConfig} />
                                ))}
                            </Caraousel>
                        </div>
                    ) : null}
                </>
            ) : null}
        </Layout>
    );
};

CoreDetail.propTypes = {
    Content: propTypes.func.isRequired,
    Skeleton: propTypes.func,
    WarningInfo: propTypes.func,
};

CoreDetail.defaultProps = {
    Skeleton: () => {},
    WarningInfo: () => {},
};

export default CoreDetail;
