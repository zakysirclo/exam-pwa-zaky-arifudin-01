import CircularProgress from '@common_circularprogress';
import Typography from '@common_typography';
import Button from '@common_button';
import React from 'react';

const ShippingAddress = (props) => {
    const { t, handlePlaceOrder, checkout } = props;
    let { disabled } = props;
    let order = false;
    let disabledCancel = false;
    if (checkout && checkout.loading) {
        order = checkout.loading.order;
        disabled = checkout.loading.order || checkout.loading.all || disabled;
        disabledCancel = checkout.loading.order || checkout.loading.all;
    }

    return (
        <div className="">
            <Button className="" href="/checkout" color="primary" disabled={disabledCancel} variant="outlined">
                <Typography variant="span" color={disabledCancel ? 'gray' : 'default'} type="bold" className="">
                    {t('common:button:cancel')}
                </Typography>
            </Button>
            <Button className="" color="primary" onClick={handlePlaceOrder} disabled={disabled}>
                <Typography variant="span" color="white" type="bold" className="">
                    {t('checkout:placeOrder')}
                </Typography>
                {order && <CircularProgress />}
            </Button>
        </div>
    );
};

export default ShippingAddress;
