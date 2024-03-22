import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import Typography from '@common_typography';
import GridList from '@common_gridlist';
import LabelView from '@plugin_productitem/components/LabelView';
import useMediaQuery from '@hook/useMediaQuery';

const RelatedProduct = ({ relatedProduct, t, layout }) => {
    const { isDesktop } = useMediaQuery();
    if (relatedProduct.length > 0) {
        if (layout !== 1) {
            return (
                <div>
                    <Typography variant="p" letter="uppercase">
                        {t('blog:relatedProducts')}
                    </Typography>
                    <GridList
                        data={relatedProduct}
                        ItemComponent={ProductItem}
                        className="grid"
                        itemProps={{
                            LabelView,
                            isGrid: true,
                            catalogList: true,
                            className: 'grid-item',
                        }}
                        gridItemProps={{
                            xs: 6, sm: 4, md: 2,
                        }}
                    />
                </div>
            );
        }
        return (
            <div className="p-[15px] mobile:w-full">
                <Typography variant="p" letter="uppercase">
                    {t('blog:relatedProducts')}
                </Typography>
                <Carousel
                    data={relatedProduct}
                    showArrow={isDesktop}
                    slideLg={6}
                    Item={ProductItem}
                    enableAddToCart
                    enableQuickView
                />
            </div>
        );
    }
    return null;
};

export default RelatedProduct;
