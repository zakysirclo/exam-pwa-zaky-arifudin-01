/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import graphRequest from '@graphql_request';
import graphRequestClear from '@graphql_ssr';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCmsList } from '@services/graphql/schema/config';
import { customerTokenKey, storeConfigNameCookie } from '@config';
import { getResolver } from '@core_modules/slug/services/graphql/schema';
import getCmsSSRProps from '@core_modules/cms/pages/default/ssr';
import createApolloClient from '@lib/apollo/apolloClient';
import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import getSSRCategoryProps from '@core_modules/catalog/pages/category/ssr';
import getSSRProductProps from '@core_modules/product/pages/default/ssr';

const getSSRProps = async (ctx) => {
    // config
    const apolloClient = createApolloClient({}, ctx);
    const allcookie = ctx.req ? ctx.req.cookies : {};
    const obj = {
        slug: ctx?.query?.slug,
        ...(await serverSideTranslations(ctx.locale, ['common', 'product', 'category', 'validate', 'catalog', 'contact'])),
        token: ctx.query && allcookie[customerTokenKey] ? allcookie[customerTokenKey] : '',
        url_key: '',
    };

    const cmsList = await graphRequest(getCmsList);
    obj.cms_page = cmsList.storeConfig && cmsList.storeConfig.cms_page ? cmsList.storeConfig.cms_page : '';

    // ============== URL RESOLVER ================
    let url = obj.slug.join('/');
    // suffix based on storeConfig
    const suffix = cmsList?.category_url_suffix || '.html';
    const cmsPages = obj.cms_page.split(',');
    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;

    // url resolver
    let urlResolver = await graphRequestClear(getResolver(url));
    urlResolver = urlResolver?.urlResolver ?? null;
    const urlType = urlResolver?.type ?? '';
    const IS_CMS = urlType === 'CMS_PAGE';
    const IS_PRODUCT = urlType === 'PRODUCT';
    const IS_CATEGORY = urlType === 'CATEGORY';
    // ============== URL RESOLVER ================

    // ============== LAYOUT SSR ================
    let storeConfigExtra = '';
    if (IS_PRODUCT) {
        storeConfigExtra += 'label_sale_enable';
    }
    const layoutSSR = await getLayoutSSRProps({ apolloClient, storeConfigExtra });
    // ============== LAYOUT SSR ================

    if (IS_CMS) {
        await getCmsSSRProps({ apolloClient, identifier: url });
    } else if (IS_PRODUCT) {
        obj.ssrProduct = await getSSRProductProps({
            apolloClient,
            slug: obj.slug[0],
            storeConfig: layoutSSR.storeConfig,
        });
    } else if (IS_CATEGORY) {
        await getSSRCategoryProps({ apolloClient, urlResolver });
    }

    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...obj,
            urlResolver,
            urlType,
            apolloState,
        },
    };
};

export default getSSRProps;
