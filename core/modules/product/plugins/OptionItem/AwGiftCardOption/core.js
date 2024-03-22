/* eslint-disable radix */
import { modules } from '@config';
import { addGiftCardProductsToCart, getCustomerCartId, getGuestCartId as queryGetGuestCartId } from '@core_modules/product/services/graphql';
import { getLoginInfo } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import { useFormik } from 'formik';
import Router from 'next/router';
import React, { useState } from 'react';
import TagManager from 'react-gtm-module';
import * as Yup from 'yup';
import dateFormat from '@helper_date';

const CoreGiftCardOptionItem = ({
    setOpen = () => {},
    t,
    data,
    View,
    handleAddToCart: CustomAddToCart,
    loading: customLoading,
    setLoading: setCustomLoading,
    checkCustomizableOptionsValue,
    errorCustomizableOptions,
    customizableOptions,
    stockStatus,
    ...other
}) => {
    const [qty, setQty] = React.useState(1);

    // prettier-ignore
    const {
        __typename, sku, name, categories,
        price_range, url_key,
        aw_gc_allow_delivery_date, aw_gc_allow_open_amount, aw_gc_custom_message_fields,
        aw_gc_amounts, aw_gc_open_amount_max, aw_gc_open_amount_min, aw_gc_email_templates,
        aw_gc_type, review, sale,
    } = data;

    const reviewValue = parseInt(review.rating_summary, 0) / 20;
    const [addToCartGC] = addGiftCardProductsToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();
    let [loading, setLoading] = useState(false);

    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loading = customLoading;
        setLoading = setCustomLoading;
    }

    const formInitalValues = {
        aw_gc_amount: aw_gc_amounts ? aw_gc_amounts[0] : [],
        aw_gc_recipient_name: '',
        aw_gc_recipient_email: '',
        aw_gc_sender_name: '',
        aw_gc_sender_email: '',
        aw_gc_template: aw_gc_email_templates?.length === 1 ? aw_gc_email_templates[0].value : '',
    };

    if (aw_gc_allow_delivery_date) {
        formInitalValues.aw_gc_delivery_date = '';
        formInitalValues.aw_gc_delivery_date_timezone = other.storeConfig?.timezone || 'Asia/Jakarta';
    }

    if (aw_gc_allow_open_amount) {
        formInitalValues.aw_gc_custom_amount = '';
    }

    if (aw_gc_custom_message_fields) {
        switch (aw_gc_custom_message_fields) {
        case 1:
            formInitalValues.aw_gc_headline = '';
            formInitalValues.aw_gc_message = '';
            break;
        case 2:
            formInitalValues.aw_gc_headline = '';
            break;
        case 3:
            formInitalValues.aw_gc_message = '';
            break;
        default:
            formInitalValues.aw_gc_headline = '';
            formInitalValues.aw_gc_message = '';
            break;
        }
    }

    const formValidationSchema = Yup.object().shape({
        aw_gc_recipient_name: Yup.string()
            .nullable()
            .required(`${t('validate:recipientName')} ${t('validate:required')}`),
        aw_gc_recipient_email: Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')),
        aw_gc_sender_name: Yup.string()
            .nullable()
            .required(`${t('validate:senderName')} ${t('validate:required')}`),
        aw_gc_sender_email: Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')),
        aw_gc_template:
            aw_gc_type === 'VIRTUAL'
                ? Yup.string()
                    .nullable()
                    .required(`${t('validate:emailTemplate')} ${t('validate:required')}`)
                : null,
        aw_gc_amount: Yup.string().nullable(),
        aw_gc_custom_amount: Yup.number()
            .nullable()
            .min(aw_gc_open_amount_min, `${t('validate:amount')} ${t('validate:greaterThanOrEqual')} ${aw_gc_open_amount_min}`)
            .max(aw_gc_open_amount_max, `${t('validate:amount')} ${t('validate:lessThanOrEqual')} ${aw_gc_open_amount_max}`),
    });

    const formik = useFormik({
        initialValues: formInitalValues,
        validationSchema: formValidationSchema,
        isInitialValid: false,
        onSubmit: async (values) => {
            const isLogin = getLoginInfo();
            let cartId = getCartId();
            let customizable_options = [];
            const entered_options = [];
            if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
                customizableOptions.map((op) => {
                    if (customizable_options.length > 0) {
                        const findOptions = customizable_options.find((item) => item.id === op.option_id);
                        if (findOptions) {
                            customizable_options = customizable_options.filter((item) => item.id !== op.option_id);
                            if (op.isEnteredOption) {
                                entered_options.push({
                                    uid: op.uid,
                                    value: `${findOptions.value_string},${op.value}`,
                                });
                            } else {
                                customizable_options.push({
                                    id: op.option_id,
                                    value_string: `${findOptions.value_string},${op.value}`,
                                });
                            }
                        } else if (op.isEnteredOption) {
                            entered_options.push({
                                uid: op.uid,
                                value: op.value,
                            });
                        } else {
                            customizable_options.push({
                                id: op.option_id,
                                value_string: op.value,
                            });
                        }
                    }
                    if (customizable_options.length === 0) {
                        if (op.isEnteredOption) {
                            entered_options.push({
                                uid: op.uid,
                                value: op.value,
                            });
                        } else {
                            customizable_options.push({
                                id: op.option_id,
                                value_string: op.value,
                            });
                        }
                    }
                    return op;
                });
            }
            if (CustomAddToCart && typeof CustomAddToCart === 'function') {
                CustomAddToCart({
                    ...data,
                    qty: parseFloat(qty),
                    customizable_options,
                });
            } else {
                setLoading(true);
                const errorMessage = {
                    variant: 'error',
                    text: t('product:failedAddCart'),
                    open: true,
                };
                if (!cartId || cartId === '' || cartId === undefined) {
                    if (!isLogin) {
                        await getGuestCartId()
                            .then((res) => {
                                const token = res.data.createEmptyCart;
                                cartId = token;
                                setCartId(token);
                            })
                            .catch((e) => {
                                const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                                setLoading(false);
                                window.toastMessage({
                                    ...errorMessage,
                                    text: originalError || errorMessage.text,
                                });
                            });
                    } else if (cartUser.data && cartUser.data.customerCart) {
                        const token = cartUser.data.customerCart.id || '';
                        cartId = token;
                        setCartId(token);
                    }
                }
                if (__typename === 'AwGiftCardProduct') {
                    // GTM UA dataLayer
                    TagManager.dataLayer({
                        dataLayer: {
                            event: 'addToCart',
                            eventLabel: name,
                            ecommerce: {
                                currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                                add: {
                                    products: [
                                        {
                                            name,
                                            id: sku,
                                            price: price_range.minimum_price.regular_price.value || 0,
                                            category: categories?.length > 0 ? categories[0].name : '',
                                            list: categories?.length > 0 ? categories[0].name : '',
                                            quantity: qty,
                                            dimensions4: stockStatus,
                                        },
                                    ],
                                },
                            },
                        },
                    });
                    // GA 4 dataLayer
                    TagManager.dataLayer({
                        dataLayer: {
                            event: 'add_to_cart',
                            ecommerce: {
                                action: {
                                    items: [
                                        {
                                            item_name: name,
                                            item_id: sku,
                                            price: price_range.minimum_price.regular_price.value || 0,
                                            item_category: categories?.length > 0 ? categories[0].name : '',
                                            item_list_name: categories?.length > 0 ? categories[0].name : '',
                                            quantity: qty,
                                            currency: price_range.minimum_price.regular_price.currency || 'USD',
                                            item_stock_status: stockStatus,
                                            item_reviews_score: reviewValue,
                                            item_reviews_count: review?.reviews_count,
                                            item_sale_product: sale === 0 ? 'NO' : 'YES',
                                        },
                                    ],
                                },
                            },
                        },
                    });
                    addToCartGC({
                        variables: {
                            cartId,
                            sku,
                            qty: parseFloat(qty),
                            customizable_options,
                            entered_options,
                            awGcInput: {
                                ...values,
                                aw_gc_custom_amount: Number(formik.values.aw_gc_custom_amount),
                                aw_gc_delivery_date: dateFormat(Date(formik.values.aw_gc_delivery_date), 'MM/DD/YYYY'),
                            },
                        },
                    })
                        .then(() => {
                            window.reloadCartQty = true;
                            window.toastMessage({
                                variant: 'success',
                                text: t('product:successAddCart'),
                                open: true,
                            });

                            setLoading(false);
                            setOpen(false);
                        })
                        .catch((e) => {
                            const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                            if (e.message === "The product's required option(s) weren't entered. Make sure the options are entered and try again.") {
                                Router.push(`/${url_key}`);
                            }

                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: originalError || errorMessage.text,
                            });
                        });
                }
            }
        },
    });

    const handleAddToCart = async () => {
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            const check = await checkCustomizableOptionsValue();
            if (check) {
                formik.handleSubmit();
            }
        } else {
            formik.handleSubmit();
        }
    };

    return (
        <View
            qty={qty}
            setQty={setQty}
            handleAddToCart={handleAddToCart}
            t={t}
            loading={loading}
            disabled={stockStatus === 'OUT_OF_STOCK'}
            data={data}
            formik={formik}
            stockStatus={stockStatus}
            {...other}
        />
    );
};

export default CoreGiftCardOptionItem;
