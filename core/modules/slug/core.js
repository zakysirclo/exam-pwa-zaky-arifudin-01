import dynamic from 'next/dynamic';

const CategoryPage = dynamic(() => import('@core_modules/catalog/pages/category/core'));
const ProductPage = dynamic(() => import('@core_modules/product/pages/default'));
const CmsPage = dynamic(() => import('@core_modules/cms/pages/default'));
const Error = dynamic(() => import('@core_modules/error/pages/default'));

const Slug = (props) => {
    const { urlType, urlResolver } = props;

    if (urlType === 'CATEGORY') {
        return <CategoryPage categoryId={urlResolver?.id} {...props} />;
    }
    if (urlType === 'PRODUCT') {
        return <ProductPage {...props} />;
    }
    if (urlType === 'CMS_PAGE') {
        return <CmsPage {...props} />;
    }
    return <Error statusCode={404} {...props} />;
};

export default Slug;
