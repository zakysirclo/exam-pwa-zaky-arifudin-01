/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import {
    createCustomerAddress,
    getCustomerAddress,
    removeAddress as gqlRemoveAddress,
    updatedDefaultAddress as gqlUpdateDefaulAddress,
    updateCustomerAddress,
} from '@core_modules/customer/services/graphql';
import Layout from '@layout';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Content = dynamic(() => import('@core_modules/customer/pages/address/components'), { ssr: false });

const AddressCustomer = (props) => {
    const { t } = props;
    const config = {
        title: t('customer:address:pageTitle'),
        headerTitle: t('customer:address:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
        tagSelector: 'swift-page-customeraddress',
    };

    // graphql
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    const [removeAddress] = gqlRemoveAddress();
    const [actGetCustomerAddress, { data: dataAddress, loading: loadingGetAddress }] = getCustomerAddress();
    // state
    const [address, setAddress] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openNew, setOpenDialogNew] = useState(false);
    const [, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535,
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setMapPosition({
            lat,
            lng,
        });
    };

    useEffect(() => {
        actGetCustomerAddress();
    }, []);

    useEffect(() => {
        if (loadingGetAddress) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [loadingGetAddress]);

    // didmount
    useEffect(() => {
        setLoading(true);
        if (dataAddress) {
            const { customer } = dataAddress;

            if (customer) {
                const selectedAddress = customer.addresses.find((addr) => addr.default_shipping);
                setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
                setAddress(customer.addresses);
            }
            setLoading(false);
        }

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, [dataAddress]);

    // handle open modal add adress button
    const handleOpenNew = () => {
        setOpenDialogNew(!openNew);
    };

    // handle change selected address
    const handleChange = async (event) => {
        window.backdropLoader(true);
        const addressId = parseInt(event.target.value);
        setSelectedAddressId(addressId);
        let detail = {};
        for (let index = 0; index < address.length; index++) {
            if (address[index].id === addressId) {
                detail = address[index];
            }
        }
        await updatedDefaultAddress({
            variables: {
                addressId,
                street: detail.street[0],
            },
        });
        await actGetCustomerAddress();
        window.backdropLoader(false);
    };

    // handle edit address
    const handleDialogSubmit = async () => {
        setLoading(true);
        const { data } = await actGetCustomerAddress();
        setAddress(data.customer.addresses);
        setLoading(false);
    };

    // handle add address
    const handleAddress = async (data, type) => {
        let toastText = '';
        setLoadingAddress(true);
        try {
            if (!success) {
                if (type === 'update') {
                    await updateAddress({
                        variables: {
                            ...data,
                        },
                    });
                    toastText = t('customer:address:successUpdate');
                } else {
                    await addAddress({
                        variables: {
                            ...data,
                        },
                    });
                    toastText = t('customer:address:successAdd');
                }
                await actGetCustomerAddress();
                window.toastMessage({ open: true, variant: 'success', text: toastText });
            }

            setSuccess(true);
            setLoadingAddress(false);

            if (openNew) {
                setOpenDialogNew(false);
            }
            setSuccess(false);
            return true;
        } catch (e) {
            setLoadingAddress(false);
            let errorMessage = type === 'update' ? t('customer:address:failUpdate') : t('customer:address:failAdd');
            if (e?.message) {
                errorMessage = `${errorMessage} : ${e?.message}`;
            }
            window.toastMessage({
                open: true,
                variant: 'error',
                text: errorMessage,
            });
            return false;
        }
    };

    const setRemoveAddress = async (addressId) => {
        setLoadingAddress(true);
        setLoading(true);
        try {
            if (!success) {
                if (addressId) {
                    await removeAddress({
                        variables: {
                            id: addressId,
                        },
                    });
                    await actGetCustomerAddress();
                    window.toastMessage({ open: true, variant: 'success', text: t('customer:address:successRemove') });
                }
            }

            setSuccess(true);
            setLoadingAddress(false);
            setLoading(false);
            setSuccess(false);
        } catch (e) {
            setLoadingAddress(false);
            setLoading(false);
            let errorMessage = t('customer:address:failRemove');
            if (e?.message) {
                errorMessage = `${errorMessage} : ${e?.message}`;
            }
            window.toastMessage({
                open: true,
                variant: 'error',
                text: errorMessage,
            });
        }
    };
    return (
        <Layout pageConfig={config} {...props}>
            <Content
                t={t}
                loading={loading}
                address={address}
                // address={dataAddress?.customer?.addresses ?? []}
                selectedAddressId={selectedAddressId}
                handleDialogSubmit={handleDialogSubmit}
                handleChange={handleChange}
                handleOpenNew={handleOpenNew}
                handleAddress={handleAddress}
                removeAddress={setRemoveAddress}
                loadingAddress={loadingAddress}
                success={success}
                openNew={openNew}
                setOpenDialogNew={setOpenDialogNew}
            />
        </Layout>
    );
};

export default AddressCustomer;
