import React from 'react';
import dynamic from 'next/dynamic';

const OptionItemAction = dynamic(() => import('@core_modules/product/plugins/OptionItemAction'), { ssr: false });

const SimpleOptionView = ({
    qty = 1,
    setQty = () => { },
    handleAddToCart = () => { },
    t,
    loading = false,
    disabled = false,
    showQty = true,
    showAddToCart = true,
    CustomFooter,
    ...other
}) => (
    <>
        <div />
        {
            React.isValidElement(CustomFooter)
                ? React.cloneElement(CustomFooter, {
                    ...other,
                    loading,
                    disabled,
                    showQty,
                    handleAddToCart,
                    qty,
                    setQty,
                    t,
                    showAddToCart,
                })
                : (
                    <OptionItemAction
                        loading={loading}
                        showQty={showQty}
                        handleAddToCart={handleAddToCart}
                        qty={qty}
                        setQty={setQty}
                        t={t}
                        showAddToCart={showAddToCart}
                        disabled={disabled}
                        {...other}
                    />
                )
        }
    </>
);

export default SimpleOptionView;
