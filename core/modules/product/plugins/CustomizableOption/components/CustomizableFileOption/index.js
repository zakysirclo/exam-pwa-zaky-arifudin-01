/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo } from 'react';
import getPrice from '@core_modules/product/helpers/getPrice';
import View from '@plugin_customizableitem/components/CustomizableFileOption/view';
import Typography from '@common_typography';
import { useQuery } from '@apollo/client';
import { formatPrice } from '@helpers/currency';
import { useTranslation } from 'next-i18next';
import { getCustomizableFileOption } from '@core_modules/product/services/graphql/customizableSchema';

const CustomizableFileOption = ({
    url_key, option_id, customizableOptions, setCustomizableOptions,
    errorCustomizableOptions, additionalPrice, setAdditionalPrice,
    stock_status, ...other
}) => {
    const { t } = useTranslation(['common', 'product']);
    const productPrice = getPrice(other.price);
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState({});

    // get values options customizable
    const { data, loading } = useQuery(getCustomizableFileOption(url_key), {
        skip: !url_key,
        fetchPolicy: 'no-cache',
    });

    const onChange = async (val) => {
        if (val && val.length > 0 && val[0].baseCode) {
            const addPrice = value.price;
            if (customizableOptions && customizableOptions.length > 0) {
                let oldPrice = 0;
                const removeOldOptions = customizableOptions.filter((item) => {
                    if (item.option_id === options.option_id) {
                        oldPrice += item.price;
                    }
                    return item.option_id !== options.option_id;
                });
                let newPrice = additionalPrice - oldPrice;
                if (newPrice <= 0) {
                    newPrice = 0;
                }
                await setAdditionalPrice(newPrice);
                removeOldOptions.push({
                    ...value,
                    value: JSON.stringify(val[0].file),
                });
                setAdditionalPrice(newPrice + addPrice);
                setCustomizableOptions([
                    ...removeOldOptions,
                ]);
            } else {
                setCustomizableOptions([{
                    ...value,
                    value: JSON.stringify(val[0].file),
                }]);
                setAdditionalPrice(additionalPrice + addPrice);
            }
        }
    };

    useMemo(() => {
        if (data && data.products && data.products.items.length > 0) {
            const option = data.products.items[0].options.filter(
                (item) => item.option_id === option_id && item.__typename === 'CustomizableFileOption',
            );
            if (option && option.length > 0) {
                setOptions(option[0]);
            }
            if (option && option[0] && option[0].value && option[0].value.uid) {
                const item = option[0].value;
                let { price } = item;
                if (item.price_type === 'PERCENT') {
                    price = (productPrice * price) / 100;
                }

                setValue({
                    ...item,
                    option_id: option[0].option_id,
                    label: `${option[0].title} + ${formatPrice(price)}`,
                    value: '',
                    isEnteredOption: true,
                    price,
                });
            }
        }
    }, [data]);

    let error = '';
    useMemo(() => {
        if (options.option_id && errorCustomizableOptions.length > 0) {
            const findError = errorCustomizableOptions.filter((op) => op.option_id === options.option_id);
            if (findError && findError.length > 0) {
                error = t('product:validate:fieldRequired');
            }
        }
    }, [options, errorCustomizableOptions]);

    if (loading || !data) {
        return <Typography>{`${t('common:label:loading')}...`}</Typography>;
    }

    return (
        <View
            {...other}
            data={value}
            onChange={onChange}
            error={error}
            t={t}
            disabled={stock_status === 'OUT_OF_STOCK'}
        />
    );
};

export default CustomizableFileOption;
