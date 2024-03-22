/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable radix */
import Typography from '@common_typography';
import React from 'react';
import CheckBox from '@common_forms/CheckBox';
import Image from '@common_image';
import { formatPrice } from '@helper_currency';

const ItemProductView = (props) => {
    const {
        checked, disabled, handleChange, name,
        image_url, price_incl_tax, currency, storeConfig = {},
    } = props;

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <div class="flex flex-row items-center basis-full desktop:basis-1/4">
            <CheckBox variant="single" checked={checked} disabled={disabled} onChange={handleChange} inputProps={{ 'aria-label': name }} />
            <div className="flex flex-row gap-3">
                <div className="w-[105px] h-[105px]">
                    <Image
                        src={image_url}
                        alt={name}
                        width={defaultWidth}
                        height={defaultHeight}
                        quality={80}
                        storeConfig={storeConfig}
                    />
                </div>
                <div className="flex flex-col gap-2 h-full align-top">
                    <Typography variant="bd-2a">
                        {name || ''}
                    </Typography>
                    <Typography>{formatPrice(price_incl_tax, currency)}</Typography>
                </div>
            </div>
        </div>
    );
};

export default ItemProductView;
