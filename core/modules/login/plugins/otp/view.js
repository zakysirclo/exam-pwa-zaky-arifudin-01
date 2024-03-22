import Button from '@common_button';
import Password from '@common_forms/Password';
import PhoneInput from '@common_forms/PhoneInput';
import Typography from '@common_typography';

const OtpView = (props) => {
    const {
        t, handleSend, phoneProps, handlePhone, time, manySend, config, codeProps, handleOtp, handleCheck,
    } = props;

    return (
        <div>
            <div>
                <div>
                    <PhoneInput
                        label={t('common:form:phoneNumber')}
                        fullWidth
                        {...phoneProps}
                        onChange={handlePhone}
                        value={phoneProps.value}
                    />
                </div>
                <div>
                    <Button
                        id="plugin-sendotp-btn"
                        fullWidth
                        onClick={handleSend}
                        disabled={!!(!phoneProps.value || phoneProps.value === '' || phoneProps.error)}
                    >
                        <Typography variant="p" type="bold" letter="uppercase" color="white" align="center">
                            {t('common:button:sendOtp')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <>
                {time > 0 && <Typography variant="p">{`${t('otp:wait')} ${time} ${t('otp:resend')}`}</Typography>}
                {manySend > 1 && <Typography variant="p">{`${t('otp:sendTimes')} ${manySend - 1} ${t('otp:time')}`}</Typography>}
            </>
            <div>
                <div>
                    <Password
                        label="Code Otp"
                        showVisible={false}
                        showPasswordMeter={false}
                        fullWidth
                        {...codeProps}
                        inputProps={{
                            maxLength: config !== null ? config.maxLength : 4,
                        }}
                        onChange={handleOtp}
                    />
                </div>
                <div>
                    <Button id="plugin-verifyotp-btn" fullWidth disabled={manySend <= 1} onClick={handleCheck}>
                        <Typography variant="p" type="bold" letter="uppercase" color="white">
                            {t('common:button:verify')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OtpView;
