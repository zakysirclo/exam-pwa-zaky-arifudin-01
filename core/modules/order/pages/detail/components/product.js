import Image from '@common_image';
import Typography from '@common_typography';
import useStyles from '@core_modules/order/pages/detail/style';
import { formatPrice } from '@helper_currency';
import React from 'react';

const ItemProduct = ({
    name, price_incl_tax, row_total_incl_tax, qty_ordered, currency, t, image_url, storeConfig,
}) => {
    const styles = useStyles();

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 10);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 10);

    return (
        <div className={styles.itemContainer}>
            <div className={styles.productImgContainer}>
                <Image
                    src={image_url}
                    className={styles.productImg}
                    alt={name}
                    width={defaultWidth}
                    height={defaultHeight}
                    quality={80}
                    storeConfig={storeConfig}
                />
            </div>
            <div className={styles.detailItem}>
                <Typography variant="label" className="clear-margin-padding">
                    {name || ''}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:price')}
                    {' '}
                    :
                    {formatPrice(price_incl_tax, currency)}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:qty')}
                    {' '}
                    :
                    {qty_ordered || 0}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:subtotal')}
                    {' '}
                    :
                    {formatPrice(row_total_incl_tax, currency)}
                </Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProduct;
