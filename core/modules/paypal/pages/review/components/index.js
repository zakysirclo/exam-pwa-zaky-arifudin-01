import React from 'react';
import Typography from '@common_typography';
import ListItemCart from '@core_modules/paypal/pages/review/components/ListItemCart';
import ShippingMethod from '@core_modules/paypal/pages/review/components/ShippingMethod';
import ShippingAddress from '@core_modules/paypal/pages/review/components/ShippingAddress';
import PaymentMethod from '@core_modules/paypal/pages/review/components/PaymentMethod';
import PlaceOrder from '@core_modules/paypal/pages/review/components/PlaceOrder';
import SummaryPlugin from '@plugin_summary';

const PaypalReviewComponent = (props) => {
    const { t, checkout } = props;
    return (
        <div id="paypal-review" className="flex flex-row between-lg">
            <div className="lg:basis-full xs:basis-full">
                <Typography variant="h1" letter="uppercase" type="bold">
                    {t('checkout:paypal:reviewPage')}
                </Typography>
            </div>
            <div className="lg:basis-3/12 md:basis-3/12 sm:basis-full xs:basis-full">
                <ShippingMethod {...props} />
            </div>
            <div className="lg:basis-3/12 md:basis-3/12 sm:basis-full xs:basis-full">
                <ShippingAddress {...props} />
            </div>
            <div className="lg:basis-3/12 md:basis-3/12 sm:basis-full xs:basis-full">
                <PaymentMethod {...props} />
            </div>
            <div className="lg:basis-full xs:basis-full">
                <ListItemCart
                    {...props}
                />
            </div>
            <div className="lg:basis-full xs:basis-full">
                {
                    !checkout.loading.all && checkout.cart && checkout.cart.items && (
                        <SummaryPlugin
                            disabled={checkout.loading.all}
                            isDesktop
                            t={t}
                            dataCart={checkout.cart}
                            handleActionSummary={() => {}}
                            hideButton
                            withLabel={false}
                            labelItemAlign="right"
                        />
                    )
                }

            </div>
            <div className="lg:basis-full xs:basis-full">
                <PlaceOrder
                    {...props}
                />
            </div>
        </div>
    );
};

export default PaypalReviewComponent;
