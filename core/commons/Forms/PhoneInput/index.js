import CountrySelect from '@common_forms/PhoneInput/CountrySelect';
import Show from '@common_show';
import Typography from '@common_typography';
import { storeConfigVar } from '@core/services/graphql/cache';
import cx from 'classnames';
import ReactPhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import metadata from '@common_forms/PhoneInput/metadata.json';

const PhoneInput = (props) => {
    const {
        value,
        onChange,
        label = '',
        error = false,
        errorMessage = '',
        className = '',
        classNameField = '',
        classLabel = '',
        placeholder = '81234567890',
        required = false,
        ...restProps
    } = props;

    const pwaConfig = storeConfigVar();
    const defaultCountry = pwaConfig && pwaConfig.general_country_default;

    let inputValue = value;
    if (value && value !== '' && value[0] === '0') {
        inputValue = `+62${inputValue.substring(1)}`;
    }

    return (
        <div className={cx('flex', 'flex-col', className)} {...restProps}>
            {label ? (
                <label className="mb-2">
                    <Typography variant="h4" className={classLabel}>
                        {label}
                        <Show when={required}>
                            <span className={cx('text-red-600')}> *</span>
                        </Show>
                    </Typography>
                </label>
            ) : null}
            <ReactPhoneInput
                defaultCountry={defaultCountry}
                value={inputValue}
                onChange={(e) => onChange(e)}
                initialValueFormat="national"
                className={cx(
                    'items-center',
                    'w-[320px]',
                    'bg-neutral-white',
                    'border-[1px]',
                    'border-neutral-100',
                    'rounded-lg',
                    'text-base',
                    'hover:border-primary-100',
                    'focus:border-0',
                    {
                        '!border-red hover:!border-red': error,
                    },
                    classNameField,
                )}
                numberInputProps={{
                    className: cx('pr-4', 'py-[10px]', ' focus-visible:outline-none', 'rounded-lg'),
                }}
                countrySelectComponent={CountrySelect}
                placeholder={placeholder}
                metadata={metadata}
            />
            {error && errorMessage ? (
                <Typography variant="bd-2b" className={cx('my-2', '!text-red')}>
                    {errorMessage}
                </Typography>
            ) : null}
        </div>
    );
};

export default PhoneInput;
