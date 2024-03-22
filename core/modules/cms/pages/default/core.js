/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
import Layout from '@layout';
import { getCmsPage } from '@core_modules/cms/services/graphql';
import Content from '@core_modules/cms/pages/default/components';

const CmsSlug = (props) => {
    const {
        pageConfig, t, slug, ...other
    } = props;
    const { data, error, loading } = getCmsPage({ identifier: slug[0] });
    const ogContent = {};
    if (data && data.cmsPage) {
        if (data.cmsPage.meta_description) {
            ogContent.description = {
                type: 'meta',
                value: data.cmsPage.meta_description,
            };
        }
        if (data.cmsPage.meta_keywords) {
            ogContent.keywords = {
                type: 'meta',
                value: data.cmsPage.meta_keywords,
            };
        }
    }
    const Config = {
        title: data && data.cmsPage ? data.cmsPage.meta_title || data.cmsPage.title : '',
        headerTitle: data && data.cmsPage ? data.cmsPage.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
        ogContent,
        tagSelector: 'swift-page-cms',
    };
    const isHome = pageConfig?.pageType;

    return (
        <Layout {...props} pageConfig={pageConfig || Config} data={data} isCms isHomepage={isHome === 'home'}>
            {other.storeConfig.pwa.use_cms_page_enable ? <h1 style={{ display: 'none' }}>{Config.title}</h1> : null}
            <Content data={data} t={t} loading={loading} error={error} {...other} />
        </Layout>
    );
};

export default CmsSlug;
