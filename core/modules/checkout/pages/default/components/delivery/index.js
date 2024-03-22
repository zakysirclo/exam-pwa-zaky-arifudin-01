/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import gqlService from '@core_modules/checkout/services/graphql';
import TagManager from 'react-gtm-module';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setPickupLocationCode, setPinckupInformation, setSelectedData, setSelectedStore,
} from '@core_modules/checkout/redux/checkoutSlice';
import { setCheckoutData } from '@core/helpers/cookies';

const DeliveryComp = (props) => {
    const {
        t, handleOpenMessage, storeConfig, DeliveryView, Skeleton, isOnlyVirtualProductOnCart,
    } = props;

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);
    const [removePickupStore] = gqlService.removePickupStore();
    const handleSelect = async (delivery) => {
        await window.backdropLoader(true);
        if (delivery === 'home' && Object.keys(checkout.selectStore).length > 0 && Object.keys(checkout.pickupInformation).length > 0) {
            removePickupStore({
                variables: {
                    cart_id: checkout.data.cart.id,
                },
            })
                .then(async (res) => {
                    dispatch(setPickupLocationCode(null));
                    dispatch(setCheckoutData({
                        cart: {
                            ...checkout.data.cart,
                            ...res.data.removePickupStore,
                        },
                    }));
                    dispatch(setSelectedData({
                        delivery,
                        address: checkout.data.isGuest ? null : checkout.selected.address,
                    }));
                    dispatch(setPinckupInformation({}));
                    dispatch(setSelectedStore({}));
                    await window.backdropLoader(false);
                })
                .catch(() => {
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:problemConnection'),
                    });
                    window.backdropLoader(false);
                });
        } else if (delivery === 'pickup') {
            const selectedShipping = checkout.data.shippingMethods.filter(({ method_code }) => method_code === 'pickup');
            const dataLayer = {
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: {
                            step: 2,
                            option: selectedShipping.length > 0 ? selectedShipping[0].label : 'Pickup at Store Pickup at Store',
                            action: 'checkout',
                        },
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
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            const dataLayerOption = {
                event: 'checkoutOption',
                ecommerce: {
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                    checkout_option: {
                        actionField: {
                            step: 2,
                            option: selectedShipping.length > 0 ? selectedShipping[0].label : 'Pickup at Store Pickup at Store',
                            action: 'checkout_option',
                        },
                        fbpixels: {
                            total_price: checkout.data.cart.prices.grand_total.value,
                        },
                    },
                },
            };
            // GA 4 dataLayer
            const dataLayerOpt = {
                event: 'add_shipping_info',
                ecommerce: {
                    shipping_tier: selectedShipping.length > 0 ? selectedShipping[0].label : 'Pickup at Store Pickup at Store',
                    items: [
                        checkout.data.cart.items.map(({ quantity, product, prices }) => ({
                            currency: storeConfig.base_currency_code || 'IDR',
                            item_name: product.name,
                            item_id: product.sku,
                            price: JSON.stringify(prices.price.value),
                            item_category: product.categories.length > 0 ? product.categories[0].name : '',
                            item_list_name: product.categories.length > 0 ? product.categories[0].name : '',
                            quantity: JSON.stringify(quantity),
                            item_stock_status: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                            item_sale_product: '',
                            item_reviews_count: '',
                            item_reviews_score: '',
                        })),

                    ],
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
            TagManager.dataLayer({
                dataLayer: dataLayerOption,
            });
            TagManager.dataLayer({
                dataLayer: dataLayerOpt,
            });
            window.backdropLoader(false);
            dispatch(setSelectedData({
                delivery,
            }));
        } else if (delivery === 'instore') {
            // user chooses instore tab
            if (Object.keys(checkout.selectStore).length > 0 && Object.keys(checkout.pickupInformation).length > 0) {
                removePickupStore({
                    variables: {
                        cart_id: checkout.data.cart.id,
                    },
                }).then(async (res) => {
                    dispatch(setCheckoutData({
                        cart: {
                            ...checkout.data.cart,
                            ...res.data.removePickupStore,
                        },
                    }));
                    dispatch(setSelectedData({
                        delivery,
                        address: checkout.data.isGuest ? null : checkout.selected.address,
                    }));
                    dispatch(setPinckupInformation({}));
                    dispatch(setSelectedStore({}));
                }).catch(() => {
                    handleOpenMessage({
                        variant: 'error',
                        text: t('checkout:message:problemConnection'),
                    });
                });
            }

            dispatch(setSelectedData({ delivery }));

            window.backdropLoader(false);
        } else if (delivery !== 'instore' && checkout.pickup_location_code) {
            // user had chosen instore tab,
            // entered some data, but later decided to switch to the other tabs
            dispatch(setSelectedData({
                address: null,
                delivery,
                selectStore: {},
                pickupInformation: {},
            }));
            window.backdropLoader(false);
        } else {
            dispatch(setPickupLocationCode(null));
            dispatch(setSelectedData({ delivery }));
            window.backdropLoader(false);
        }
    };
    if (checkout.loading.all) return <Skeleton />;
    if (storeConfig.enable_oms_multiseller === '1') return null;
    if (isOnlyVirtualProductOnCart) return null;
    return <DeliveryView {...props} handleSelect={handleSelect} />;
};

export default DeliveryComp;
