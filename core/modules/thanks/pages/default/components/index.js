/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import Button from '@common_button';
import Typography from '@common_typography';
import Router from 'next/router';
import formatDate from '@helper_date';
import cx from 'classnames';
import ModalXendit from '@core_modules/checkout/pages/default/components/ModalXendit';
import dayjs from 'dayjs';
import { formatPrice } from '@helper_currency';
import { modules } from '@config';
import Alert from '@common/Alert';
import IconArrow from '@heroicons/react/24/outline/ArrowRightIcon';
import AccountCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import { getLoginInfo } from '@helper_auth';

const View = (props) => {
    const {
        t,
        checkoutData,
        handleCotinue,
        ordersFilter,
        storeConfig,
        handleDetailOrder,
        handleConfirmPayment,
        bankList,
        paymentInformation,
        currencyCache,
    } = props;
    const goToRegisterPage = () => {
        const registerLink = `/customer/account/create?order_id=${checkoutData.order_id}`;
        Router.push(registerLink);
    };

    const isLogin = getLoginInfo();

    const [openXendit, setOpenXendit] = React.useState(false);

    const registerGuestEnabled = storeConfig.weltpixel_thankyoupage_create_account_enable;
    return (
        <div className={cx(
            'thanks-pages',
            'w-full flex flex-col items-center justify-center',
            'px-20 py-8',
            'bg-no-repeat bg-cover bg-center',
        )}
        >
            {
                ordersFilter && paymentInformation && paymentInformation.OrderPaymentInformation
                && paymentInformation.OrderPaymentInformation.invoice_url && (
                    <ModalXendit
                        open={openXendit}
                        setOpen={() => setOpenXendit(!openXendit)}
                        iframeUrl={paymentInformation.OrderPaymentInformation.invoice_url}
                        order_id={checkoutData?.order_number}
                        payment_code={paymentInformation.OrderPaymentInformation.method_code}
                        amount={ordersFilter.data[0].detail[0].grand_total}
                        mode={paymentInformation.OrderPaymentInformation.xendit_mode}
                        xendit_qrcode_external_id={paymentInformation.OrderPaymentInformation.xendit_qrcode_external_id}
                    />
                )
            }
            {
                checkoutData?.infoMsg && (
                    <div className="">
                        <Alert className="m-15" severity="warning">{checkoutData.infoMsg}</Alert>
                    </div>
                )
            }
            <div className="mt-5 mb-4 flex flex-col items-center justify-center w-full">
                <Typography variant="h1" type="bold" className="uppercase text-2xl">
                    {t('thanks:thanks')}
                </Typography>
                <Typography className="">
                    {t('thanks:placeInfo')}
                </Typography>
            </div>
            <div className="mt-5 mb-4 flex flex-col items-center justify-center w-full gap-2">
                <Typography className="text-center">
                    {`${t('thanks:yourOrderId')} : `}
                    {isLogin && isLogin == 1 ? (
                        <>
                            <a onClick={handleDetailOrder} className="cursor-pointer">
                                <b>{checkoutData?.order_number}</b>
                            </a>
                        </>
                    ) : (
                        <b>{checkoutData?.order_number}</b>
                    )}
                </Typography>
                <Typography className="">
                    {`${t('thanks:amount')} : `}
                    <b>
                        {ordersFilter && formatPrice(
                            ordersFilter.data[0].detail[0].grand_total,
                            storeConfig.base_currency_code || 'IDR', currencyCache,
                        )}
                    </b>
                </Typography>
            </div>
            {ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer' ? (
                <div className="mt-5 grid grid-cols-1 tablet:grid-cols-3 gap-4">
                    {bankList.map((item, index) => (
                        <div
                            key={index}
                            className={cx(
                                'flex flex-col justify-center items-center',
                                'w-full h-max p-6',
                                'border-[0.5px] border-neutral-200',

                            )}
                        >
                            <Typography letter="uppercase" className="">
                                {item.bankname}
                            </Typography>
                            <Typography letter="uppercase" className="">
                                {t('thanks:bankNumber')}
                            </Typography>
                            <Typography type="bold" letter="uppercase" className="">
                                {item.banknumber}
                            </Typography>
                            <Typography letter="uppercase" className="">
                                {`a.n. ${item.placeholder}`}
                            </Typography>
                        </div>
                    ))}
                </div>
            ) : null}
            { ordersFilter && ordersFilter.data[0] && (ordersFilter.data[0].status === 'pending' || ordersFilter.data[0].status === 'pending_payment')
                && paymentInformation.OrderPaymentInformation.invoice_url
                && (paymentInformation.OrderPaymentInformation.due_date !== null
                    ? dayjs().isBefore(dayjs(paymentInformation.OrderPaymentInformation.due_date))
                    : true
                )
                && (modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(paymentInformation.OrderPaymentInformation.method_code)
                || paymentInformation.OrderPaymentInformation.method_code === 'qr_codes') && (
                <div className="mt-5 mb-4 flex flex-col items-center justify-center w-full">
                    <Typography className="mt-4">
                        {t('thanks:onboarding')}
                    </Typography>
                    <Typography className="mt-4">
                        {t('thanks:paymentMethod')}
                        {' : '}
                        <b className="lowercase">{paymentInformation.OrderPaymentInformation.method_title}</b>
                    </Typography>
                    {
                        paymentInformation.OrderPaymentInformation.is_virtual_account
                                        && paymentInformation.OrderPaymentInformation.virtual_account
                            && (
                                <Typography className="mt-4">
                                    {t('thanks:virtualAccount')}
                                    {' : '}
                                    <b className="lowercase">{paymentInformation.OrderPaymentInformation.virtual_account}</b>
                                </Typography>
                            )
                    }
                    {
                        paymentInformation.OrderPaymentInformation.xendit_retail_outlet
                            && paymentInformation.OrderPaymentInformation.payment_code && (
                            <Typography className="mt-4">
                                {t('thanks:paymentCode')}
                                {' : '}
                                <b className="lowercase">{paymentInformation.OrderPaymentInformation.payment_code}</b>
                            </Typography>
                        )
                    }
                    {
                        paymentInformation.OrderPaymentInformation.due_date && (
                            <Typography className="mt-4">
                                {t('thanks:duedate')}
                                {' : '}
                                <b className="lowercase">{paymentInformation.OrderPaymentInformation.due_date}</b>
                            </Typography>
                        )
                    }
                    {
                        paymentInformation.OrderPaymentInformation.instructions
                            // eslint-disable-next-line react/no-danger
                            && (<div dangerouslySetInnerHTML={{ __html: paymentInformation.OrderPaymentInformation.instructions }} />)
                    }
                    <Button
                        onClick={() => setOpenXendit(!openXendit)}
                        align="center"
                        variant="primary"
                    >
                        <Typography variant="bd-3" color="text-neutral-white" className="uppercase">
                            {t('thanks:paynow')}
                        </Typography>
                    </Button>
                </div>
            )}
            {ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer' ? (
                <div className="mt-5 mb-4 flex flex-col items-center justify-center w-full">
                    <Typography className="mt-4">
                        {t('thanks:bankInfo').split('$')[0]}
                        <b className="lowercase">{`${ordersFilter.data[0].detail[0].payment.payment_additional_info.method_title},`}</b>
                        {t('thanks:bankInfo').split('$')[1]}
                    </Typography>
                    <Typography className="mt-4">
                        {ordersFilter
                            && paymentInformation
                            && paymentInformation.OrderPaymentInformation
                            && paymentInformation.OrderPaymentInformation.due_date && (
                            <>
                                {`${t('thanks:bankInfo2')} `}
                                {formatDate(paymentInformation.OrderPaymentInformation.due_date, 'dddd, DD MMM HH:mm WIB')}
                            </>
                        )}
                    </Typography>
                </div>
            ) : null}
            <div className={cx('mt-5 mb-4 flex flex-col items-center justify-center w-full gap-2', 'hidden-mobile')}>
                {ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer' ? (
                    <>
                        <Button onClick={handleConfirmPayment} variant="primary">
                            <Typography letter="uppercase" color="white" type="bold">
                                {t('thanks:paymentConfirmation')}
                            </Typography>
                        </Button>
                        <Button
                            onClick={handleCotinue}
                            variant="plain"
                            icon={<IconArrow className="w-4 h-4" />}
                            iconPosition="right"
                            classNameText="!text-primary"
                        >
                            {t('thanks:continue')}
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={handleCotinue}
                        icon={<IconArrow className="w-4 h-4" />}
                        iconPosition="right"
                        variant="plain"
                        classNameText="!text-primary uppercase"
                    >
                        {t('thanks:continue')}
                    </Button>
                )}
            </div>
            {registerGuestEnabled && !isLogin ? (
                <div className="flex flex-col items-center justify-center mt-5">
                    <AccountCircleIcon className="w-10 h-10" />
                    <Typography variant="p" color="black" align="center">
                        {t('thanks:registerInfo')}
                    </Typography>
                    <Typography variant="p" color="black" align="center">
                        {t('thanks:emailInfo')}
                        {' '}
                        {
                            ordersFilter.data[0].detail[0].payment.method === 'paypal_express'
                                ? ordersFilter.data[0].detail[0].customer_email : checkoutData.email
                        }
                    </Typography>
                    <Button
                        variant="plain"
                        className="mt-5 !p-0"
                        onClick={() => goToRegisterPage()}
                        classNameText="!text-primary uppercase"
                    >
                        {t('thanks:registerTitle')}
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default View;
