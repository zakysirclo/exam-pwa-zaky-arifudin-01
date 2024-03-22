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
        const tempValue = [];
        if (options && options.length > 0) {
            for (let index = 0; index < options.length; index++) {
                const element = options[index];
                if (element.is_default) {
                    tempValue.push(element.id);
                }
            }
        }
        return tempValue;
    }, [options]);

    const selectedValue = React.useMemo(() => {
        const selectedValues = [];
        const filterOption = options.filter((item) => defaultValue.includes(item.id));
        filterOption.map((option_item) => selectedValues.push(option_item.id));
        return selectedValues;
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

    const handleChange = (value) => {
        selectOptions(data, parseInt(value));
    };

    return (
        <div className={cx('cutomize-option-select-multiple')}>
            <Select
                id="multiple-option"
                multiple
                value={selectedValue}
                options={listOptions}
                itemChange={handleChange}
            />
        </div>
    );
};

export default SelectItem;
