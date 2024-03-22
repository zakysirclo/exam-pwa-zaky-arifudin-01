import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from '@common_image';

const ItemProduct = (props) => {
    const {
        name, qty_rma, price_incl_tax, image_url,
        currency = 'IDR', custom_fields, storeConfig = {},
    } = props;
    const { t } = useTranslation(['return']);

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 10);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 10);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center basis-full gap-4">
                <div className="w-[105px] h-[105px]">
                    <Image
                        src={image_url}
                        className=""
                        alt={name}
                        width={defaultWidth}
                        height={defaultHeight}
                        quality={80}
                        storeConfig={storeConfig}
                    />
                </div>
                <div className="flex flex-col">
                    <Typography variant="span">{name}</Typography>
                    <Typography variant="span">{formatPrice(price_incl_tax, currency)}</Typography>
                    <Typography variant="span" className="">
                        {t('common:title:qty')}
                        {' '}
                        :
                        {' '}
                        {qty_rma || 0}
                    </Typography>
                    {
                        custom_fields.map((field, indx) => (
                            <Typography key={indx} variant="span" className="">
                                {field.field.frontend_labels[0].value}
                                {' '}
                                :
                                {' '}
                                {field.value.frontend_labels[0].value}
                            </Typography>
                        ))
                    }
                    <div className="flex-grow" />
                </div>
            </div>
        </div>
    );
};

export default ItemProduct;
