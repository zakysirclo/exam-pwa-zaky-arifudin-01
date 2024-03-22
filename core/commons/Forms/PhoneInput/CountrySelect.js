/* eslint-disable no-underscore-dangle */
import { useCallback } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input/input';

const DIVIDER_STYLE = {
    fontSize: '1px',
    backgroundColor: 'currentColor',
    color: 'inherit',
};

export default function CountrySelect(props) {
    const {
        value, onChange, options, disabled, readOnly, ...rest
    } = props;

    const onChange_ = useCallback(
        (event) => {
            const { value: v } = event.target;
            onChange(v === 'ZZ' ? undefined : v);
        },
        [onChange],
    );

    // "ZZ" means "International".
    // (HTML requires each `<option/>` have some string `value`).
    return (
        <div className="relative flex self-stretch items-center mr-[0.35em] p-3">
            {value ? `+${getCountryCallingCode(value)}` : ''}
            <select
                className="absolute top-0 left-0 h-full w-full z-[1] border-[0] opacity-0 cursor-pointer"
                {...rest}
                disabled={disabled || readOnly}
                readOnly={readOnly}
                value={value || 'ZZ'}
                onChange={onChange_}
            >
                {options.map(({ value: optionValue, label, divider }) => (
                    <option
                        key={divider ? '|' : optionValue || 'ZZ'}
                        value={divider ? '|' : optionValue || 'ZZ'}
                        disabled={divider}
                        style={divider ? DIVIDER_STYLE : undefined}
                    >
                        {label}
                    </option>
                ))}
            </select>
            <div className="PhoneInputCountrySelectArrow" />
        </div>
    );
}
