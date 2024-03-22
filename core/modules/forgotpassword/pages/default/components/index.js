import Router from 'next/router';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import CheckCircleIcon from '@heroicons/react/20/solid/CheckCircleIcon';
import Typography from '@common_typography';
import Button from '@common_button';
import Backdrop from '@common_backdrop';
import TextField from '@common_forms/TextField';
import BreadcrumbView from '@common_breadcrumb';

const ForgotPassword = (props) => {
    const {
        t,
        loading,
        data,
        formik,
        load,
        disabled,
        enableRecaptcha,
        sitekey,
        handleChangeCaptcha,
        recaptchaRef,
        isEmailSent,
    } = props;

    const breadrumbData = [
        {
            label: 'Account',
            link: '/customer/account/login',
            active: true,
        },
    ];

    if (loading || !data) return <Backdrop open />;

    if (isEmailSent) {
        return (
            <div className="px-4 py-5 desktop:px-0 desktop:py-0">
                <div className="mb-10">
                    <BreadcrumbView iconHomeOnly withHome data={breadrumbData} />
                </div>
                <div className="w-full flex justify-center">
                    <div
                        className="
                            max-w-[400px] w-full tablet:w-[550px] tablet:max-w-[550px] desktop:w-[650px] desktop:max-w-[650px]
                            rounded-md border border-neutral-200 bg-white flex-col gap-6 inline-flex
                            mx-auto px-3 pb-6 tablet:p-8 pt-5
                        "
                    >
                        <div
                            className="flex-col gap-6 inline-flex mx-auto w-full"
                        >
                            <div className="flex justify-center">
                                <CheckCircleIcon
                                    className="text-green-600 w-[48px] h-[48px]"
                                />
                            </div>
                            <div>
                                <Typography className="text-center mb-2" variant="h1">
                                    {t('forgotpassword:successWarning')}
                                </Typography>
                                <Typography
                                    variant="p-1"
                                    className="text-center"
                                >
                                    {t('forgotpassword:emailSent')}
                                </Typography>
                            </div>
                            <Button
                                className="flex justify-center"
                                onClick={() => Router.push('/customer/account/login')}
                            >
                                {t('forgotpassword:backToLogin')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-5 desktop:px-0 desktop:py-0">
            <div className="mb-10">
                <BreadcrumbView iconHomeOnly withHome data={breadrumbData} />
            </div>
            <Typography className="text-center mt-14 mb-2 tablet:mt-0" variant="h1">
                {t('forgotpassword:forgotYourPassword')}
            </Typography>
            <Typography
                variant="p-1"
                className="text-center mb-10"
            >
                {t('forgotpassword:weWillSendEmail')}
            </Typography>
            <div className="w-full flex justify-center">
                <div
                    className="
                        max-w-[400px] w-full tablet:w-[550px] tablet:max-w-[550px] desktop:w-[650px] desktop:max-w-[650px]
                        rounded-md border border-neutral-200 bg-white flex-col gap-6 inline-flex
                        mx-auto px-3 pb-6 tablet:p-8 pt-5
                    "
                >
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex-col gap-6 inline-flex mx-auto w-full"
                    >
                        <TextField
                            id="forgotpassword-email-textfield"
                            className="border border-neutral-300 w-full"
                            name="email"
                            label={t('forgotpassword:emailAddress')}
                            placeholder="e.g: user@gmail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            hintProps={{
                                displayHintText: !!(formik.touched.email && formik.errors.email),
                                hintType: 'error',
                                hintText: formik.errors.email || null,
                                className: 'mt-2',
                            }}
                            absolute={false}
                            error={!!(formik.touched.email && formik.errors.email)}
                            errorMessage={formik.errors.email || null}
                        />
                        {enableRecaptcha ? (
                            <div className="w-full overflow-hidden">
                                <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                {formik.errors.captcha && (
                                    <Typography
                                        variant="bd-2b"
                                        className="!text-red"
                                    >
                                        {formik.errors.captcha}
                                    </Typography>
                                )}
                            </div>
                        ) : null}
                        <Button
                            className="flex justify-center capitalize"
                            type="submit"
                            disabled={data?.otpConfig.otp_enable[0].enable_otp_forgot_password || disabled}
                            loading={load}
                        >
                            {t('common:button:send')}
                        </Button>
                    </form>
                    <div className="flex flex-wrap items-center justify-between">
                        <Typography variant="p-2" className="text-neutral-500">
                            {t('forgotpassword:rememberYourPassword')}
                        </Typography>
                        <Link href="/customer/account/login">
                            <Typography
                                variant="p-2"
                                className="!text-primary-600 underline"
                            >
                                {t('forgotpassword:backToLogin')}
                            </Typography>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
