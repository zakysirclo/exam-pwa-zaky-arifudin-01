/* eslint-disable indent */
import React from 'react';
import gqlService from '@core_modules/checkout/services/graphql';
import Skeleton from '@common_skeleton';
import TagManager from 'react-gtm-module';
import { useDispatch, useSelector } from 'react-redux';
import {
 selectCheckoutState, setCheckoutData, setErrorState, setLoading, setSelectedData,
} from '@core_modules/checkout/redux/checkoutSlice';

const Loader = () => (
    <>
        <Skeleton width="100%" height={10} />
        <Skeleton width="100%" height={10} />
        <Skeleton width="100%" height={10} />
    </>
);

const Address = (props) => {
    const {
        isOnlyVirtualProductOnCart,
        t,
        defaultAddress,
        updateFormik,
        AddressView,
        storeConfig,
        refetchDataCart,
        refetchItemCart,
        checkoutTokenState,
        setCheckoutTokenState,
        setLoadingSellerInfo,
        ...other
    } = props;

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const [setShippingAddressById] = gqlService.setShippingAddress();
    const [setShippingAddressByInput] = gqlService.setShippingAddressByInput();
    const [setBillingAddressById] = gqlService.setBillingAddressById();
    const [setBillingAddressByInput] = gqlService.setBillingAddressByInput();
    const [setDefaultAddress] = gqlService.updatedDefaultAddress();
    const [setBillingAddressVirtualProduct] = gqlService.setBillingAddressVirtualProduct();

    const { address } = checkout.selected;
    const { loading, data } = checkout;
    const street = address?.street?.join(' ') ?? null;
    let dialogProps;

    let dest_latitude = {};
    let dest_longitude = {};

    let emptyPinpoint = false;
    let showEmptyPinpoint = false;

    React.useEffect(() => {
        if (data && data.cart && data.cart.dest_location) {
            dest_latitude = data.cart.dest_location.dest_latitude;
            dest_longitude = data.cart.dest_location.dest_longitude;
            if (!dest_latitude || !dest_longitude || dest_latitude === '0' || dest_longitude === '0') {
                emptyPinpoint = true;
            }
        }
    }, [data]);

    if (address && !loading.addresses && !loading.all && emptyPinpoint) {
        showEmptyPinpoint = true;
    }

    if (data.isGuest) {
        dialogProps = address
            ? {
                  region: address.region.label,
                  country: {
                      id: address.country.code,
                      full_name_locale: address.country.label,
                  },
                  city: address.city,
                  street,
                  firstname: address.firstname,
                  lastname: address.lastname,
                  postcode: address.postcode,
                  telephone: address.telephone,
              }
            : {};
    }

    let content;

    if (loading.addresses || loading.all) {
        content = <Loader />;
    } else if (data.isGuest && !address) {
        content = t('checkout:message:address:add');
    } else if (address) {
        content = `${address.firstname} ${address.lastname} ${street} 
        ${address.city} ${address.region && address.region.label} 
        ${address.country && address.country.label} ${address.postcode} ${address.telephone}`;
    } else {
        content = t('checkout:message:address:default');
    }

    const updateAddressState = (result) => {
        const updatedCart = result.data.setBillingAddressOnCart.cart;
        if (isOnlyVirtualProductOnCart) {
            dispatch(
                setSelectedData({
                    billing: updatedCart?.billing_address,
                    address: updatedCart?.billing_address,
                }),
            );
        } else {
            const [shippingAddress] = updatedCart.shipping_addresses;
            if (shippingAddress && data.isGuest) {
                dispatch(
                    setSelectedData({
                        address: shippingAddress,
                    }),
                );
            }

            if (checkout.selected.delivery === 'home' && typeof shippingAddress.is_valid_city !== 'undefined') {
                dispatch(
                    setErrorState({
                        shippingAddress: !shippingAddress.is_valid_city,
                    }),
                );
            }
        }
        dispatch(setLoading({ addresses: false }));
        const mergeCart = {
            ...checkout.data.cart,
            ...updatedCart,
        };
        dispatch(
            setCheckoutData({
                cart: mergeCart,
            }),
        );

        if (refetchDataCart && typeof refetchDataCart() === 'function') {
            refetchDataCart();
        }
        if (refetchItemCart && typeof refetchItemCart() === 'function') {
            refetchItemCart();
        }
        updateFormik(mergeCart);
    };

    const setAddress = (selectedAddress, cart, firstLoad = false) =>
        new Promise((resolve, reject) => {
            if (checkout.data.isGuest) {
                dispatch(setLoading({ addresses: true }));
            }
            const { latitude, longitude } = selectedAddress;

            if (checkout.data.isGuest) {
                if (isOnlyVirtualProductOnCart) {
                    setBillingAddressVirtualProduct({
                        variables: {
                            cartId: cart.id,
                            ...selectedAddress,
                            latitude,
                            longitude,
                        },
                    })
                        .then((resBilling) => {
                            updateAddressState(resBilling);
                            resolve();
                        })
                        .catch((e) => {
                            if (e.message.includes('Token is wrong.')) {
                                setCheckoutTokenState(!checkoutTokenState);
                            } else {
                                reject(e);
                            }
                        });
                } else {
                    setShippingAddressByInput({
                        variables: {
                            cartId: cart.id,
                            ...selectedAddress,
                            latitude,
                            longitude,
                        },
                    })
                        .then(async () => {
                            setBillingAddressByInput({
                                variables: {
                                    cartId: cart.id,
                                    ...selectedAddress,
                                    latitude,
                                    longitude,
                                },
                            })
                                .then(async (resBilling) => {
                                    updateAddressState(resBilling);
                                    resolve();
                                })
                                .catch((e) => {
                                    if (e.message.includes('Token is wrong.')) {
                                        setCheckoutTokenState(!checkoutTokenState);
                                    } else {
                                        reject(e);
                                    }
                                });
                        })
                        .catch((e) => {
                            if (e.message.includes('Token is wrong.')) {
                                setCheckoutTokenState(!checkoutTokenState);
                            } else {
                                reject(e);
                            }
                        });
                }
            } else if (isOnlyVirtualProductOnCart) {
                setBillingAddressById({
                    variables: {
                        cartId: cart.id,
                        addressId: selectedAddress.id,
                    },
                })
                    .then((resBilling) => {
                        updateAddressState(resBilling);
                        resolve();
                    })
                    .catch((e) => {
                        if (e.message.includes('Token is wrong.')) {
                            setCheckoutTokenState(!checkoutTokenState);
                        } else {
                            reject(e);
                        }
                    });
            } else {
                const setShippingBilling = () => {
                    dispatch(setLoading({ shipping: true }));
                    setShippingAddressById({
                        variables: {
                            cartId: cart.id,
                            addressId: selectedAddress.id,
                        },
                    })
                        .then((resBilling) => {
                            updateAddressState(resBilling);
                            resolve();
                            dispatch(setLoading({ shipping: false }));
                        })
                        .catch((e) => {
                            dispatch(setLoading({ shipping: false }));
                            if (e.message.includes('Token is wrong.')) {
                                setCheckoutTokenState(!checkoutTokenState);
                            } else {
                                reject(e);
                            }
                        });
                };
                if (firstLoad) {
                    dispatch(setLoading({ addresses: true }));
                    setDefaultAddress({
                        variables: {
                            addressId: selectedAddress.id,
                            street: selectedAddress.street[0],
                        },
                    })
                        .then((dataAddress) => {
                            if (dataAddress && dataAddress.data && dataAddress.data.updateCustomerAddress) {
                                const shipping = dataAddress.data.updateCustomerAddress;
                                dispatch(
                                    setSelectedData({
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
                                    }),
                                );
                                dispatch(setLoading({ order: false, addresses: false }));
                            }
                            setShippingBilling();
                        })
                        .catch((e) => {
                            reject(e);
                        });
                } else {
                    setShippingBilling();
                }
            }
        });

    React.useEffect(() => {
        if (defaultAddress && !checkout.data.isGuest) {
            const { cart } = checkout.data;
            setAddress(defaultAddress, cart, true);
        }
    }, [defaultAddress]);

    React.useEffect(() => {
        if (address) {
            const option = `${address.firstname} ${address.lastname} ${street} 
            ${address.city} 
            ${address.region && address.region.label ? address.region.label : address.region || ''} 
            ${address.postcode} ${address.telephone}`;
            const dataLayer = {
                pageType: 'checkout',
                pageName: 'Checkout',
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: { step: 1, option },
                        products: checkout.data.cart.items.map(({ quantity, product, prices }) => ({
                            name: product.name,
                            id: product.sku,
                            price: JSON.stringify(prices.price.value),
                            category: product.categories.length > 0 ? product.categories[0].name : '',
                            list: product.categories.length > 0 ? product.categories[0].name : '',
                            quantity: JSON.stringify(quantity),
                            dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                            dimension5: '',
                            dimension6: '',
                            dimension7: prices.discount ? 'YES' : 'NO',
                        })),
                    },
                    fbpixels: {
                        content_ids: checkout.data.cart.items.map(({ product }) => product.sku),
                        quantity: checkout.data.cart.items.length,
                        value: checkout.data.cart.prices.grand_total.value,
                    },
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
        }
    }, [loading.addresses, loading.all]);

    return (
        <AddressView
            data={data}
            setAddress={setAddress}
            t={t}
            dialogProps={dialogProps}
            loading={loading}
            address={address}
            content={content}
            storeConfig={storeConfig}
            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
            showEmptyPinpoint={showEmptyPinpoint}
            {...other}
        />
    );
};

export default Address;
