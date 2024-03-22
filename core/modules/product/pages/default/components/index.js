/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
import ProductDetailAction from '@plugin_productdetailaction';
import dynamic from 'next/dynamic';

const Breadcrumb = dynamic(() => import('@common_breadcrumb'), { ssr: false });

const ProductPage = (props) => {
    const {
        breadcrumbsData,
    } = props;

    return (
        <div className="product-detail">
            <Breadcrumb
                withHome
                iconHomeOnly
                className="desktop:mt-[0px] tablet:mt-[0px] mobile:mt-[16px] desktop:px-[0px] tablet:px-[16px] mobile:px-[16px]"
                data={breadcrumbsData}
            />
            <ProductDetailAction
                useReviewList
                useProductTabs
                useProductImagePreview
                useShareProduct
                useProductRelated
                useProductUpsell
                useStickyImageSlider
                {...props}
            />
        </div>
    );
};

export default ProductPage;
