/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import Typography from '@common_typography';
import Show from '@common_show';
import Divider from '@common_divider';
import Share from '@common_share';
import Button from '@common_button';
import GeneratePrice from '@core_modules/product/pages/default/components/GeneratePrice';
import Dialog from '@common_dialog';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import ProductLabel from '@common_productlabel';
import ProductRelated from '@core_modules/product/pages/default/components/ProductRelated';
import ProductUpsell from '@core_modules/product/pages/default/components/ProductUpsell';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { HeartIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

import parser from 'html-react-parser';
import Link from 'next/link';

const ImageSlider = dynamic(() => import('@common_imageslider'), { ssr: true });
const RatingStar = dynamic(() => import('@common_ratingstar'), { ssr: false });
const ProductTabs = dynamic(() => import('@core_modules/product/pages/default/components/ProductTabs'), { ssr: false });
const ProductTabsAccordion = dynamic(() => import('@core_modules/product/pages/default/components/ProductTabsAccordion'), { ssr: false });
const CustomizableOption = dynamic(() => import('@plugin_customizableitem'));
const OptionItem = dynamic(() => import('@plugin_optionitem'), { ssr: false });
const ReviewList = dynamic(() => import('@core_modules/product/pages/default/components/ReviewList'), { ssr: false });

const ProductDetailAction = ({
    t,
    slug,
    data,
    isLogin,
    banner,
    reviewValue,
    storeConfig,
    enablePopupImage,
    handleOpenImageDetail,
    isAwGiftCard,
    price,
    priceData,
    loadPrice,
    errorPrice,
    additionalPrice,
    spesificProduct,
    setSpesificProduct,
    dataPrice,
    checkCustomizableOptionsValue,
    customizableOptions,
    setCustomizableOptions,
    errorCustomizableOptions,
    handleWishlist,
    handleSetCompareList,
    expandData,
    openImageDetail,
    enableProductCompare,
    enableWishlist,
    smartProductTabs,
    useReviewList,
    useProductTabs,
    useProductImagePreview,
    useShareProduct,
    useProductRelated,
    useProductUpsell,
    setStockStatus,
    setAdditionalPrice,
    setBanner,
    showShortDesc,
    setShowShortDesc,
    reviewRef,
    isMobile,
    classContainer,
    classContentWrapper,
    imageSliderProps = {},
    classImageSliderWrapper,
    handleOption,
    setPrice,
    currencyCode,
    currencyCache,
    openOption,
    setOpenOption,
    enableMultiSeller,
    useStickyImageSlider = false,
    stickyImageSliderTopPosition,
    stockStatus,
}) => (
    <div className="plugin-product-detail-action">
        <div
            className={cx('product-detail-container', 'desktop:grid tablet:grid desktop:grid-cols-2 tablet:grid-cols-2', 'mt-[32px]', classContainer)}
        >
            <div className={cx('product-detail-slider', 'relative')}>
                <div
                    className={cx(classImageSliderWrapper)}
                    style={{
                        position: (useStickyImageSlider && stickyImageSliderTopPosition) ? 'sticky' : 'static',
                        top: (useStickyImageSlider && stickyImageSliderTopPosition) ? `${stickyImageSliderTopPosition}px` : 'unset',
                    }}
                >
                    <ImageSlider
                        useZoom={false}
                        data={banner}
                        storeConfig={storeConfig}
                        onClickZoomImage={useProductImagePreview && enablePopupImage ? handleOpenImageDetail : null}
                        {...imageSliderProps}
                        FooterComponentImagePreview={(
                            <ProductLabel
                                className="absolute top-[15px] left-[17px]"
                                stockStatus={stockStatus}
                                newFromDate={data?.new_from_date}
                                newToDate={data?.new_to_date}
                                specialFromDate={data?.special_from_date}
                                specialToDate={data?.special_to_date}
                                priceRange={data?.price_range}
                                config={{
                                    enable: storeConfig.pwa.label_enable,
                                    new: {
                                        enable: storeConfig.pwa.label_enable,
                                    },
                                    sale: {
                                        enable: storeConfig.pwa.label_sale_enable,
                                    },
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div
                className={cx(
                    'product-detail-info',
                    'desktop:pl-[35px]',
                    'desktop:ml-[48px] tablet:ml-[12px]',
                    'desktop:px-[0px] tablet:px-[0px] mobile:px-[16px]',
                    'desktop:flex tablet:flex desktop:flex-col tablet:flex-col',
                    'items-start',
                    classContentWrapper,
                )}
            >
                <Show when={enableMultiSeller && data?.seller && data?.seller?.seller_name}>
                    <Link href={`/seller/${data?.seller?.seller_path}`}>
                        <Typography
                            variant="bd-2"
                            className={cx(
                                'line-clamp-1 capitalize',
                                'leading-5',
                            )}
                            color="text-primary"
                        >
                            {parser(data?.seller?.seller_name || '')}
                        </Typography>
                    </Link>
                </Show>
                <Typography variant="h1" className="swift-page-title first-letter:uppercase mb-[12px] desktop:mt-[0px] tablet:mt-[0px] mobile:mt-[24px]">
                    {parser(data?.name || '-')}
                </Typography>
                <Show when={!isAwGiftCard && !loadPrice}>
                    <div className={cx('product-detail-info-price-container', isMobile && 'flex justify-between')}>
                        <div className="product-detail-info-price-left">
                            <GeneratePrice
                                additionalPrice={additionalPrice}
                                spesificProduct={spesificProduct}
                                errorPrice={errorPrice}
                                loadPrice={loadPrice}
                                priceDataItem={priceData}
                                priceItem={price}
                            />
                        </div>

                        {/* SHARE, WISHLIST, COMPARE MOBILE */}
                        <Show when={isMobile}>
                            <div className={cx('product-detail-info-price-right', 'flex items-center gap-1.5')}>
                                <Show when={enableWishlist}>
                                    <Button variant="plain" icon={false} iconOnly={false} onClick={handleWishlist} className="!p-0 whitespace-nowrap">
                                        <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                                            <HeartIcon className="h-[20px] w-[20px]" />
                                        </Typography>
                                    </Button>
                                </Show>
                                <Show when={enableProductCompare}>
                                    <Button
                                        variant="plain"
                                        icon={false}
                                        iconOnly={false}
                                        onClick={() => handleSetCompareList(data?.id)}
                                        className="!p-0 whitespace-nowrap"
                                    >
                                        <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                                            <ArrowsRightLeftIcon className="h-[20px] w-[20px]" />
                                        </Typography>
                                    </Button>
                                </Show>
                                <Share />
                            </div>
                        </Show>
                    </div>
                </Show>
                <Button
                    variant="plain"
                    className="!p-0 flex items-center"
                    onClick={() => {
                            reviewRef?.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="flex mt-[12px]">
                        <RatingStar value={reviewValue || 0} />
                        <Typography variant="p-2" className="ml-[4px]">
                            {`(${data.review.reviews_count || 0} ${t('product:review')})`}
                        </Typography>
                    </div>
                </Button>
                <Divider className="my-[24px]" />
                <CustomizableOption showCustomizableOption={false} />
                <div className="flex flex-col gap-4 w-[100%]">
                    <OptionItem
                        price={price}
                        t={t}
                        url_key={data?.url_key || ''}
                        dataPrice={dataPrice}
                        priceData={priceData}
                        setStockStatus={setStockStatus}
                        setAdditionalPrice={setAdditionalPrice}
                        customizableOptions={customizableOptions}
                        setCustomizableOptions={setCustomizableOptions}
                        errorCustomizableOptions={errorCustomizableOptions}
                        checkCustomizableOptionsValue={checkCustomizableOptionsValue}
                        additionalPrice={additionalPrice}
                        handleSelecteProduct={setSpesificProduct}
                        showAddToCart
                        labelAddToCart={t('common:button:addToCart')}
                        setBanner={setBanner}
                        showWishlist={false}
                        enableProductCompare={false}
                        showStockStatus
                        stockStatus={stockStatus}
                        storeConfig={storeConfig}
                        handleOption={handleOption}
                        setPrice={setPrice}
                        currencyCode={currencyCode}
                        currencyCache={currencyCache}
                        openOption={openOption}
                        setOpenOption={setOpenOption}
                        data={{
                            ...data,
                            url_key: slug,
                            review: data?.review,
                        }}
                    />
                </div>
                <Show when={data?.short_description?.html?.length > 0}>
                    <div className="product-detail-description-container">
                        <div className="product-detail-description relative">
                            <div
                                className={cx(
                                    'mt-[24px]',
                                    showShortDesc && 'h-auto',
                                    !showShortDesc && 'desktop:h-[120px] tablet:h-[80px] mobile:h-[80px] overflow-hidden',
                                    'text-base',
                                    'font-normal',
                                    'leading-2lg',
                                    'tracking-normal',
                                )}
                            >
                                {data?.short_description?.html ? <CmsRenderer content={data?.short_description?.html} /> : null}
                            </div>
                            <Show when={!showShortDesc && data?.short_description?.html?.length > 0}>
                                <div
                                    className="w-[100%] h-[25px] absolute bottom-[0px]"
                                    style={{
                                        background:
                                                'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7497373949579832) 43%, rgba(255,255,255,0) 100%)',
                                    }}
                                />
                            </Show>
                        </div>
                        <Show when={data?.short_description?.html?.length > 0}>
                            <Button variant="plain" onClick={() => setShowShortDesc(!showShortDesc)} className="!p-0 mt-[6px]">
                                <Typography variant="bd-2a">
                                    {showShortDesc ? `- ${t('common:label:showLess')}` : `+ ${t('common:label:showMore')}`}
                                </Typography>
                            </Button>
                        </Show>
                    </div>
                </Show>
                <Divider className="my-[24px]" />
                <div
                    className={cx(
                        'product-detail-info-footer-container',
                        'desktop:flex desktop:justify-between',
                        'desktop:block tablet:block mobile:hidden',
                        'w-[100%]',
                    )}
                >
                    <Show when={useShareProduct}>
                        <div className={cx('swift-product-detail-info-footer-share')}>
                            <Share />
                        </div>
                    </Show>
                    {/* WISHLIST & COMPARE DESKTOP, TABLET */}
                    <div
                        className={cx(
                            'swift-product-detail-info-footer-action',
                            'flex desktop:justify-end tablet:justify-start',
                            'desktop:mt-[0px] tablet:mt-[16px]',
                        )}
                    >
                        <Show when={enableWishlist}>
                            <Button variant="plain" icon={false} iconOnly={false} onClick={handleWishlist} className="!p-0 whitespace-nowrap swift-action-towishlist">
                                <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                                    {t('common:label:addToWishlist')}
                                    <HeartIcon className="h-[14px] w-[14px] ml-[6px]" />
                                </Typography>
                            </Button>
                        </Show>
                        <Show when={enableProductCompare}>
                            <Button
                                variant="plain"
                                icon={false}
                                iconOnly={false}
                                onClick={() => handleSetCompareList(data?.id)}
                                className="!p-0 whitespace-nowrap ml-[12px] swift-action-tocompare"
                            >
                                <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                                    {t('common:label:addToCompare')}
                                    <ArrowsRightLeftIcon className="h-[14px] w-[14px] ml-[6px]" />
                                </Typography>
                            </Button>
                        </Show>
                    </div>
                </div>
            </div>
        </div>

        <Show when={!isMobile && useProductTabs}>
            <div className={cx('swift-product-detail-tabs', 'desktop:mt-[64px] tablet:mt-[64px]', 'desktop:px-[0px] tablet:px-[16px] mobile:px-[16px]')}>
                <ProductTabs
                    data={expandData}
                    tabTitleWrapperClassName="[&>li:first-child>a]:!pl-[0px]"
                    tabHasContentClass="pt-[24px]"
                    tabContentClassName="mt-[24px]"
                    tabTitleClassName="hover:border-b-[4px] !min-w-0 !px-[20px] !py-[13px]"
                    tabTitleActiveClassName="border-b-[4px]"
                    smartProductTabs={
                        smartProductTabs || {
                            tab_2: {
                                label: null,
                                content: null,
                            },
                        }
                    }
                />
            </div>
        </Show>

        <Show when={isMobile && useProductTabs}>
            <ProductTabsAccordion
                data={expandData}
                smartProductTabs={
                    smartProductTabs || {
                        tab_2: {
                            label: null,
                            content: null,
                        },
                    }
                }
            />
        </Show>

        <Show when={useReviewList}>
            <div ref={reviewRef} className={cx('swift-product-list-review-container', 'mt-[48px]', 'desktop:px-[0px] tablet:px-[16px] mobile:px-[16px]')}>
                <ReviewList t={t} data={data} storeConfig={storeConfig} isLogin={isLogin} />
            </div>
        </Show>

        <Show when={useProductImagePreview && enablePopupImage}>
            <Dialog
                useCloseButton
                open={openImageDetail}
                variant="plain"
                classWrapper="!bg-opacity-100 bg-neutral-white"
                onClickClose={handleOpenImageDetail}
            >
                <ImageSlider horizontalThumbnail openImageDetail detectAutoScreen={false} data={banner} storeConfig={storeConfig} />
            </Dialog>
        </Show>
        <Show when={useProductRelated}>
            <ProductRelated
                t={t}
                dataProduct={data}
                isLogin={isLogin}
                storeConfig={storeConfig}
                carouselProps={{
                    className: 'mobile:!-ml-1 mobile:!-mr-1 tablet:!-ml-6 tablet:!-mr-6',
                    classNameItem: 'mobile:first:!ml-4 tablet:first:!ml-6',
                }}
            />
        </Show>
        <Show when={useProductUpsell}>
            <ProductUpsell
                t={t}
                dataProduct={data}
                isLogin={isLogin}
                storeConfig={storeConfig}
                carouselProps={{
                    className: 'mobile:!-ml-1 mobile:!-mr-1 tablet:!-ml-6 tablet:!-mr-6',
                    classNameItem: 'mobile:first:!ml-4 tablet:first:!ml-6',
                }}
            />
        </Show>
    </div>
);

export default ProductDetailAction;
