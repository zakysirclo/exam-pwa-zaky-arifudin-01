/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import getQueryFromPath from '@helper_generatequery';
import { getProductAggregations, getProduct, getProductPrice } from '@core_modules/catalog/services/graphql';
import { priceVar } from '@core/services/graphql/cache';
import * as Schema from '@core_modules/catalog/services/graphql/productSchema';
import Content from '@plugin_productlist/components';
import { getLocalStorage, setLocalStorage } from '@core/helpers/localstorage';
import generateConfig from '@core_modules/catalog/helpers/generateConfig';
import getCategoryFromAgregations from '@core_modules/catalog/helpers/getCategory';
import { getTagManager, getTagManagerGA4 } from '@core_modules/catalog/helpers/catalogTagManager';
import TagManager from 'react-gtm-module';
import Alert from '@common/Alert';

const ProductList = (props) => {
    const {
        storeConfig, defaultSort, catId, sellerId = null, banner, customFilter, t, categoryPath, url_path, ...other
    } = props;
    const router = useRouter();
    const { path, query } = getQueryFromPath(router);

    /**
     * config from BO
     * pagination or loadmore
     */
    const isPagination = storeConfig && storeConfig.pwa && storeConfig.pwa.product_listing_navigation !== 'infinite_scroll';

    let availableFilter = [];
    let aggrProps = {};
    if (catId && catId !== 0) {
        aggrProps = {
            ...aggrProps,
            variables: {
                filter: { category_id: { eq: String(catId) } },
            },
        };
    }
    const { data: dataAgg } = getProductAggregations(aggrProps);
    availableFilter = dataAgg?.products?.aggregations ?? [];

    // cache price
    const cachePrice = priceVar();
    /**
     * start handle previous
     * backPage = (from category)
     * isQueryChanged = (from search result)
     */
    let backPage;
    let isQueryChanged;
    const pageInfo = getLocalStorage('page_info');
    if (pageInfo?.path === router.asPath) {
        backPage = pageInfo.page;
    } else if (
        !router.asPath.includes('catalogsearch/result')
        && (pageInfo?.path?.includes(router.asPath) || router.asPath.includes(pageInfo?.path))
    ) {
        isQueryChanged = true;
    }

    /**
     * handle page
     * specifically from search result not from category
     */
    if (pageInfo?.query?.q !== query?.q) {
        isQueryChanged = true;
    }
    // end handle previous

    const [products, setProducts] = React.useState({
        total_count: 0,
        items: [],
    });
    const [page, setPage] = React.useState(backPage || 1);
    const [pageSize, setPageSize] = React.useState(15);
    const [totalCount, setTotalCount] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    const [loadmore, setLoadmore] = React.useState(false);
    const [filterSaved, setFilterSaved] = React.useState(false);
    const timerRef = React.useRef(null);

    /**
     * config from BO
     * pagination or loadmore
     */
    const catalog_search_engine = storeConfig?.catalog_search_engine || '';
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        customFilter: false,
        search: '',
        pageSize,
        currentPage: page,
        filter: [],
        ...storeConfig.pwa,
    };
    const queryKeys = Object.keys(query);

    // set default sort when there is no sort in query
    if (defaultSort && !query.sort) {
        query.sort = JSON.stringify(defaultSort);
    }

    const setFiltervalue = (v) => {
        setFilterSaved(true);
        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(v).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    if (v.selectedFilter[idx] !== '' && !v[idx]) {
                        if (v.selectedFilter[idx] !== undefined && !idx.includes('seller/')) {
                            queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${v.selectedFilter[idx]}`;
                        } else if (v.selectedFilter[idx] !== '' && idx.includes('seller') && idx.includes('filter')) {
                            // for etalase filter
                            const newParam = idx.split('?');
                            queryParams += `${queryParams !== '' ? '&' : ''}${newParam[1]}=${v.selectedFilter[idx]}`;
                        }
                    }
                }
            } else if (v[key] !== 0 && v[key] !== '') {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        router.push(`/${url_path || '[...slug]'}`, encodeURI(`${path}${queryParams ? `?${queryParams}` : ''}`));
        setPage(1);
    };
    if (catId && catId !== 0) {
        config.filter.push({
            type: 'category_id',
            value: catId,
        });
    }

    if (!sellerId) {
        if (queryKeys[0] === 'catalogsearch/result?q') {
            config.search = query['catalogsearch/result?q'];
        } else if (queryKeys[0] === 'catalogsearch/') {
            config.search = query.q;
        }
        config = generateConfig(query, config, elastic, availableFilter);
    } else {
        const urlFilter = banner ? `seller/${sellerId}?filter` : `seller/${sellerId}/product?filter`;
        const setSortOnSellerPage = queryKeys.filter((key) => key.match(banner ? /seller\/\d\d\?sort/ : /seller\/\d\d\/product\?sort/));
        const setFilterSellerPage = queryKeys.find((key) => key === urlFilter);

        let filterObj = [
            {
                type: 'seller_id',
                value: sellerId,
            },
        ];
        // set default sort when there is no sort in query
        if (setSortOnSellerPage.length > 0) {
            query.sort = query[setSortOnSellerPage[0]];
        }
        if (setFilterSellerPage) {
            filterObj = [
                {
                    type: 'etalase',
                    value: query[setFilterSellerPage],
                },
                {
                    type: 'seller_id',
                    value: sellerId,
                },
            ];
        }
        config = {
            customFilter: false,
            search: '',
            pageSize: 8,
            currentPage: 1,
            filter: filterObj,
            ...storeConfig.pwa,
        };
        config = generateConfig(query, config, elastic, availableFilter);
    }

    const {
        loading,
        data,
        fetchMore,
        error: errorGetProduct,
    } = getProduct(
        config,
        {
            variables: {
                pageSize,
                currentPage: page,
            },
            fetchPolicy: config.sort && config.sort.key === 'random' && filterSaved ? 'cache-and-network' : 'cache-first',
        },
        router,
    );
    /* ====Start get price Product==== */
    const [getProdPrice, {
        data: dataPrice, loading: loadPrice, error: errorPrice,
    }] = getProductPrice(
        config,
        {
            context: {
                request: 'internal',
            },
        },
        router,
    );

    const generateIdentifier = `page_${page}_${router.asPath}`;

    React.useEffect(() => {
        if (typeof window !== 'undefined' && !cachePrice[generateIdentifier]) {
            getProdPrice({
                variables: {
                    pageSize,
                    currentPage: page,
                },
            });
        }
        // clear timeout when the component unmounts
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    React.useEffect(() => {
        if (dataPrice) {
            const identifier = generateIdentifier;
            const dataTemp = cachePrice;
            dataTemp[identifier] = dataPrice;
            priceVar({
                ...cachePrice,
            });
        }
    }, [dataPrice]);

    React.useEffect(() => {
        const totalProduct = products && products.total_count ? products.total_count : 0;
        const totalPageProduct = Math.ceil(totalProduct / pageSize);
        setTotalCount(totalProduct);
        setTotalPage(totalPageProduct);
    }, [products]);
    /**
     * useEffect for pagination to change loadmore to false
     * after getting response from GQL API
     *
     */
    React.useEffect(() => {
        if (data?.products) {
            setProducts(data.products);
        }
        setLoadmore(false);
    }, [data]);

    /**
     * useEffect
     * set localstorage : page info
     * handle back from PDP
     */
    React.useEffect(() => {
        setLocalStorage('page_info', { path: router.asPath, page, query });
    }, [page]);

    // generate filter if donthave custom filter
    const aggregations = React.useMemo(() => {
        const agg = [];
        if (!customFilter && !loading && products.aggregations) {
            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < products.aggregations.length; index++) {
                agg.push({
                    field: products.aggregations[index].attribute_code,
                    label: products.aggregations[index].label,
                    value: products.aggregations[index].options,
                });
            }
        }
        return agg;
    }, [products, loading, customFilter]);

    const category = getCategoryFromAgregations(aggregations);

    // eslint-disable-next-line no-shadow
    const renderEmptyMessage = (count, loading) => {
        const isEmptyProduct = data?.products?.items?.length < 1;
        if (!loading && isEmptyProduct) {
            return <Alert severity="warning">{t('catalog:emptyProductSearchResult')}</Alert>;
        }
        return null;
    };

    /**
     * function handleChangePage for pagination only
     * pagination is true
     * @param {*} pageInput
     */
    const handleChangePage = async (pageInput) => {
        try {
            if (fetchMore && typeof fetchMore !== 'undefined' && pageInput <= totalPage) {
                setLoadmore(true);
                fetchMore({
                    query: Schema.getProduct({ ...config, currentPage: pageInput }, router),
                    variables: {
                        pageSize,
                        currentPage: pageInput,
                    },
                    fetchPolicy: 'network-only',
                });
                getProdPrice({
                    variables: {
                        pageSize,
                        currentPage: pageInput,
                    },
                });
                setPage(pageInput);
                // to change setLoadmore to false on useEffect
                timerRef.current = setTimeout(() => {
                    window.scroll(0, 10);
                }, 200);
            }
        } catch (error) {
            setLoadmore(false);
        }
    };

    /**
     * function handleLoadMore for infinite loop
     */
    const handleLoadMore = async () => {
        setFilterSaved(false);
        const pageTemp = data.products.items.length / (parseInt(storeConfig?.pwa?.page_size, 10) || 10) + 1;
        try {
            if (fetchMore && typeof fetchMore !== 'undefined') {
                setLoadmore(true);
                fetchMore({
                    query: Schema.getProduct({ ...config, currentPage: pageTemp }, router),
                    variables: {
                        pageSize,
                        currentPage: pageTemp,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        setLoadmore(false);
                        return {
                            products: {
                                ...fetchMoreResult.products,
                                items: [...previousResult.products.items, ...fetchMoreResult.products.items],
                            },
                        };
                    },
                });

                getProdPrice({
                    variables: {
                        pageSize,
                        currentPage: pageTemp,
                    },
                });
            }
        } catch (error) {
            setLoadmore(false);
        }
    };

    /**
     * use effect set page size
     */
    React.useEffect(() => {
        if (storeConfig && storeConfig.pwa) {
            setPageSize(storeConfig && storeConfig.pwa && parseInt(storeConfig.pwa.page_size, 10));
        }
    }, [storeConfig]);

    React.useEffect(() => {
        if (isQueryChanged) {
            setProducts({
                total_count: 0,
                items: [],
            });
            handleChangePage(1);
        }
    }, [isQueryChanged]);

    React.useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
            setFilterSaved(false);
            // GTM UA dataLayer
            const tagManagerArgs = getTagManager(categoryPath, storeConfig, data);
            // GA 4 dataLayer
            const tagManagerArgsGA4 = getTagManagerGA4(categoryPath, data);
            TagManager.dataLayer(tagManagerArgs);
            TagManager.dataLayer(tagManagerArgsGA4);
        }
    }, [data]);

    useEffect(() => {
        if (errorGetProduct || errorPrice) {
            setLoadmore(false);
            window.toastMessage({
                variant: 'error',
                text: t('catalog:emptyProductSearchResult'),
                open: true,
            });
        }
    }, [errorGetProduct, errorPrice]);

    const contentProps = {
        loadmore,
        loading,
        t,
        query,
        customFilter,
        elastic,
        aggregations,
        setFiltervalue,
        category,
        defaultSort,
        config,
        products,
        categoryPath,
        renderEmptyMessage,
        storeConfig,
        page,
        totalPage,
        totalCount,
        handleChangePage,
        isPagination,
        handleLoadMore,
        errorGetProduct,
    };

    if (errorGetProduct || errorPrice) {
        return <Alert severity="error">{t('catalog:emptyProductSearchResult')}</Alert>;
    }

    return (
        <Content
            {...contentProps}
            {...other}
            loadPrice={loadPrice}
            errorPrice={errorPrice}
        />
    );
};

ProductList.propTypes = {
    label: propTypes.string,
    storeConfig: propTypes.object.isRequired,
    defaultSort: propTypes.shape({ key: propTypes.string, value: propTypes.string }),
    catId: propTypes.number.isRequired,
    categoryPath: propTypes.string.isRequired,
    banner: propTypes.string,
    t: propTypes.func.isRequired,
    isLogin: propTypes.number.isRequired,
    customFilter: propTypes.object,
};

ProductList.defaultProps = {
    label: 'Product list',
    defaultSort: {},
    banner: '',
    customFilter: undefined,
};

export default ProductList;
