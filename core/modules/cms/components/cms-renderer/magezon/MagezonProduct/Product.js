/* eslint-disable operator-linebreak */
import { generateQueries, getProductListConditions } from '@core_modules/cms/helpers/getProductListConditions';
import { getPriceProductList, getProductList } from '@core_modules/cms/services/graphql';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import ProductItem from '@plugin_productitem';
import ContainerScroll from '@common/ContainerScroll';
import cx from 'classnames';
import { generateGridItemClass } from '@helpers/style';
import { BREAKPOINTS, COLORS } from '@core/theme/vars';
import { priceVar } from '@core/services/graphql/cache';

const Product = (props) => {
    const {
        type,
        condition,
        max_items,
        orer_by,
        product_addtocart,
        product_shortdescription,
        product_compare,
        product_image,
        product_name,
        product_price,
        product_review,
        product_swatches,
        product_wishlist,
        product_sku,
        product_display,
        item_xl,
        item_lg,
        item_md,
        item_sm,
        item_xs,
    } = props;

    const { storeConfig } = props;
    const { t } = useTranslation(['common', 'catalog']);
    const isProductGrid = type === 'product_grid';
    const isProductList = type === 'product_list';
    const isSingleProduct = type === 'single_product';

    // cache price
    const cachePrice = priceVar();

    const productProps = {
        storeConfig,
        enableQuickView: true,
        enableImage: product_image,
        enableAddToCart: product_addtocart,
        enableOption: product_swatches,
        enableWishlist: product_wishlist,
        enableProductCompare: product_compare,
        enableShortDescription: product_shortdescription,
        enablePrice: product_price,
        enableRating: product_review,
        enableProductName: product_name,
        className: cx('carousel-item', '!min-w-[138px]', 'tablet:!min-w-[230px]', 'desktop:!min-w-[288px]', {
            'flex-shrink-0': !isSingleProduct,
            '!basis-[160px] !tablet:basis-[230px] !desktop:basis-[288px]': !isProductGrid && !isSingleProduct,
            '[&:not(:last-child)]:mb-4': isProductList,
            'desktop:!max-w-[288px]': isSingleProduct && product_display === 'grid',
            [generateGridItemClass(item_xl, 'xl')]: isProductGrid && item_xl,
            [generateGridItemClass(item_lg, 'lg')]: isProductGrid && item_lg,
            [generateGridItemClass(item_md, 'md')]: isProductGrid && item_md,
            [generateGridItemClass(item_sm, 'sm')]: isProductGrid && item_sm,
            [generateGridItemClass(item_xs, 'xs')]: isProductGrid && item_xs,
            '!h-[initial]': !isProductGrid && !isSingleProduct,
        }),
        imageProps: {
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
        },
    };

    let content = '';
    const dataCondition = useMemo(() => getProductListConditions(condition), [condition]);
    const dataFilter = generateQueries(type, type === 'single_product' ? { sku: { eq: product_sku } } : dataCondition, orer_by);
    const [fetchProductList, { data, loading, error }] = getProductList({});
    const [fetchPriceProductList, { data: dataPrice }] = getPriceProductList({});

    useEffect(() => {
        fetchProductList({
            variables: { ...dataFilter, pageSize: max_items },
        });
        fetchPriceProductList({
            variables: { ...dataFilter, pageSize: max_items },
        });
    }, []);

    useEffect(() => {
        if (dataPrice && dataPrice?.products?.items?.length) {
            const identifier = 'home-product-caraousel';
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: t('catalog:emptyProductSearchResult'),
                variant: 'error',
                position: 'bottom-right',
            });
        }
    }, [error]);

    useEffect(() => {
        if (loading) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [loading]);

    if (type === 'single_product' && data?.products?.items) {
        content = data?.products?.items[0] && (
            <div
                className={cx('pb-4', {
                    grid: product_display === 'list',
                })}
            >
                <ProductItem
                    //
                    {...data.products.items[0]}
                    {...productProps}
                    isGrid={product_display === 'grid'}
                />
            </div>
        );
    }

    if (type === 'product_list' && data?.products?.items) {
        content = (
            <div className="grid desktop:!gap-4 tablet:!gap-3 mobile:!gap-2">
                {data?.products?.items.map((product, index) => (
                    <ProductItem
                        //
                        key={index}
                        isGrid={false}
                        {...product}
                        {...productProps}
                        preload={false} // change to {index === 0} to preload first product image of the list
                    />
                ))}
            </div>
        );
    }

    if (type === 'product_grid' && data?.products?.items) {
        content = (
            <div className="product-grid flex flex-wrap items-stretch desktop:!gap-4 tablet:!gap-3 mobile:!gap-2">
                {data?.products?.items.map((product, index) => (
                    <div className={cx('product-grid-item', productProps.className)}>
                        <ProductItem
                            //
                            key={index}
                            {...product}
                            {...productProps}
                            preload={false} // change to {index === 0} to preload first product image of the grid
                        />
                    </div>
                ))}
                <style jsx>
                    {`
                        @media screen and (min-width: ${BREAKPOINTS.xl}px) {
                            .product-grid-item {
                                max-width: calc(100% / ${item_xl});
                            }
                            .product-grid-item :global(.product-image-container),
                            .product-grid-item :global(img.product-image) {
                                width: calc(320px * 4 / ${item_xl} - (0.1rem)) !important;
                            }
                        }
                        @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
                            .product-grid-item {
                                max-width: calc(100% / ${item_lg});
                            }
                            .product-grid-item :global(.product-image-container),
                            .product-grid-item :global(img.product-image) {
                                width: calc(242px * 4 / ${item_lg} - (0.1rem)) !important;
                            }
                        }
                        @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
                            .product-grid-item {
                                max-width: calc(100% / ${item_md} - (0.5rem));
                            }
                            .product-grid-item :global(.product-image-container),
                            .product-grid-item :global(img.product-image) {
                                width: calc(194px * 4 / ${item_md} - (0.1rem)) !important;
                            }
                        }
                        @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
                            .product-grid-item {
                                max-width: calc(100% / ${item_sm} - (0.5rem));
                            }
                            .product-grid-item :global(.product-image-container),
                            .product-grid-item :global(img.product-image) {
                                width: calc(194px * 4 / ${item_sm} - (0.1rem)) !important;
                            }
                        }
                        @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
                            .product-grid-item {
                                max-width: calc(100% / ${item_xs} - (0.3rem));
                            }
                            .product-grid-item :global(.product-image-container),
                            .product-grid-item :global(img.product-image) {
                                width: calc(136px * 4 / ${item_xs} - (0.1rem)) !important;
                            }
                        }
                    `}
                </style>
            </div>
        );
    }

    if (type === 'product_slider' && data?.products?.items) {
        content = (
            <ContainerScroll showArrow className="desktop:!gap-4 tablet:!gap-3 mobile:!gap-2">
                {data?.products?.items.map((product, index) => (
                    <ProductItem
                        //
                        key={index}
                        {...product}
                        {...productProps}
                        preload={false} // change to {index === 0} to preload first product image of the list
                    />
                ))}
            </ContainerScroll>
        );
    }

    return (
        <>
            <div className="mgz-product-content">{!loading && !error ? content : null}</div>
            <style jsx>
                {`
                    :global(.carousel-item) {
                        background-color: ${COLORS.neutral.white};
                    }
                `}
            </style>
        </>
    );
};
export default Product;
