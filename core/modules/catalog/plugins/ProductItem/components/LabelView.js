import Label from '@common_productlabel';

const LabelView = (props) => {
    const {
        __typename, new_from_date, new_to_date, sale, isGrid = true,
        price_range, special_from_date, special_to_date, spesificProduct,
        storeConfig = {},
    } = props;
    return (
        <div className="absolute top-2 tablet:top-3 left-2 tablet:left-3 right-1 rounded z-[1] flex flex-row justify-between w-full">
            <Label
                productType={__typename}
                newFromDate={new_from_date}
                newToDate={new_to_date}
                sale={sale}
                config={{
                    enable: storeConfig?.pwa?.label_enable,
                    new: {
                        enable: storeConfig?.pwa?.label_new_enable,
                    },
                    sale: {
                        enable: storeConfig?.pwa?.label_sale_enable,
                    },
                }}
                priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                specialFromDate={special_from_date}
                specialToDate={special_to_date}
                isGrid={isGrid}
            />
        </div>
    );
};

export default LabelView;
