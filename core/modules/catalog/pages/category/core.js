/* eslint-disable prefer-destructuring */
import Layout from '@layout';
import { StripHtmlTags } from '@helper_text';
import { getCategory, getPwaConfig } from '@core_modules/catalog/services/graphql';
import generateSchemaOrg from '@core_modules/catalog/helpers/schema.org';
import dynamic from 'next/dynamic';
import Content from '@core_modules/catalog/pages/category/components';
import Backdrop from '@common/Backdrop';

const ErrorView = dynamic(() => import('@core_modules/error/pages/default'), { ssr: false });

const Page = (props) => {
    const {
        categoryId, storeConfig: configStore, pageConfig = {}, ...other
    } = props;
    const { loading, data } = getCategory({
        productSize: configStore?.pwa?.page_size || 10,
        id: categoryId,
    });
    const { data: dataConfig } = getPwaConfig();
    const storeConfig = dataConfig?.storeConfig || configStore;
    let config = {
        ...pageConfig,
        tagSelector: 'swift-page-plp',
    };
    let schemaOrg = null;
    let ogDesc;
    let ogKeyword;
    let category = null;
    if (data && data.categoryList[0]) {
        // eslint-disable-next-line prefer-destructuring
        category = data.categoryList[0];
        schemaOrg = generateSchemaOrg(category, storeConfig);
        if (data.categoryList[0].meta_description || data.categoryList[0].description) {
            ogDesc = StripHtmlTags(data.categoryList[0].meta_description || data.categoryList[0].description) || '';
        }
        if (data.categoryList[0].meta_keywords) {
            ogKeyword = StripHtmlTags(data.categoryList[0].meta_keywords) || '';
        }
        config = {
            ...config,
            title: data.categoryList[0]?.meta_title || data.categoryList[0]?.name || '',
            headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
            header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
            bottomNav: 'browse',
            pageType: 'category',
            ogContent: {
                keywords: ogKeyword,
                'og:description': ogDesc,
            },
            schemaOrg,
        };
    }

    if (loading && !data) {
        return (
            <Layout {...props} pageConfig={config}>
                <Backdrop open />
            </Layout>
        );
    }

    if (!loading && data && !data.categoryList[0]) {
        return <ErrorView statusCode={404} {...props} />;
    }
    return (
        <Layout {...props} pageConfig={config} data={null} isPlp>
            <Content categoryId={categoryId} data={data} {...other} storeConfig={storeConfig} />
        </Layout>
    );
};

export default Page;
