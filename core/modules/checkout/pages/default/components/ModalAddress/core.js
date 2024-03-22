/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React, { useState, useCallback } from 'react';
import gqlService, {
    createCustomerAddress,
    updateCustomerAddress,
    updatedDefaultAddress as gqlUpdateDefaulAddress,
} from '@core_modules/checkout/services/graphql';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setLoading, setSelectedData,
} from '@core_modules/checkout/redux/checkoutSlice';

const ModalAddressCustomer = (props) => {
    const {
        Content, setOpen, setAddress, open, manageCustomer, ...other
    } = props;
    // graphql
    const [updatedDefaultAddress] = gqlUpdateDefaulAddress();
    const [updateAddress] = updateCustomerAddress();
    const [addAddress] = createCustomerAddress();
    // state
    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const [address, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [success] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [typeAddress, setTypeAddress] = useState('new');
    const [dataEdit, setDataEdit] = useState({});
    const [getAddress, { loading, data: addressCustomer, refetch: _refetch }] = gqlService.getAddressCustomer();
    const refetch = useCallback(() => { setTimeout(() => _refetch(), 0); }, [_refetch]);
    React.useEffect(() => {
        if (open) {
            getAddress();
            if (checkout.selected.address && checkout.selected.address.country
                && addressCustomer && !loading && addressCustomer.customer
                && addressCustomer.customer.addresses && addressCustomer.customer.addresses.length > 0) {
                const checkoutAddress = checkout.selected.address;
                // eslint-disable-next-line arrow-body-style
                const selectedAddress = addressCustomer.customer.addresses.filter((add) => {
                    return `${add.street[0].replace(' ', '-')}-${add.firstname}-${add.telephone}`
                        === `${checkoutAddress.street[0].replace(' ', '-')}-${checkoutAddress.firstname}-${checkoutAddress.telephone}`;
                });
                setSelectedAddressId(selectedAddress && selectedAddress.length > 0 ? selectedAddress[0].id : null);
            }
        }
    }, [open]);

    React.useEffect(() => {
        // const newCheckout = { ...checkout };
        if (addressCustomer && !loading && addressCustomer.customer
            && addressCustomer.customer.addresses && addressCustomer.customer.addresses.length > 0) {
            const selectedAddress = addressCustomer.customer.addresses.find((addr) => addr.default_shipping);

            if (checkout.selected.address) {
                setSelectedAddressId(selectedAddress ? selectedAddress.id : null);
            }
            setAddresses(addressCustomer.customer.addresses);
        }
    }, [addressCustomer]);

    // handle open modal add adress button
    const handleOpenNew = (type = 'new') => {
        setOpen(!open);
        setOpenNew(!openNew);
        setTypeAddress(type);
    };
    const handleCloseDiff = async () => {
        setOpen(false);
    };
    // handle change selected address
    const handleChange = async (event, forceUpdate = false) => {
        if (selectedAddressId !== event.target.value || forceUpdate) {
            dispatch(setLoading({
                addresses: true,
                order: true,
            }));
            // refetch address
            if (refetch && typeof refetch === 'function') {
                refetch();
            }
            const addressId = parseInt(event.target.value);
            setSelectedAddressId(addressId);
            let detail = {};
            for (let index = 0; index < address.length; index++) {
                if (address[index].id === addressId) {
                    detail = address[index];
                }
            }

            const streetAddress = () => {
                if (!!event.target.valueAddress && event.target.valueAddress !== detail.street[0]) {
                    return event.target.valueAddress;
                }
                return detail?.street?.length ? detail.street[0] : '';
            };

            const dataAddress = await updatedDefaultAddress({
                variables: {
                    addressId,
                    street: streetAddress(),
                },
            });

            if (dataAddress && dataAddress.data && dataAddress.data.updateCustomerAddress) {
                const shipping = dataAddress.data.updateCustomerAddress;
                dispatch(setSelectedData({
                    address: {
                        firstname: shipping.firstname,
                        lastname: shipping.lastname,
                        city: shipping.city,
                        region: {
                            ...shipping.region,
                            label: shipping.region.region,
                        },
                        country: shipping.country,
                        postcode: shipping.postcode,
                        telephone: shipping.telephone,
                        street: shipping.street,
                    },
                }));
                dispatch(setLoading({
                    addresses: false,
                    order: false,
                }));
            }

            const { cart } = checkout.data;

            await setAddress(detail, cart);
        } else {
            return true;
        }
    };

    // handle add address
    const handleAddress = async (data) => {
        setLoadingAddress(true);
        if (!success) {
            if (typeAddress === 'update') {
                await updateAddress({
                    variables: {
                        ...data,
                    },
                });
            } else {
                await addAddress({
                    variables: {
                        ...data,
                    },
                }).then(async (res) => {
                    if (res.data && res.data.createCustomerAddress && res.data.createCustomerAddress.id) {
                        const shipping = res.data.createCustomerAddress;
                        const dataAddress = await updatedDefaultAddress({
                            variables: {
                                addressId: shipping.id,
                                street: shipping.street[0],
                            },
                        });
                        if (dataAddress && dataAddress.data && dataAddress.data.updateCustomerAddress) {
                            const shippingDefault = dataAddress.data.updateCustomerAddress;
                            dispatch(setSelectedData({
                                address: {
                                    firstname: shippingDefault.firstname,
                                    lastname: shippingDefault.lastname,
                                    city: shippingDefault.city,
                                    region: {
                                        ...shippingDefault.region,
                                        label: shippingDefault.region.region,
                                    },
                                    country: shippingDefault.country,
                                    postcode: shippingDefault.postcode,
                                    telephone: shippingDefault.telephone,
                                    street: shippingDefault.street,
                                },
                            }));

                            dispatch(setLoading({
                                addresses: false,
                                order: false,
                            }));
                        }
                        const { cart } = checkout.data;

                        await setAddress(shipping, cart);
                    }
                });
            }
        }

        setLoadingAddress(false);

        if (openNew && !open) {
            setOpenNew(false);
            setOpen(true);
            if (refetch && typeof refetch === 'function') {
                refetch();
            }
            if (manageCustomer.refetch && typeof manageCustomer.refetch() === 'function') {
                manageCustomer.refetch();
            }
        }
    };

    return (
        <Content
            loading={loading}
            addressCustomer={addressCustomer}
            address={address}
            selectedAddressId={selectedAddressId}
            handleCloseDiff={handleCloseDiff}
            handleChange={handleChange}
            handleOpenNew={handleOpenNew}
            handleAddress={handleAddress}
            loadingAddress={loadingAddress}
            success={success}
            openNew={openNew}
            setOpen={setOpen}
            open={open}
            typeAddress={typeAddress}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
            manageCustomer={manageCustomer}
            updateAddress={updateAddress}
            refetchAddress={refetch}
            {...other}
        />
    );
};

export default ModalAddressCustomer;
