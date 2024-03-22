/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import { getBlogCategoryList, getBlogPostList } from '@core_modules/blog/services/graphql';
import Layout from '@layout';
import propTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import CommonImage from '@common_image';
import { basePath } from '@config';
import Button from '@common/Button';
import Pagination from '@common/Pagination';
import Typography from '@common/Typography';
import Tabs from '@common_tabs';
import formatDate from '@root/core/helpers/date';
import cx from 'classnames';
import Skeleton from '@core_modules/blog/pages/landing/components/Skeleton';
import useMediaQuery from '@root/core/hooks/useMediaQuery';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';
import Link from 'next/link';

const findObjectByTypeRecursive = (objects, targetType) => {
    for (const obj of objects) {
        if (obj.type === targetType) {
            // Found the object with the specified type
            return obj;
        }

        if (obj.elements && Array.isArray(obj.elements)) {
            // If the current object has nested elements, recursively search in them
            const nestedResult = findObjectByTypeRecursive(obj.elements, targetType);
            if (nestedResult) {
                return nestedResult; // Return the result if found in the nested elements
            }
        }
    }

    // Object with the specified type not found in this branch
    return null;
};

const FeaturedPosts = (props) => {
    const { isTablet, isDesktop, storeConfig } = props;
    const [getBlogs, { data }] = getBlogPostList();

    useEffect(() => {
        getBlogs({
            variables: {
                sort: {
                    position: 'ASC',
                },
                filter: {
                    featured: {
                        eq: '1',
                    },
                },
            },
        });
    }, []);

    const featuredPosts = useMemo(() => {
        try {
            if (data?.getBlogPostList?.blog_data?.length > 0) {
                const formattedData = data.getBlogPostList.blog_data.slice(0, 3).map((blogData) => {
                    let blogContent = blogData.content.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
                    blogContent = JSON.parse(blogContent[1]);
                    const imageUrl = blogData?.image || `${basePath}/assets/img/placeholder.png`;
                    const textContent = findObjectByTypeRecursive(blogContent.elements, 'text')?.content || '';

                    return {
                        ...blogData,
                        content: blogContent,
                        blogImage: imageUrl,
                        blogContent: textContent,
                    };
                });

                return formattedData;
            }
            // eslint-disable-next-line no-empty
        } catch (err) {
            // console.log('err', err);
        }
    }, [data]);

    const firstPost = (featuredPosts?.length > 0 && featuredPosts[0]) || null;
    const secondPost = (featuredPosts?.length > 1 && featuredPosts[1]) || null;
    const thirdPost = (featuredPosts?.length > 2 && featuredPosts[2]) || null;
    // const secondPost = null;
    // const thirdPost = null;

    const firstPostImageDimensions = {
        width: isDesktop ? 588 : 474,
        height: isDesktop ? 336 : 270,
    };
    const sidePostImageDimensions = {
        width: isDesktop ? 282 : 226,
        height: isDesktop ? 160 : 129,
    };

    if (!firstPost) return null;

    return (
        <div
            className={cx('tablet:flex', 'desktop:grid', 'desktop:grid-cols-2', 'mb-10', 'tablet:gap-5', 'desktop:gap-6', {
                '!flex': !secondPost,
            })}
        >
            {firstPost ? (
                <>
                    {secondPost ? (
                        <Link
                            href={`/blog/${firstPost.identifier}`}
                            className={cx(
                                'flex',
                                'tablet:w-[474px]',
                                'tablet:h-[270px]',
                                'desktop:w-[588px]',
                                'desktop:h-[336px]',
                                'rounded-lg',
                                'overflow-hidden',
                                'relative',
                            )}
                        >
                            <CommonImage src={firstPost?.blogImage} {...firstPostImageDimensions} storeConfig={storeConfig} />
                            <div className={cx('w-full', 'absolute', 'bottom-0', 'p-6', 'bg-[rgba(0,0,0,0.2)]')}>
                                <Typography variant="h2" className="!leading-lg !text-2xl !text-neutral-white">
                                    {firstPost?.title}
                                </Typography>
                                <div className="mt-2">
                                    <Typography variant="bd-2b" className="!text-neutral-white">
                                        {firstPost?.publish_date ? formatDate(firstPost.publish_date, 'D MMMM YYYY') : ''}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className={cx('flex', 'w-full', 'rounded-lg', 'relative')}>
                            <Link href={`/blog/${firstPost.identifier}`}>
                                <div
                                    className={cx(
                                        'tablet:w-[474px]',
                                        'tablet:h-full',
                                        'desktop:w-[588px]',
                                        'desktop:h-[336px]',
                                        'rounded-lg',
                                        'overflow-hidden',
                                        'mr-6',
                                    )}
                                >
                                    <CommonImage src={firstPost?.blogImage} {...firstPostImageDimensions} storeConfig={storeConfig} />
                                </div>
                            </Link>
                            <div className={cx('tablet:w-[282px]', 'desktop:w-[474px]', 'flex', 'flex-col')}>
                                <Link href={`/blog/${firstPost.identifier}`}>
                                    <Typography variant={isTablet ? 'h5' : 'h2'} className="!leading-lg !text-2xl">
                                        {firstPost?.title}
                                    </Typography>
                                </Link>
                                <div className="tablet:mt-[6px] desktop:mt-[10px]">
                                    <Typography variant={isTablet ? 'bd-3b' : 'bd-2b'} className="!text-neutral-500">
                                        {formatDate(firstPost?.publish_date, 'D MMMM YYYY')}
                                    </Typography>
                                    <div className="flex flex-col justify-between flex-1">
                                        <WidgetRenderer content={`${firstPost?.blogContent.substring(0, 118)}...`} skipTags={['pwa', 'a', 'img']} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : null}
            {secondPost ? (
                <div className="flex flex-col gap-3 desktop:gap-4">
                    {secondPost ? (
                        <>
                            {thirdPost ? (
                                <div className="flex desktop:w-[588px] tablet:h-[129px] desktop:h-[160px] relative">
                                    <Link href={`/blog/${secondPost.identifier}`}>
                                        <div className="w-[320px] tablet:w-[226px] desktop:w-[282px] rounded-lg overflow-hidden desktop:mr-6">
                                            <CommonImage src={secondPost?.blogImage} {...sidePostImageDimensions} storeConfig={storeConfig} />
                                        </div>
                                    </Link>
                                    <div
                                        className={cx(
                                            'w-full',
                                            'desktop:w-[282px]',
                                            'flex',
                                            'flex-col',
                                            'tablet:max-desktop:absolute',
                                            'tablet:max-desktop:bottom-0',
                                            'tablet:max-desktop:p-[10px]',
                                            'tablet:max-desktop:bg-[rgba(0,0,0,0.2)]',
                                        )}
                                    >
                                        <Link href={`/blog/${secondPost.identifier}`}>
                                            <Typography
                                                variant={isTablet ? 'h5' : 'h2'}
                                                className="!leading-lg desktop:!text-2xl max-desktop:text-neutral-white"
                                            >
                                                {secondPost?.title}
                                            </Typography>
                                        </Link>
                                        <div className="tablet:mt-[6px] desktop:mt-[10px]">
                                            <Typography
                                                variant={isTablet ? 'bd-3b' : 'bd-2b'}
                                                className="tablet:text-neutral-white desktop:!text-neutral-500"
                                            >
                                                {formatDate(secondPost?.publish_date, 'D MMMM YYYY')}
                                            </Typography>
                                            {isDesktop ? (
                                                <div className="flex flex-col justify-between flex-1">
                                                    <WidgetRenderer
                                                        content={`${secondPost?.blogContent.substring(0, 118)}...`}
                                                        skipTags={['pwa', 'a', 'img']}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={`/blog/${secondPost.identifier}`}
                                    className={cx(
                                        'flex',
                                        'tablet:w-[350px]',
                                        'tablet:h-[270px]',
                                        'desktop:w-[588px]',
                                        'desktop:h-[336px]',
                                        'rounded-lg',
                                        'overflow-hidden',
                                        'relative',
                                    )}
                                >
                                    <CommonImage src={secondPost?.blogImage} {...firstPostImageDimensions} storeConfig={storeConfig} />
                                    <div className="w-full absolute bottom-0 p-6 bg-[rgba(0,0,0,0.2)]">
                                        <Typography variant="h2" className="!leading-lg !text-2xl !text-neutral-white">
                                            {secondPost?.title}
                                        </Typography>
                                        <div className="mt-2">
                                            <Typography variant="bd-2b" className="!text-neutral-white">
                                                {secondPost?.publish_date ? formatDate(secondPost.publish_date, 'D MMMM YYYY') : ''}
                                            </Typography>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </>
                    ) : null}
                    {thirdPost ? (
                        <div className="flex desktop:w-[588px] tablet:h-[129px] desktop:h-[160px] relative">
                            <Link href={`/blog/${thirdPost.identifier}`}>
                                <div className="w-[320px] tablet:w-[226px] desktop:w-[282px] rounded-lg overflow-hidden desktop:mr-6">
                                    <CommonImage src={thirdPost?.blogImage} {...sidePostImageDimensions} storeConfig={storeConfig} />
                                </div>
                            </Link>
                            <div
                                className={cx(
                                    'w-full',
                                    'desktop:w-[282px]',
                                    'flex',
                                    'flex-col',
                                    'tablet:max-desktop:absolute',
                                    'tablet:max-desktop:bottom-0',
                                    'tablet:max-desktop:p-[10px]',
                                    'tablet:max-desktop:bg-[rgba(0,0,0,0.2)]',
                                )}
                            >
                                <Link href={`/blog/${thirdPost.identifier}`}>
                                    <Typography
                                        variant={isTablet ? 'h5' : 'h2'}
                                        className="!leading-lg desktop:!text-2xl max-desktop:text-neutral-white"
                                    >
                                        {thirdPost?.title}
                                    </Typography>
                                </Link>
                                <div className="tablet:mt-[6px] desktop:mt-[10px]">
                                    <Typography
                                        variant={isTablet ? 'bd-3b' : 'bd-2b'}
                                        className="tablet:text-neutral-white desktop:!text-neutral-500"
                                    >
                                        {formatDate(thirdPost?.publish_date, 'D MMMM YYYY')}
                                    </Typography>
                                    {isDesktop ? (
                                        <div className="flex flex-col justify-between flex-1">
                                            <WidgetRenderer
                                                content={`${thirdPost?.blogContent.substring(0, 118)}...`}
                                                skipTags={['pwa', 'a', 'img']}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};

const BlogCategories = (props) => {
    const { data, handleChangeCategory } = props;
    const categories =
        [
            { title: 'All Categories' },
            ...(data?.getBlogCategoryList?.blog_category?.map((category) => ({
                title: category.title || '',
                id: category.category_id,
            })) || []),
        ] || [];
    const [activeTabs, setActiveTabs] = useState(0);
    const handleChangeTab = (idx) => {
        setActiveTabs(idx);
        handleChangeCategory(categories[idx]);
    };

    return (
        <div className="mb-6">
            <Typography variant="h1" className="!mb-4">
                Blog Category
            </Typography>
            <Tabs data={categories} onChange={handleChangeTab} allItems={false} activeTabsProps={activeTabs} tabTitleClassName="cursor-pointer" />
        </div>
    );
};

const CoreLanding = (props) => {
    const { t, pageConfig = {}, storeConfig } = props;
    const config = {
        title: 'Blog',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog',
        bottomNav: false,
        ...pageConfig,
        tagSelector: 'swift-page-bloglanding',
    };
    const [page, setPage] = React.useState(1);

    const [getBlogs, { loading, data, error }] = getBlogPostList();
    const [getBlogCategories, blogCategoriesResult] = getBlogCategoryList();
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);

    const { isMobile, isTablet, isDesktop } = useMediaQuery();

    const mediaQueries = { isMobile, isTablet, isDesktop };

    const handleLoadMore = (newPage = 0) => {
        setPage(newPage);
    };

    const handleChangeCategory = (category) => {
        setCurrentCategory(category?.id || null);
    };

    useEffect(() => {
        const variables = {
            pageSize: 10,
            currentPage: page,
            filter: {},
            sort: {
                publish_date: 'DESC',
            },
        };
        if (currentCategory !== null) {
            variables.filter = { category_id: { eq: currentCategory } };
        }

        getBlogs({
            variables,
        });
        getBlogCategories();
    }, [page, currentCategory]);

    useEffect(() => {
        setPage(1);
    }, [currentCategory]);

    const blogPosts = useMemo(() => {
        try {
            if (data?.getBlogPostList?.blog_data?.length > 0) {
                const formattedData = data.getBlogPostList.blog_data.map((blogData) => {
                    let blogContent = blogData.content.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
                    blogContent = JSON.parse(blogContent[1]);
                    // const image = findObjectByTypeRecursive(blogContent.elements, 'single_image')?.image || '';
                    // const imageUrl = image ? `${getStoreHost(getAppEnv())}media/${image}` : `${basePath}/assets/img/placeholder.png`;
                    const imageUrl = blogData?.image || `${basePath}/assets/img/placeholder.png`;
                    const textContent = findObjectByTypeRecursive(blogContent.elements, 'text')?.content || '';

                    return {
                        ...blogData,
                        content: blogContent,
                        blogImage: imageUrl,
                        blogContent: textContent,
                    };
                });

                return formattedData;
            }
            // eslint-disable-next-line no-empty
        } catch (err) {
            // console.log('err', err);
        }
    }, [data]);

    useEffect(() => {
        if (blogPosts?.length > 0) {
            if (!featuredPosts.length > 0) {
                setFeaturedPosts(blogPosts.slice(0, 3));
            }
        }
    }, [blogPosts]);

    useEffect(() => {
        if (error || blogCategoriesResult.error) {
            window.toastMessage({
                open: true,
                text: t('blog:error:notFound'),
                variant: 'error',
            });
        }
    }, [error, blogCategoriesResult.error]);

    return (
        <Layout {...props} pageConfig={config}>
            {featuredPosts?.length > 0 && !isMobile ? <FeaturedPosts {...mediaQueries} storeConfig={storeConfig} /> : null}
            {!blogCategoriesResult?.loading && blogCategoriesResult?.data ? (
                <BlogCategories {...blogCategoriesResult} handleChangeCategory={handleChangeCategory} />
            ) : null}
            {loading || blogCategoriesResult?.loading ? <Skeleton /> : null}
            {!loading && blogPosts?.length > 0 ? (
                <>
                    <div className="tablet:grid desktop:grid-cols-2 tablet:gap-6">
                        {blogPosts.map((blog, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={cx(
                                        'flex',
                                        'w-full',
                                        'mb-5',
                                        'mobile:max-tablet:flex-col',
                                        'desktop:w-[588px]',
                                        'tablet:mb-16',
                                        'tablet:h-[174px]',
                                    )}
                                >
                                    <Link href={`/blog/${blog.identifier}`}>
                                        <div
                                            className={cx(
                                                'w-full',
                                                'tablet:w-[282px]',
                                                'tablet:h-[174px]',
                                                'rounded-lg',
                                                'overflow-hidden',
                                                'tablet:mr-6',
                                            )}
                                        >
                                            <CommonImage src={blog.blogImage} width={282} height={174} storeConfig={storeConfig} />
                                        </div>
                                    </Link>
                                    <div className="w-full tablet:w-[320px] desktop:w-[282px] flex flex-col max-tablet:mt-4">
                                        <Link href={`/blog/${blog.identifier}`}>
                                            <Typography variant={isMobile ? 'h4' : 'h2'} className="!leading-lg tablet:!text-2xl">
                                                {blog.title}
                                            </Typography>
                                        </Link>
                                        <div className="tablet:my-[10px]">
                                            <Typography variant="bd-2b" className="!text-neutral-500 max-tablet:text-xs">
                                                {formatDate(blog.publish_date, 'D MMMM YYYY')}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col justify-between flex-1">
                                            <WidgetRenderer
                                                className="max-tablet:text-sm max-tablet:leading-4"
                                                content={`${blog.blogContent.substring(0, 118)}...`}
                                                skipTags={['pwa', 'a', 'img']}
                                            />
                                            <Button variant="plain" link={`/blog/${blog.identifier}`} className="!p-0">
                                                <Typography className="!text-primary">Read More</Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-end">
                        <Pagination
                            handleChangePage={handleLoadMore}
                            page={data?.getBlogPostList?.page_info?.current_page}
                            siblingCount={1}
                            className={cx('!p-0')}
                            totalPage={data?.getBlogPostList?.page_info?.total_pages}
                        />
                    </div>
                </>
            ) : null}
        </Layout>
    );
};

CoreLanding.propTypes = {
    Content: propTypes.func.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
    Skeleton: propTypes.func,
    WarningInfo: propTypes.func,
    pageConfig: propTypes.object,
};

CoreLanding.defaultProps = {
    Skeleton: () => {},
    WarningInfo: () => {},
    pageConfig: {},
};

export default CoreLanding;
