import dynamic from 'next/dynamic';

const PriceFormat = dynamic(() => import('@common_priceformat'), { ssr: false });

const GeneratePrice = ({
    spesificProduct,
    loadPrice,
    errorPrice,
    priceDataItem,
    priceItem,
    additionalPrice,
}) => {
    if (loadPrice) return null;

    let priceProduct = priceItem;
    // handle if have an update price state
    if (priceItem && priceItem.update) {
        priceProduct = priceItem;
    }
    if (priceDataItem.length > 0 && !loadPrice && !errorPrice && !priceItem.update) {
        priceProduct = {
            priceRange: spesificProduct.price_range ? spesificProduct.price_range : priceDataItem[0].price_range,
            priceTiers: spesificProduct.price_tiers ? spesificProduct.price_tiers : priceDataItem[0].price_tiers,
            // eslint-disable-next-line no-underscore-dangle
            productType: priceDataItem[0].__typename,
            specialFromDate: priceDataItem[0].special_from_date,
            specialToDate: priceDataItem[0].special_to_date,
        };
    }
    return priceProduct && <PriceFormat isPdp {...priceProduct} additionalPrice={additionalPrice} />;
};

export default GeneratePrice;
