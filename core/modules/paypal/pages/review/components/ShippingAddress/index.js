import React from 'react';
import Typography from '@common_typography';
import classNames from 'classnames';
// import Link from 'next/link';

const ShippingAddress = (props) => {
    const { t, checkout } = props;
    let paypallShippingAddress = {};
    if (checkout && checkout.cart && checkout.shippingAddress) {
        paypallShippingAddress = checkout.shippingAddress;
    }

    return (
        <div className="flex flex-row">
            <div className="xs:basis-full">
                <Typography variant="span" letter="capitalize" type="bold">
                    {t('checkout:shippingAddress')}
                </Typography>
            </div>
            <div className={classNames('xs:basis-full')}>
                {
                    paypallShippingAddress && paypallShippingAddress.firstname && (
                        <Typography variant="span" letter="capitalize">
                            {`${paypallShippingAddress.firstname} ${paypallShippingAddress.lastname}` || ''}
                        </Typography>
                    )
                }
                <Typography variant="span" letter="capitalize">
                    {paypallShippingAddress.street ? paypallShippingAddress.street[0] : ''}
                </Typography>
                <Typography variant="span" letter="capitalize">
                    {`
                        ${`${paypallShippingAddress.city || ''}, `}
                        ${paypallShippingAddress.region ? paypallShippingAddress.region.label : ''}
                    `}
                </Typography>
                <Typography variant="span" letter="capitalize">
                    {`
                        ${`${paypallShippingAddress.postcode || ''}`}
                    `}
                </Typography>
                <Typography variant="span" letter="capitalize">
                    {paypallShippingAddress.country ? paypallShippingAddress.country.label : ''}
                </Typography>
            </div>
            {/* <div className="xs:basis-full">
                <Link href={initialOptionPaypal.editUrl || ''}>
                    <a>
                        <Typography variant="span" letter="capitalize">
                            {t('common:button:edit')}
                        </Typography>
                    </a>
                </Link>
            </div> */}
        </div>
    );
};

export default ShippingAddress;
