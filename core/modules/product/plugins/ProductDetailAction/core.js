/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
import cx from 'classnames';
import TagManager from 'react-gtm-module';
import useMediaQuery from '@hook/useMediaQuery';
import { useQuery } from '@apollo/client';
import { debuging, features, modules } from '@config';
import { getPriceFromList } from '@core_modules/product/helpers/getPrice';
import { localCompare } from '@services/graphql/schema/local';
import { currencyVar, priceVar } from '@core/services/graphql/cache';
import { getCustomerUid } from '@core_modules/productcompare/service/graphql';
import { getCookies } from '@helper_cookies';
import { useRouter } from 'next/router';
import {
    addProductsToCompareList,
    addWishlist as mutationAddWishlist,
    getProductLabel,
    getProductPrice,
    smartProductTabs,
} from '@core_modules/product/services/graphql';

const getPrice = (cachePrice, generateIdentifier, dataPrice) => {
    let productPrice = [];

    if (
        cachePrice[generateIdentifier]
        && cachePrice[generateIdentifier].products
        && cachePrice[generateIdentifier].products.items
    ) {
        productPrice = cachePrice[generateIdentifier].products.items;
    } else if (dataPrice && dataPrice.products && dataPrice.products.items) {
        productPrice = dataPrice.products.items;
    }

    return productPrice;
};

