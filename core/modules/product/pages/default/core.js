/* eslint-disable array-callback-return */
/* eslint-disable radix */
import React from 'react';
import TagManager from 'react-gtm-module';
import generateSchemaOrg from '@core_modules/product/helpers/schema.org';
import Backdrop from '@common_backdrop';
import Layout from '@layout';
import Error from 'next/error';
import { getCookies } from '@helper_cookies';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import { StripHtmlTags } from '@helper_text';
import { useRouter } from 'next/router';
import { getProduct, getSeller } from '@core_modules/product/services/graphql';
import { getLoginInfo } from '@root/core/helpers/auth';

const ContentDetail = ({
    t, slug, product, keyProduct, Content, storeConfig, ssrProduct, isLogin,
}) => {
    const item = product.items[keyProduct];
    const reviewValue = parseInt(item.review.rating_summary, 0) / 20;
    const { data: dSeller, loading: loadSeller } = getSeller({
        fetchPolicy: 'no-cache',
        variables: {
            input: {
                seller_id: [parseFloat(item.seller_id)],
            },
        },
    });

    let enableMultiSeller = false;
    if (storeConfig) {
        enableMultiSeller = storeConfig.enable_oms_multiseller === '1' || storeConfig.enable_oms_multiseller === 1;
    }

    let dataSeller;
    if (!loadSeller && dSeller && enableMultiSeller) {
        dataSeller = dSeller.getSeller;
    }

    React.useEffect(() => {
        let categoryProduct = '';
        let categoryOne = '';
        // eslint-disable-next-line no-unused-expressions
        item.categories.length > 0
            && ((categoryOne = item.categories[0].name),
            item.categories.map(({ name }, indx) => {
                if (indx > 0) categoryProduct += `/${name}`;
                else categoryProduct += name;
            }));
        // GTM UA dayaLayer
        const tagManagerArgs = {
            dataLayer: {
                pageName: item.name,
                pageType: 'product',
                ecommerce: {
                    detail: {
                        product: [
                            {
                                name: item.name,
                                id: item.sku,
                                price: item.price_range.minimum_price.regular_price.value || 0,
                                category: categoryProduct,
                                dimensions4: item.stock_status,
                                dimensions5: reviewValue,
                                dimensions6: item.review.reviews_count,
                                dimensions7: item.sale === 0 ? 'NO' : 'YES',
                            },
                        ],
                    },
                    currencyCode: item.price_range.minimum_price.regular_price.currency || 'USD',
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: item.name,
            },
        };

        // GA 4 dataLayer
        const tagManagerArgsGA4 = {
            dataLayer: {
                pageName: item.name,
                pageType: 'product',
                ecommerce: {
                    items: [
                        {
                            item_name: item.name,
                            item_id: item.sku,
                            price: item.price_range.minimum_price.regular_price.value || 0,
                            item_category: categoryOne,
                            currency: item.price_range.minimum_price.regular_price.currency || 'USD',
                            item_stock_status: item.stock_status,
                            item_reviews_score: reviewValue,
                            item_reviews_count: item.review.reviews_count,
                            item_sale_product: item.sale === 0 ? 'NO' : 'YES',
                        },
                    ],
                },
                event: 'view_item',
            },
        };
        // Clear the previous ecommerce object.
        TagManager.dataLayer({ dataLayer: { ecommerce: null } });
        TagManager.dataLayer(tagManagerArgs);
        // Clear the previous ecommerce object.
        TagManager.dataLayer({ dataLayer: { ecommerce: null } });
        TagManager.dataLayer(tagManagerArgsGA4);
    }, []);

    const breadcrumbsData = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            let breadCrumbResult = [];
            const lastCategory = getCookies('lastCategory');
            const cat = item.categories.filter(({ url_path }) => url_path === lastCategory);
            if (cat.length > 0) {
                if (cat[0].breadcrumbs && cat[0].breadcrumbs.length > 0) {
                    breadCrumbResult = cat[0].breadcrumbs.map((bc) => ({
                        label: bc.category_name,
                        link: `/${bc.category_url_path}`,
                        active: false,
                        id: bc.category_id,
                    }));
                }
                breadCrumbResult.push({
                    label: cat[0].name,
                    link: `/${cat[0].url_path}`,
                    active: false,
                    id: cat[0].id,
                });
            }

            breadCrumbResult.push({
                label: item.name,
                link: '#',
                active: true,
            });
            return breadCrumbResult;
        }
        return [];
    }, [item]);

    return (
        <Content
            // product detail action
            t={t}
            product={product}
            productKey={keyProduct}
            slug={slug}
            isLogin={isLogin}
            storeConfig={storeConfig}
            // product detail
            breadcrumbsData={breadcrumbsData}
            dataSeller={dataSeller}
            ssrProduct={ssrProduct}
        />
    );
};

