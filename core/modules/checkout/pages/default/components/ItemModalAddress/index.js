import React from 'react';
import Component from '@core_modules/checkout/pages/default/components/ItemModalAddress/view';
import { updateCustomerAddress } from '@core_modules/checkout/services/graphql';

const ItemAddressCore = (props) => {
    const {
        manageCustomer, handleChange, selectedAddressId,
        country, id, refetchAddress,
    } = props;
    const [updateAddress] = updateCustomerAddress();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const handleSave = async (data) => {
        setLoading(true);
        updateAddress({
            variables: {
                ...data,
            },
        })
            .then(async () => {
                const defaultShippingBilling = data.default_shipping || data.default_billing;
                if (defaultShippingBilling || data.addressId === selectedAddressId) {
                    await handleChange(
                        {
                            target: {
                                value: data.addressId,
                                valueAddress: data.addressDetail,
                            },
                        },
                        data.addressId === selectedAddressId,
                    );
                } else if (data.addressId !== selectedAddressId) {
                    if (refetchAddress && typeof refetchAddress === 'function') {
                        refetchAddress();
                    }
                }
                setSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setOpen(false);
                    setSuccess(false);
                    manageCustomer.refetch();
                }, 1500);
            })
            .catch(() => {
                setSuccess(false);
                setLoading(false);
                setOpen(false);
            });
    };

    return (
        <Component
            {...props}
            loading={loading}
            handleSave={handleSave}
            setOpen={setOpen}
            success={success}
            open={open}
            checked={id === selectedAddressId}
            country={{
                id: country.code,
                full_name_locale: country.label,
            }}
        />
    );
};

export default ItemAddressCore;
