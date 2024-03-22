import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
import Show from '@common_show';
import StockStatus from '@common_statusstock';
import PriceTierList from '@core_modules/product/plugins/PriceTiers';

const Button = dynamic(() => import('@common_button'), { ssr: false });

const OptionItemAction = (props) => {
    const {
        loading,
        disabled,
        showQty = true,
        handleAddToCart,
        qty,
        setQty,
        t,
        showAddToCart = true,
        customStyleBtnAddToCard = '',
        labelAddToCart = '',
        maxQty = 10000,
        customButton,
        customQty = false,
        freeItemsData,
        showStockStatus,
        stockStatus,
        stockStatusClassWrapper,
        __typename,
        url_key,
        isPlp = false,
        CustomFooter,
        price,
    } = props;
    const IS_OOS = stockStatus === 'OUT_OF_STOCK';
    const IS_INSTOCK = stockStatus === 'IN_STOCK';
    const isSimpleOrConfigurable = __typename === 'SimpleProduct' || __typename === 'ConfigurableProduct';
    const [internalLoading, setInternalLoading] = useState(false);

    if (customButton) {
        return customButton;
    }

    const handleInternalLoading = () => {
        setInternalLoading(true);
    };

    const additionalProps = {};

    if (isPlp) {
        Object.assign(additionalProps, {
            link: !isSimpleOrConfigurable && url_key ? url_key : '',
            onClick: isSimpleOrConfigurable ? handleAddToCart : handleInternalLoading,
            loading: (isSimpleOrConfigurable && loading) || internalLoading,
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className={
                cx('stock-status-container', stockStatusClassWrapper)
            }
            >
                <Show when={showStockStatus && stockStatus}>
                    <StockStatus inStock={IS_INSTOCK} />
                </Show>
            </div>
            <PriceTierList price={price} {...props} />
            <div className="flex flex-row gap-4 items-end">
                {showQty && (
                    <div className={cx('flex flex-col gap-2', 'product-OptionItem-qty')}>
                        <Typography className="font-normal">
                            {t('common:title:qty')}
                        </Typography>
                        <ButtonQty
                            value={qty}
                            onChange={setQty}
                            max={customQty ? freeItemsData.quantity : maxQty}
                            disabled={disabled || loading || IS_OOS}
                            classNameInput="h-[38px]"
                        />
                    </div>
                )}
                {showAddToCart && (
                    <Button
                        id="plugin-addToCart-btn"
                        className={cx('w-full h-[48px] [&.button-link]:justify-center', customStyleBtnAddToCard)}
                        classNameText="justify-center xs:flex-wrap sm:flex-nowrap"
                        variant="primary"
                        onClick={handleAddToCart}
                        loading={loading}
                        disabled={disabled || IS_OOS}
                        {...additionalProps}
                    >
                        <Typography
                            color="white"
                            className={cx(
                                'font-medium',
                                loading ? 'xs:truncate xs:max-w-[calc(100%-30px)]' : '',
                            )}
                        >
                            {(isPlp && !isSimpleOrConfigurable) ? t('common:button:viewItem') : labelAddToCart || t('common:button:addToCart')}
                        </Typography>
                    </Button>
                )}
            </div>
            {CustomFooter}
        </div>
    );
};
export default OptionItemAction;