const PageDetail = (props) => {
    const {
        t, slug, Content, CustomHeader, storeConfig, ssrProduct,
    } = props;

    const isLogin = getLoginInfo();

    /**
     * Check if partial data exists, AKA being navigated from a PLP or search page.
     */
    const router = useRouter();
    const routePaths = router.asPath.substr(1);
    const routeKey = routePaths.split('?');
    const routeKeyFilter = routeKey.length > 0 ? routeKey[0].replaceAll('#', '') : null;
    const productProps = router.query.productProps ? JSON.parse(router.query.productProps) : {};
    const productVariables = {
        variables: {
            url: slug[0],
        },
    };

    const { loading, data, error } = getProduct(storeConfig, { ...productVariables });

    const isLoadingPDP = error || loading || !data;
    let isError = false;
    let errorMessage = '';
    if (error?.graphQLErrors && error?.graphQLErrors?.length > 0) {
        isError = true;
        errorMessage = error?.graphQLErrors[0]?.message;
    }

    const product = React.useMemo(() => {
        let productResult = {};
        let temporaryArr = [];
        let productByUrlMemo;
        if (data) {
            productResult = data.products;
            if (Object.keys(productProps).length > 0) {
                for (let i = 0; i < productResult.items.length; i += 1) {
                    if (routeKeyFilter === productResult.items[i].url_key) {
                        productByUrlMemo = [i];
                    }
                }
                productResult = {
                    ...productResult,
                    items: [
                        {
                            ...productResult.items[productByUrlMemo],
                        },
                    ],
                };
            }
            if (typeof window !== 'undefined') {
                if (productResult.items.length > 0) {
                    for (let i = 0; i < productResult.items.length; i += 1) {
                        if (routeKeyFilter === productResult.items[i].url_key) {
                            productByUrlMemo = [i];
                        }
                    }
                    const item = productResult.items[productByUrlMemo];
                    let isExist = false;
                    const viewedProduct = getLocalStorage('recently_viewed_product_pwa');

                    if (viewedProduct) {
                        temporaryArr = viewedProduct;
                        if (viewedProduct.length > 0) {
                            viewedProduct.map((val) => {
                                if (val.url_key === item?.url_key) {
                                    isExist = true;
                                }
                                return null;
                            });
                        }
                    }
                    if (isExist === false) {
                        temporaryArr = [];

                        const newItem = {
                            url_key: item?.url_key,
                        };
                        temporaryArr.push(newItem);
                        setLocalStorage('recently_viewed_product_pwa', temporaryArr);
                    }
                }
            }
        }

        return productResult;
    }, [data, productProps]);

    const productByUrl = React.useMemo(() => {
        let productByUrlResult;
        if (product?.items) {
            for (let i = 0; i < product.items.length; i += 1) {
                if (routeKeyFilter === product.items[i].url_key) {
                    productByUrlResult = [i];
                }
            }
        }
        return productByUrlResult;
    }, [product]);

    if (isError) {
        return (
            <Layout pageConfig={{}} CustomHeader={CustomHeader ? <CustomHeader /> : <></>} {...props}>
                <div className="product-detail-error">{errorMessage}</div>
            </Layout>
        );
    }

    if (isLoadingPDP) {
        return (
            <Layout pageConfig={{}} CustomHeader={CustomHeader ? <CustomHeader /> : <></>} {...props}>
                <Backdrop open />
            </Layout>
        );
    }

    if (product?.items?.length === 0) return <Error statusCode={404} />;

    const schemaOrg = generateSchemaOrg(product.items[productByUrl]);
    let keywords = {};
    if (product.items[productByUrl]?.meta_keywords) {
        keywords = {
            type: 'meta',
            value: product.items[productByUrl]?.meta_keywords,
        };
    }
    const config = {
        title: product.items[productByUrl].meta_title || product.items[productByUrl].name || '',
        bottomNav: false,
        header: 'absolute', // available values: "absolute", "relative", false (default)
        pageType: 'product',
        ogContent: {
            description: {
                type: 'meta',
                value: StripHtmlTags(product.items[productByUrl].meta_description || product.items[productByUrl].description.html),
            },
            keywords,
            'og:image': product.items[productByUrl].small_image.url,
            'og:image:type': 'image/jpeg',
            'og:description': StripHtmlTags(product.items[productByUrl].description.html),
            'og:image:width': storeConfig?.pwa?.image_product_width,
            'og:image:height': storeConfig?.pwa?.image_product_height,
            'og:image:alt': product.items[productByUrl].name || '',
            'og:type': 'product',
            'product:availability': product.items[productByUrl].stock_status,
            'product:category':
                product.items[productByUrl].categories
                && product.items[productByUrl].categories.length > 0
                && product.items[productByUrl].categories[0].name,
            'product:condition': 'new',
            'product:price:currency': product.items[productByUrl].price_range.minimum_price.final_price.currency,
            'product:price:amount': product.items[productByUrl].price_range.minimum_price.final_price.value,
            'product:pretax_price:currency': product.items[productByUrl].price_range.minimum_price.final_price.currency,
            'product:pretax_price:amount': product.items[productByUrl].price_range.minimum_price.final_price.value,
            'og:title': product.items[productByUrl].meta_title || product.items[productByUrl].name,
        },
        schemaOrg,
        tagSelector: 'swift-page-pdp',
    };

    return (
        <Layout isShowChat={false} pageConfig={config} CustomHeader={CustomHeader ? <CustomHeader /> : <></>} data={data} isPdp {...props}>
            <ContentDetail
                t={t}
                slug={slug[0]}
                keyProduct={productByUrl}
                product={product}
                ssrProduct={ssrProduct}
                Content={Content}
                isLogin={isLogin}
                storeConfig={storeConfig}
            />
        </Layout>
    );
};

export default PageDetail;
