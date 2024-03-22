/* eslint-disable max-len */
import React from 'react';
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';
import cx from 'classnames';

const ItemGrouped = ({
    max = 10000,
    disabled = false,
    product,
    itemsCart = {},
    setItemsCart = () => {},
}) => {
    const [localValue, setLocalValue] = React.useState(itemsCart[product.sku] || 0);

    const handleLocalChange = (event) => {
        const val = event.target.value.replace(/\D/, '');
        if (!disabled) {
            if (val > max) {
                window.toastMessage({
                    open: true,
                    text: `Max input ${max}`,
                    variant: 'error',
                });
            } else {
                if (setItemsCart) {
                    const items = itemsCart;
                    items[product.sku] = val && val !== '' ? parseInt(val, 10) : 0;
                    setItemsCart(items);
                }
                setLocalValue(val);
            }
        }
    };

    return (
        <div className={cx('item-grouped flex flex-row items-center justify-between min-h-[50px] border-neutral-200 border-b-[1px] py-[10px]')}>
            <div className={cx('flex flex-col')}>
                <Typography>{product.name}</Typography>
                <PriceFormat
                    priceRange={product.price_range}
                    priceTiers={product.price_tiers}
                    // eslint-disable-next-line no-underscore-dangle
                    productType={product.__typename}
                    specialFromDate={product.special_from_date}
                    specialToDate={product.special_to_date}
                />
            </div>
            {
                product.stock_status === 'OUT_OF_STOCK'
                    ? (
                        <Typography variant="bd-2c">
                            {product.stock_status.replace(/_/g, ' ') || ''}
                        </Typography>
                    )
                    : (
                        <input
                            className={
                                cx(
                                    'text-center mr-[5px]',
                                    'desktop:min-h-[30px] desktop:min-w-[60px] desktop:w-[60px]',
                                    'mobile:min-h-[20px] mobile:min-w-[50px] mobile:w-[60px]',
                                    '[appearance:textfield] [webkit-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                                    'border-[1px] border-neutral-300 rounded-[6px] focus:outline-primary-700',
                                )
                            }
                            type="number"
                            onChange={handleLocalChange}
                            readOnly={disabled}
                            value={localValue}
                        />
                    )
            }
        </div>
    );
};

export default ItemGrouped;
