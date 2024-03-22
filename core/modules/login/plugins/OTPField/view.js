/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import OtpInput from 'react-otp-input';
import cx from 'classnames';

import Button from '@common_button';
import Typography from '@common_typography';
import Image from 'next/image';

const OtpView = (props) => {
    const {
        t, handleSend, config, handleCheck, setShow, onChange, value, otpFalse, setOtpFalse, disabled,
    } = props;

    return (
        <div className="flex justify-center">
            <div className="w-[320px] tablet:w-[480px] desktop:w-[584px] px-8 pt-6 pb-10 rounded-md border
            border-neutral-200 flex-col gap-2 inline-flex bg-white "
            >
                <div onClick={() => setShow(false)} className="cursor-pointer">
                    <Image
                        src="/assets/img/arrow-left.svg"
                        alt="back to form login"
                        quality={80}
                        width={24}
                        height={24}
                    />
                </div>
                <div className="flex-col inline-flex bg-white text-center gap-10">
                    <Typography variant="h2">
                        {t('otp:otpCode')}
                    </Typography>
                    <Typography variant="p-2" className="text-neutral-700">
                        {t('otp:sentOtp')}
                    </Typography>

                    <div className="flex justify-center">
                        <OtpInput
                            value={value}
                            onChange={(e) => { onChange(e); setOtpFalse(false); }}
                            numInputs={config?.maxLength || 4}
                            inputStyle={cx(
                                'w-9 tablet:w-12 h-12 tablet:h-16 text-center aspect-square focus:outline-none focus:ring-1 rounded-md px-4 py-3 ring-[0.9px]',
                                otpFalse ? 'ring-red-500' : 'ring-neutral-500',
                            )}
                            renderInput={(p) => <input {...p} style={{ width: '' }} />}
                            renderSeparator={<div className="w-2 tablet:w-4 desktop:w-6" />}
                        />
                    </div>

                    <Typography variant="p-2" className="text-neutral-500 gap-1 justify-center">
                        {t('otp:haventRecieved')}
                        {' '}
                        <span
                            className="!text-primary-500 underline cursor-pointer"
                            onClick={handleSend}
                        >
                            {t('otp:resendCode')}
                        </span>
                    </Typography>
                    <Button
                        className="flex justify-center capitalize"
                        onClick={handleCheck}
                        disabled={disabled}
                    >
                        {t('otp:title')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OtpView;
