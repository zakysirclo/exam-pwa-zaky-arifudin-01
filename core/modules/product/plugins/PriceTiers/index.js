import Typography from '@common_typography';

const PriceTierList = ({ price, t }) => {
    const priceTierList = price?.priceTiers || [];

    if (priceTierList.length > 0) {
        return (
            <div className="price-tier-container">
                {priceTierList.map((item) => {
                    const priceTiers = {
                        quantity: item.quantity,
                        currency: item.final_price.currency,
                        price: item.final_price.value,
                        percent_off: item.discount.percent_off,
                    };
                    return (
                        <Typography variant="p-2" className="mb-1 mt-1">
                            {t('product:priceTiers', { priceTiers })}
                            {' '}
                            <strong>{t('product:saveAmount', { priceTiers })}</strong>
                        </Typography>
                    );
                })}
            </div>
        );
    }

    return null;
};

export default PriceTierList;
