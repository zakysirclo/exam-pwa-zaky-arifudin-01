/* eslint-disable max-len */
import React from 'react';
import Typography from '@common_typography';
import cx from 'classnames';
import OptionItemAction from '@core_modules/product/plugins/OptionItemAction';
import Item from '@core_modules/product/plugins/OptionItem/GroupedOption/Item';
import Show from '@common/Show';

const GroupedProductOptionView = ({
    t, loading, disabled,
    handleAddToCart = () => {},
    loadData = false,
    optionsData = [],
    itemsCart,
    setItemsCart,
    isPlp,
    CustomFooter,
    ...other
}) => (
    <>
        <div className={cx('grouped-option-container')}>
            <Show when={!isPlp && !loadData && optionsData.length > 0}>
                <div className={cx('flex flex-col mb-[30px]')}>
                    <div className={cx('flex flex-row items-center justify-between min-h-[50px] border-b-[2px] py-[10px]', 'border-b-[2px] border-neutral-200')}>
                        <Typography type="bold">{t('common:product:titleProduct')}</Typography>
                        <Typography type="bold">{t('common:title:shortQty')}</Typography>
                    </div>
                    {
                        optionsData.map((item, key) => (
                            <Item
                                key={key}
                                {...item}
                                itemsCart={itemsCart}
                                setItemsCart={setItemsCart}
                                disabled={disabled}
                            />
                        ))
                    }
                </div>
            </Show>
        </div>

        {React.isValidElement(CustomFooter)
            ? React.cloneElement(CustomFooter, {
                ...other,
                loading,
                disabled,
                handleAddToCart,
                t,
            })
            : (
                <OptionItemAction
                    loading={loading}
                    disabled={disabled}
                    showQty={false}
                    handleAddToCart={handleAddToCart}
                    t={t}
                    showAddToCart
                    {...other}
                />
            )}
    </>
);

export default GroupedProductOptionView;