const ProductDetailAction = ({
    t,
    slug,
    product, // product.items[productKey]
    productKey,
    isLogin,
    storeConfig,
    useReviewList = false,
    useProductTabs = false,
    useProductImagePreview = false,
    useShareProduct = false,
    useProductRelated = false,
    useProductUpsell = false,
    ssrProduct,
    Content,
    ...other
}) => {
    const route = useRouter();
    const { isDesktop, isTablet, isMobile } = useMediaQuery();
    const context = isLogin && isLogin == 1 ? { request: 'internal' } : {};
    const item = product.items[productKey];

    const currencyCode = item?.price_range?.minimum_price?.regular_price?.currency || 'USD';
    const reviewRef = React.useRef(null);

    // cache currency
    const currencyCache = currencyVar();
    const cachePrice = priceVar();
    const generateIdentifier = slug.replace(/ /g, '-');
    const mount = React.useRef(null);
    const reviewValue = parseInt(item.review.rating_summary, 0) / 20;
    const enableProductCompare = modules.productcompare.enabled;
    const enableWishlist = modules.wishlist.enabled;

    const labels = getProductLabel(storeConfig, { context, variables: { url: slug[0] } });
    const { data: dataCompare, client } = useQuery(localCompare);
    const [addProductCompare] = addProductsToCompareList();
    const [addWishlist] = mutationAddWishlist();
    const [getUid, { data: dataUid, refetch: refetchCustomerUid }] = getCustomerUid();
    const [getProductTabs, { data: dataProductTabs }] = smartProductTabs();
    const [getProdPrice, { data: dataPrice, loading: loadPrice, error: errorPrice }] = getProductPrice(
        storeConfig.pwa || {},
    );

    // config
    let enablePopupImage = false;
    if (storeConfig && storeConfig.pwa) {
        enablePopupImage = storeConfig.pwa.popup_detail_image_enable;
    }

    // data tabs
    let expandData = [];
    if (item?.description?.html) {
        expandData = [
            ...expandData,
            {
                title: t('common:label:detail'),
                type: 'html',
                content: item.description.html,
            },
        ];
    }
    if (item.more_info && item.more_info.length > 0) {
        expandData = [
            ...expandData,
            {
                title: t('common:label:moreInfo'),
                type: 'react-component',
                content: (
                    <ul className="grid grid-cols-2">
                        {item.more_info.map((val, idx) => {
                            const isEmpty = val.value.includes('-- Please Select --');
                            return (
                                <li className={cx('grid', 'grid-cols-1', 'py-2')} key={idx}>
                                    <span className="text-2md font-bold">{val.label}</span>
                                    <span className="text-2md">{isEmpty ? '-' : val.value}</span>
                                </li>
                            );
                        })}
                    </ul>
                ),
            },
        ];
    }

    const bannerData = React.useMemo(() => {
        const bannerResult = [];
        if (item.media_gallery.length > 0) {
            // eslint-disable-next-line array-callback-return
            item.media_gallery.map((media) => {
                bannerResult.push({
                    link: '#',
                    imageUrl: media.url,
                    videoUrl: media && media.video_content,
                    imageAlt: media.label,
                });
            });
        } else {
            bannerResult.push({
                link: '#',
                imageUrl: item.image.url,
                videoUrl: '#',
                imageAlt: item.image.label,
            });
        }

        return bannerResult;
    }, [item?.media_gallery, item?.image]);

    const productTab = React.useMemo(() => {
        let productTabResult = {
            tab_1: {
                label: null,
                content: null,
            },
        };
        const productItem = dataProductTabs?.products;
        if (productItem?.items?.length > 0) {
            productTabResult = productItem.items[0].smartProductTabs
                ? productItem.items[0].smartProductTabs
                : {
                    tab_1: {
                        label: null,
                        content: null,
                    },
                };
        }
        return productTabResult;
    }, [dataProductTabs]);

    // Spesific product
    const [spesificProduct, setSpesificProduct] = React.useState({});
    // Customizable Options
    const [customizableOptions, setCustomizableOptions] = React.useState([]);
    const [errorCustomizableOptions, setErrorCustomizableOptions] = React.useState([]);
    // Image preview
    const [openImageDetail, setOpenImageDetail] = React.useState(false);
    const [selectedImgIdx, setSelectedImgIdx] = React.useState(false);
    // Banner
    const [banner, setBanner] = React.useState(bannerData);
    // Option
    const [openOption, setOpenOption] = React.useState(false);
    const [stockStatus, setStockStatus] = React.useState(item.stock_status);
    const [wishlist, setWishlist] = React.useState(false);
    // Show More Short Desc
    const [showShortDesc, setShowShortDesc] = React.useState(false);

    const [additionalPrice, setAdditionalPrice] = React.useState(0);
    const [price, setPrice] = React.useState({
        priceRange: item.price_range,
        priceTiers: item.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: item.__typename,
        specialFromDate: item.special_from_date,
        specialToDate: item.special_to_date,
    });

    const [stickyImageSliderTopPosition, setStickyImageSliderTopPosition] = React.useState(null);

    const checkCustomizableOptionsValue = React.useCallback(async () => {
        if (item.options && item.options.length > 0) {
            const requiredOptions = item.options.filter((op) => op.required);
            if (requiredOptions.length > 0) {
                if (customizableOptions.length > 0) {
                    let countError = 0;
                    const optionsError = [];
                    for (let idx = 0; idx < requiredOptions.length; idx += 1) {
                        const op = requiredOptions[idx];
                        const findValue = customizableOptions.find((val) => val.option_id === op.option_id);
                        if (!findValue) {
                            optionsError.push(op);
                            countError += 1;
                        }
                    }
                    if (countError > 0) {
                        await setErrorCustomizableOptions(optionsError);
                        return false;
                    }
                    return true;
                }
                await setErrorCustomizableOptions(requiredOptions);

                return false;
            }
            return true;
        }
        return true;
    }, [item?.options, customizableOptions]);

    const handleWishlist = () => {
        if (isLogin && isLogin == 1) {
            // GTM UA dataLayer
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: item.name,
                    label: item.name,
                    ecommerce: {
                        currencyCode,
                        add: {
                            products: [
                                {
                                    name: item.name,
                                    id: item.sku,
                                    price: item.price_range.minimum_price.regular_price.value || 0,
                                    category: item.categories.length > 0 ? item.categories[0].name : '',
                                    list: item.categories.length > 0 ? item.categories[0].name : '',
                                    dimensions4: item.stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            // GA 4 dataLayer
            TagManager.dataLayer({
                dataLayer: {
                    ecommerce: {
                        action: {
                            items: [
                                {
                                    currency: item.price_range.minimum_price.regular_price.currency,
                                    item_name: item.name,
                                    item_id: item.sku,
                                    price: item.price_range.minimum_price.regular_price.value || 0,
                                    item_category: item.categories.length > 0 ? item.categories[0].name : '',
                                    item_stock_status: item.stock_status,
                                },
                            ],
                        },
                    },
                    event: 'add_to_wishlist',
                },
            });
            addWishlist({
                variables: {
                    productId: item.id,
                },
            })
                .then(async () => {
                    await setWishlist(!wishlist);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    route.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:message:feedFailed'),
                    });
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    const handleSetCompareList = (id_compare) => {
        window.backdropLoader(true);
        const uid_product_compare = getCookies('uid_product_compare');
        const uids = [];
        let uid_customer = '';
        uids.push(id_compare.toString());
        if (isLogin) {
            /* eslint-disable */
            uid_customer = dataUid ? (dataUid.customer.compare_list ? dataUid.customer.compare_list.uid : '') : '';
            /* eslint-enable */
        }
        let isExist = false;
        if (dataCompare && dataCompare.items && dataCompare.items.length > 0) {
            dataCompare.items.map((itemCompare) => {
                if (itemCompare.uid === id_compare.toString()) {
                    isExist = true;
                }
                return null;
            });
        }
        if (!isExist) {
            addProductCompare({
                variables: {
                    uid: isLogin ? uid_customer : uid_product_compare,
                    products: uids,
                },
            })
                .then(async (res) => {
                    client.writeQuery({
                        query: localCompare,
                        data: {
                            item_count: res.data.addProductsToCompareList.item_count,
                            items: res.data.addProductsToCompareList.items,
                        },
                    });
                    if (isLogin) {
                        refetchCustomerUid();
                    }
                    window.backdropLoader(false);
                    window.toastMessage({ open: true, variant: 'success', text: t('common:productCompare:successCompare') });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                    });
                });
        } else {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('common:productCompare:existProduct'),
            });
        }
    };

    const handleOption = () => {
        const { productAvailableToCart } = features;
        // eslint-disable-next-line no-underscore-dangle
        if (productAvailableToCart[item.__typename]) {
            setOpenOption(true);
        } else {
            window.toastMessage({
                variant: 'warning',
                text: t('product:productNotAvailable'),
                open: true,
            });
        }
    };

    React.useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (isLogin && !dataUid && modules.productcompare.enabled) {
            getUid();
        }
    }, [isLogin, dataUid]);

    React.useEffect(() => {
        if (mount.current) {
            setPrice({
                priceRange: item.price_range,
                priceTiers: item.price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: item.__typename,
                specialFromDate: item.special_from_date,
                specialToDate: item.special_to_date,
            });
            setBanner(bannerData);
        }
    }, [item]);

    // price
    React.useEffect(() => {
        if (!cachePrice[generateIdentifier]) {
            getProdPrice({
                variables: {
                    url: slug,
                },
            });
        }
    }, [product, slug]);

    // price
    React.useEffect(() => {
        if (dataPrice) {
            const identifier = generateIdentifier;
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            setStockStatus(dataPrice?.products?.items[0]?.stock_status || item.stock_status);
            priceVar({ ...cachePrice });
        }
    }, [dataPrice, slug]);

    // product tabs
    React.useEffect(() => {
        if (slug[0] !== '') {
            getProductTabs({
                variables: {
                    filter: {
                        url_key: {
                            eq: slug[0],
                        },
                    },
                },
            });
        }
    }, [slug]);

    React.useEffect(() => {
        if (mount.current && errorCustomizableOptions && errorCustomizableOptions.length > 0) {
            // eslint-disable-next-line consistent-return
            const errorCustomizable = errorCustomizableOptions.filter((err) => {
                const findValue = customizableOptions.find((op) => op.option_id === err.option_id);
                return !findValue;
            });
            setErrorCustomizableOptions(errorCustomizable);
        }
    }, [customizableOptions]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const headerHeight = document.getElementById('sticky-header')?.getBoundingClientRect()?.height;
            const headerHeightFallback = document.getElementById('header-inner')?.getBoundingClientRect()?.height;
            if (storeConfig?.pwa?.enabler_sticky_header && ((headerHeight > 0) || (headerHeightFallback > 0))) {
                setStickyImageSliderTopPosition(headerHeight || headerHeightFallback);
            }
        }
    }, []);

    const handleOpenImageDetail = React.useCallback((e, idx) => {
        setOpenImageDetail(!openImageDetail);
        setSelectedImgIdx(idx);
    }, [openImageDetail]);

    // eslint-disable-next-line no-underscore-dangle
    const isAwGiftCard = item.__typename === 'AwGiftCardProduct';
    const priceData = getPriceFromList(
        dataPrice?.products?.items || cachePrice[generateIdentifier]?.products?.items,
        item?.id || null,
    );

    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1' || storeConfig.enable_oms_multiseller === 1;

    return (
        <Content
            isLogin={isLogin}
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
            enableProductCompare={enableProductCompare}
            enableWishlist={enableWishlist}
            t={t}
            slug={slug}
            reviewValue={reviewValue}
            isAwGiftCard={isAwGiftCard}
            price={price}
            priceData={priceData}
            loadPrice={loadPrice}
            errorPrice={errorPrice}
            banner={banner}
            storeConfig={storeConfig}
            enablePopupImage={enablePopupImage}
            openImageDetail={openImageDetail}
            handleOpenImageDetail={handleOpenImageDetail}
            dataPrice={getPrice(cachePrice, generateIdentifier, dataPrice)}
            additionalPrice={additionalPrice}
            setAdditionalPrice={setAdditionalPrice}
            spesificProduct={spesificProduct}
            setSpesificProduct={setSpesificProduct}
            selectedImgIdx={selectedImgIdx}
            setSelectedImgIdx={setSelectedImgIdx}
            checkCustomizableOptionsValue={checkCustomizableOptionsValue}
            customizableOptions={customizableOptions}
            setCustomizableOptions={setCustomizableOptions}
            errorCustomizable={errorCustomizableOptions}
            setErrorCustomizableOptions={setErrorCustomizableOptions}
            handleWishlist={handleWishlist}
            handleSetCompareList={handleSetCompareList}
            expandData={expandData}
            currencyCache={currencyCache}
            smartProductTabs={productTab}
            useReviewList={useReviewList}
            useProductTabs={useProductTabs}
            useProductImagePreview={useProductImagePreview}
            useShareProduct={useShareProduct}
            handleOption={handleOption}
            openOption={openOption}
            setOpenOption={setOpenOption}
            stockStatus={stockStatus}
            setStockStatus={setStockStatus}
            setBanner={setBanner}
            reviewRef={reviewRef}
            showShortDesc={showShortDesc}
            setShowShortDesc={setShowShortDesc}
            setPrice={setPrice}
            currencyCode={currencyCode}
            useProductRelated={useProductRelated}
            useProductUpsell={useProductUpsell}
            enableMultiSeller={enableMultiSeller}
            data={{
                ...item,
                labels,
            }}
            stickyImageSliderTopPosition={stickyImageSliderTopPosition}
            {...other}
        />
    );
};

export default ProductDetailAction;
