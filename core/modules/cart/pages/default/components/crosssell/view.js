import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import Typography from '@common_typography';

const CrossSellView = (props) => {
    const { t, data = [] } = props;
    return (
        <div className="flex flex-col gap-6 py-16 desktop:pl-0">
            <Typography
                variant="h1"
            >
                {t('cart:crossell:title')}
            </Typography>
            <div className="w-full h-full">
                <Carousel
                    enableQuickView={false}
                    data={data}
                    Item={ProductItem}
                    className="!-ml-4 !-mr-4"
                    classNameItem="first:!ml-4"
                />
            </div>
        </div>
    );
};

export default CrossSellView;
