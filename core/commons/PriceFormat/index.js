/* eslint-disable camelcase */
import BundleProductTypePrice from '@common_priceformat/BundleProductTypePrice';
import ProductTypePrice from '@common_priceformat/ProductTypePrice';
import { currencyVar } from '@core/services/graphql/cache';
import { useTranslation } from 'next-i18next';
import React from 'react';

/**
 * Price Generator Component
 * @component
 * @param {array} priceRange - price range from magento GQL including regluar price and final price
 * @returns {object} [priceTiers] - tier prices from magento GQL
 */

const PriceFormat = ({
    priceRange = {},
    priceTiers = [],
    productType = 'SimpleProduct',
    isPdp = false,
    isQuickView = false,
    textClassName = '',
    ...other
}) => {
    const { t } = useTranslation(['common']);
    const currencyCache = currencyVar();

    if (!priceRange) {
        return <div className="price-format-invalid">{t('common:label:invalidPrice')}</div>;
    }

    if (productType === 'BundleProduct' || productType === 'AwGiftCardProduct') {
        return (
            <BundleProductTypePrice
                priceRange={priceRange}
                priceTiers={priceTiers}
                currencyCache={currencyCache}
                textClassName={textClassName}
                {...other}
            />
        );
    }

    return (
        <ProductTypePrice
            productType={productType}
            priceRange={priceRange}
            priceTiers={priceTiers}
            currencyCache={currencyCache}
            isPdp={isPdp}
            isQuickView={isQuickView}
            textClassName={textClassName}
            {...other}
        />
    );
};

export default PriceFormat;
