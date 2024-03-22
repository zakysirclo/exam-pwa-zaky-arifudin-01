import Link from 'next/link';
import Button from '@common_button';
import Typography from '@common_typography';
import PasswordField from '@common_forms/Password';
import BreadcrumbView from '@common_breadcrumb';

const ForgotPassword = (props) => {
    const { t, formik, disabled } = props;

    const breadrumbData = [
        {
            label: 'Account',
            link: '/customer/account/login',
            active: true,
        },
    ];

    return (
        <div className="px-4 py-5 desktop:px-0 desktop:py-0">
            <div className="mb-10">
                <BreadcrumbView iconHomeOnly withHome data={breadrumbData} />
            </div>
            <Typography className="text-center mt-14 mb-2 tablet:mt-0" variant="h1">
                {t('customer:newPassword:forgotYourPassword')}
            </Typography>
            <Typography
                variant="p-1"
                className="text-center mb-10"
            >
                {t('customer:newPassword:enterYourPassword')}
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
                        <PasswordField
                            id="new-password-passfield"
                            className="w-full"
                            name="password"
                            label={t('customer:newPassword:newPassword')}
                            classLabel="capitalize font-medium"
                            value={formik.values.password}
                            onChange={(e) => formik.setFieldValue('password', e.target.value)}
                            error={!!formik.errors.password}
                            errorMessage={formik.errors.password || null}
                            showVisible
                            showPasswordMeter
                            hintClassName="my-2"
                            absolute={false}
                        />
                        <PasswordField
                            id="confirm-password-passfield"
                            className="w-full"
                            name="confirmPassword"
                            label={t('common:form:confirm')}
                            classLabel="capitalize font-medium"
                            value={formik.values.confirmPassword}
                            onChange={(e) => formik.setFieldValue('confirmPassword', e.target.value)}
                            error={!!formik.errors.confirmPassword}
                            errorMessage={formik.errors.confirmPassword || null}
                            showVisible
                            hintClassName="mt-2"
                            absolute={false}
                        />
                        <Button
                            className="flex justify-center capitalize"
                            type="submit"
                            loading={disabled}
                        >
                            {t('customer:newPassword:resetPassword')}
                        </Button>
                    </form>
                    <div className="flex flex-wrap items-center justify-between">
                        <Typography variant="p-2" className="text-neutral-500">
                            {t('customer:newPassword:rememberYourPassword')}
                        </Typography>
                        <Link href="/customer/account/login">
                            <Typography
                                variant="p-2"
                                className="!text-primary-600 underline"
                            >
                                {t('customer:newPassword:backToLogin')}
                            </Typography>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
