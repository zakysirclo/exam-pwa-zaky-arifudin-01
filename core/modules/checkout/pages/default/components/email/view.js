/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable max-len */
import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import TextField from '@common/Forms/TextField';
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import Popover from '@common/Popover';

const EmailView = (props) => {
    const {
        t, formik, setAnchorEl, anchorEl, config,
        handleBlur, load, loadingAll,
    } = props;

    let isExternalLoginLink = false;
    if (config && config.loginRedirect && config.loginRedirect.link) {
        if (config.loginRedirect.link.indexOf('http') > -1) {
            isExternalLoginLink = true;
        }
    }
    const generateLoginRedirect = () => {
        if (config && config.loginRedirect && config.loginRedirect.link) {
            return config.loginRedirect.link;
        }
        return '/customer/account/login?redirect=/checkout';
    };

    const HelpIcon = (prop) => (
        <Popover
            content={<p>{t('checkout:emailHelper')}</p>}
            open={anchorEl}
            setOpen={setAnchorEl}
            contentClassName="w-max p-3"
        >
            <QuestionMarkCircleIcon {...prop} />
        </Popover>
    );

    return (
        <div
            id="checkoutEmailSetup"
            className={classNames(
                'flex flex-col border-b border-b-neutral-200',
                'w-full py-6 gap-4',
            )}
        >
            <Typography variant="h2" type="bold" className="uppercase">
                {t('checkout:emailAddress')}
            </Typography>
            <div className={classNames(
                'w-full',
                formik.errors.email ? 'mb-4' : '',
            )}
            >
                <TextField
                    disabled={loadingAll || load}
                    id="checkout-email-input"
                    name="email"
                    placeholder="john.doe@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                    absolute={false}
                    hintProps={{
                        displayHintText: !!((formik.touched.email && formik.errors.email)),
                        hintText: formik.errors.email,
                        hintType: 'error',
                    }}
                    rightIcon={load ? <ArrowPath /> : <HelpIcon />}
                    rightIconProps={{
                        className: !load ? 'cursor-pointer !p-2 mr-0 !text-neutral' : '!p-2 animate-spin',
                        onClick: load ? null : () => setAnchorEl(!anchorEl),
                    }}
                />
            </div>
            {!isExternalLoginLink
                ? (
                    <Button align="left" variant="plain" link={generateLoginRedirect()} className="swift-action-tologin w-max !p-0">
                        <Typography variant="bd-2a" type="regular" decoration="underline" size="14">
                            {t('checkout:haveAccount')}
                        </Typography>
                    </Button>
                )
                : (
                    <Button
                        align="left"
                        variant="plain"
                        className="swift-action-tologin w-max !p-0"
                        onClick={() => { window.location.href = generateLoginRedirect(); }}
                    >
                        <Typography variant="bd-2a" type="regular" decoration="underline" size="14">
                            {t('checkout:haveAccount')}
                        </Typography>
                    </Button>
                )}
        </div>
    );
};

export default EmailView;
