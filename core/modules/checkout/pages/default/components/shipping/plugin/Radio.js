/* eslint-disable operator-linebreak */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import Radio from '@common_forms/Radio';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Inspired by blueprintjs
function CustomRadio({
    id = `radio-${Math.random(12)}`, valueData = [], onChange = () => {}, value = '', CustomItem, disabled = false, storeConfig, sellerId,
}) {
    const [valueItem, setValueItem] = useState('');
    useEffect(() => {
        if (value && value.length > 0) {
            const items = value.filter((item) => item.seller_id === sellerId && item.name.carrier_code && item.name.method_code)
                .map((item) => `${item.name.carrier_code}_${item.name.method_code}_${sellerId}`);
            if (items && items.length > 0) {
                setValueItem(items[0]);
            }
        }
    }, [value]);

    return (
        <Radio
            id={id}
            value={valueItem}
            onChange={onChange}
            data={valueData}
            CustomItem={CustomItem}
            classContainer=""
            storeConfig={storeConfig}
            propsItem={{
                borderBottom: false,
                classContent: '',
            }}
            className="!mb-0"
            classNames={{
                radioGroupClasses: '!gap-2',
            }}
            size="sm"
            disabled={disabled}
        />
    );
}

CustomRadio.propTypes = {
    valueData: propTypes.array.isRequired,
    onChange: propTypes.func,
    value: propTypes.array,
    CustomItem: propTypes.element.isRequired,
    disabled: propTypes.bool,
    storeConfig: propTypes.object.isRequired,
};

CustomRadio.defaultProps = {
    onChange: () => {},
    value: '',
    disabled: false,
};

export default CustomRadio;
