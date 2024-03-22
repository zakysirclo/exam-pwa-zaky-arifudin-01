/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import Select from '@common_forms/Select';
import cx from 'classnames';
import { formatPrice } from '@helper_currency';

const SelectItem = ({
    data, options = [], selectOptions, currencyCache, dynamicPrice,
}) => {
    const defaultValue = React.useMemo(() => {
        let tempValue = 0;
        if (options && options.length > 0) {
            for (let index = 0; index < options.length; index++) {
                const element = options[index];
                if (element.is_default) {
                    tempValue = element.id;
                }
            }
        }
        return tempValue;
    }, [options]);

    const selectedValue = React.useMemo(() => {
        let selectedLabel = '';
        const filterOption = options.filter((item) => item.id === defaultValue);
        if (filterOption.length > 0) {
            const option_item = filterOption[0];
            selectedLabel = `${option_item.label} - ${formatPrice(dynamicPrice === false
                ? option_item.price : option_item.product.price_range.minimum_price.final_price.value,
            option_item.product.price_range.minimum_price.final_price.currency,
            currencyCache)}`;
        }
        return selectedLabel;
    }, [defaultValue]);

    const listOptions = React.useMemo(() => {
        const dataOptions = [];
        if (options) {
            for (const option_index in options) {
                const option_item = options[option_index];
                dataOptions.push({
                    id: option_item.id,
                    value: option_item.id,
                    label: `${option_item.label} - ${formatPrice(dynamicPrice === false
                        ? option_item.price : option_item.product.price_range.minimum_price.final_price.value,
                    option_item.product.price_range.minimum_price.final_price.currency,
                    currencyCache)}`,
                });
            }
        }
        return dataOptions;
    }, [options]);

    return (
        <div className={cx('cutomize-option-select')}>
            <Select
                id="demo-simple-select"
                value={selectedValue}
                options={listOptions}
                optionProps={{
                    className: 'absolute',
                }}
                onChange={(value) => {
                    selectOptions(data, parseInt(value));
                }}
            />
        </div>
    );
};

export default SelectItem;
