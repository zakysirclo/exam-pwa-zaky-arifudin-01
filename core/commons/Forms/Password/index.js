/* eslint-disable no-nested-ternary */
// import TextField from '@common_textfield';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { passwordStrength, storeConfigNameCookie } from '@config';
import cx from 'classnames';
import Cookies from 'js-cookie';
import { useState } from 'react';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon';
import Show from '@common_show';

const Password = (props) => {
    const {
        label = 'Password',
        value = '',
        onChange = () => {},
        showPasswordMeter = false,
        showVisible = false,
        error = false,
        errorMessage = '',
        classLabel = {},
        placeholder = '********',
        absolute = true,
        hintClassName = '',
        required = false,
        ...restProps
    } = props;
    const [show, setShow] = useState(false);
    const [errorPaswd, setErrorPasswd] = useState({
        status: 'No Password',
    });

    let { numberOfRequiredClass, minValue } = passwordStrength;

    const config = Cookies.getJSON(storeConfigNameCookie);

    if (config && config.customer_password_minimum_password_length) {
        minValue = config.customer_password_minimum_password_length;
    }

    if (config && config.customer_password_required_character_classes_number) {
        numberOfRequiredClass = config.customer_password_required_character_classes_number;
    }

    const handleChange = async (event) => {
        onChange(event);
        if (showPasswordMeter) {
            // lazyload zxcvbn function
            const checkPassword = (await import('@helper_passwordstrength')).default;
            const strength = checkPassword({ value: event.target.value, minValue, numberOfRequiredClass });
            setErrorPasswd(strength);
        }
    };

    return (
        <div className="flex flex-col w-[320px]" {...restProps}>
            {label ? (
                <Typography variant="bd-2" className={cx('uppercase', classLabel)}>
                    {label.replace(/_/g, ' ')}

                    <Show when={required}>
                        <span className={cx('text-red-600')}> *</span>
                    </Show>
                </Typography>
            ) : null}
            <TextField
                className="password-field mt-2 w-full"
                type={show ? 'text' : 'password'}
                rightIcon={showVisible && show ? <EyeIcon /> : showVisible ? <EyeSlashIcon /> : <></>}
                rightIconProps={{ className: showVisible ? 'cursor-pointer' : '', onClick: () => setShow(!show) }}
                hintProps={{
                    displayHintText: error,
                    hintType: error ? 'error' : '',
                    hintText: errorMessage,
                    className: hintClassName,
                }}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                absolute={absolute}
            />
            {showPasswordMeter && (
                <>
                    <div>
                        <div
                            className={cx('px-4 py-[10px] flex items-center', {
                                '!bg-neutral-100': errorPaswd.status.toLocaleLowerCase() === 'no password',
                                'bg-red-50': errorPaswd.status.toLocaleLowerCase() === 'weak',
                                'bg-yellow': errorPaswd.status.toLocaleLowerCase() === 'medium',
                                'bg-green-100': errorPaswd.status.toLocaleLowerCase().indexOf('strong') !== -1,
                            })}
                        >
                            <Typography className="">{`Password Strength: ${errorPaswd.status}`}</Typography>
                        </div>
                    </div>
                    {errorPaswd?.message ? (
                        <Typography className="text-red" color="red">
                            {errorPaswd.message}
                        </Typography>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default Password;
