import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import CircularProgress from '@common_circularprogress';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { storeConfigVar } from '@core/services/graphql/cache';
import 'react-phone-number-input/style.css';

const PhoneInput = dynamic(() => import('react-phone-number-input'));

const CustomTextField = ({
    type = null,
    placeholder = '',
    disabled = false,
    onChange = () => {},
    value = '',
    className = '',
    label = '',
    fullWidth = true,
    shrink = true,
    error = false,
    errorMessage = '',
    variant = 'standard',
    loading = false,
    footer,
    ...other
}) => {
    const customClass = classNames('form-control w-full h-full max-h-[100px] mt-[10px] mb-[20px]', className);
    const pwaConfig = storeConfigVar();

    let customTextFieldInput = (
        <div disabled={disabled || loading} fullWidth={fullWidth} error={error} variant={variant} className={customClass}>
            <div shrink={shrink} htmlFor={label} className="first-letter:uppercase input-label">
                {label}
            </div>
            <TextField
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                endAdornment={<>{loading ? <CircularProgress color="inherit" size={20} /> : null}</>}
                {...other}
            />
            {React.isValidElement(footer) ? (
                footer
            ) : (
                <Typography color={error ? 'red' : 'default'}>
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
    if (type === 'phone') {
        let inputValue = value;
        if (value && value !== '' && value[0] === '0') {
            inputValue = `+62${inputValue.substring(1)}`;
        }
        customTextFieldInput = (
            <>
                <div disabled={disabled || loading} fullWidth={fullWidth} error={error} variant={variant} className={customClass}>
                    <div shrink={shrink} htmlFor={label} className="first-letter:uppercase input-label">
                        {label}
                    </div>

                    <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry={pwaConfig && pwaConfig.general_country_default}
                        value={inputValue}
                        onChange={onChange}
                    />

                    {React.isValidElement(footer) ? (
                        footer
                    ) : (
                        <Typography color={error ? 'red' : 'default'}>
                            {errorMessage}
                        </Typography>
                    )}
                </div>
                <style jsx global>
                    {`
                        .PhoneInput {
                            margin-top: 20px;
                        }
                        .PhoneInputInput {
                            border: none;
                            border-bottom: 1px solid grey;
                            font-size: 16px;
                            padding: 5px 0px;
                        }

                        .PhoneInputInput:focus {
                            outline: none;
                            border-bottom: 2px solid #000000;
                        }

                        .PhoneInputInput:hover {
                            border-bottom: 2px solid #000000;
                        }
                    `}
                </style>
            </>
        );
    }
    return customTextFieldInput;
};

export default CustomTextField;
