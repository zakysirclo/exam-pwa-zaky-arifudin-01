/* eslint-disable semi-style */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import TextField from '@common_forms/TextField';
import Image from '@common_image';
import Select from '@common_forms/Select';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { formatPrice } from '@helper_currency';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getHost } from '@helper_config';
import Datepicker from '@common_forms/Datepicker';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Button = dynamic(() => import('@common_button'), { ssr: false });
const OptionItemAction = dynamic(() => import('@core_modules/product/plugins/OptionItemAction'), { ssr: false });
const MagezonElement = dynamic(() => import('@core_modules/cms/components/cms-renderer/index'), { ssr: false });

const AwGiftCardProduct = (props) => {
    const {
        data,
        qty = 1,
        setQty = () => { },
        handleAddToCart = () => { },
        t,
        loading = false,
        disabled = false,
        showQty = true,
        showAddToCart = true,
        formik,
        storeConfig,
        CustomFooter,
        ...other
    } = props;
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // prettier-ignore
    const {
        aw_gc_allow_delivery_date, aw_gc_allow_open_amount,
        aw_gc_custom_message_fields, aw_gc_amounts, aw_gc_description,
        aw_gc_open_amount_max, aw_gc_open_amount_min, aw_gc_type,
    } = data;

    const emailTemplates = data?.aw_gc_email_templates || [];
    const amountList = aw_gc_amounts?.map((amount) => ({
        label: formatPrice(amount),
        value: amount,
    }));
    if (aw_gc_allow_open_amount) {
        amountList.push({ label: 'Enter Custom Amount', value: 'custom' });
    }
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [selectedCustomAmount, setselectedCustomAmount] = useState([]);

    React.useEffect(() => {
        if (aw_gc_amounts) {
            setselectedCustomAmount(aw_gc_amounts[0]);
        }
    }, [aw_gc_amounts]);

    const handleSelectTemplate = (e) => {
        const templateValue = e.currentTarget.dataset.template;
        const imgTemplate = emailTemplates.find((template) => template.value === templateValue).image_url;
        setSelectedTemplate({ value: templateValue, image: imgTemplate });
        formik.setFieldValue('aw_gc_template', templateValue);
    };

    const handleChangeSelect = (e) => {
        if (e.target.value !== 'custom') {
            formik.setFieldValue('aw_gc_custom_amount', '');
            formik.setFieldValue('aw_gc_amount', e.target.value);
        }
        setselectedCustomAmount(e.target.value);
    };

    const handlePreview = () => {
        formik.setFieldTouched('aw_gc_recipient_name');
        formik.setFieldTouched('aw_gc_recipient_email');
        formik.setFieldTouched('aw_gc_sender_name');
        formik.setFieldTouched('aw_gc_sender_email');
        formik.setFieldTouched('aw_gc_template');
        if (aw_gc_allow_open_amount) {
            formik.setFieldTouched('aw_gc_custom_amount');
        }

        if (formik.isValid) {
            setOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChangeDate = (date) => {
        formik.setFieldValue('aw_gc_delivery_date', date);
    };

    if (React.isValidElement(CustomFooter)) {
        return (
            <>
                <div />
                {
                    React.cloneElement(CustomFooter, {
                        ...other,
                        loading,
                        disabled,
                        showQty,
                        handleAddToCart,
                        qty,
                        setQty,
                        t,
                        showAddToCart,
                    })
                }
            </>
        );
    }

    return (
        <div className="flex flex-col">
            {aw_gc_description && (
                <div className="hidden-mobile">
                    <MagezonElement content={aw_gc_description} storeConfig={storeConfig} />
                </div>
            )}
            {(aw_gc_allow_open_amount || aw_gc_amounts?.length > 1) && (
                <div className="mb-4 flex flex-col gap-4">
                    <Typography variant="h2">{`1. ${t('validate:chooseAmount')}`}</Typography>
                    <div className="flex flex-row" style={{ margin: 10 }}>
                        <Select
                            name="aw_gc_amount"
                            options={amountList}
                            value={selectedCustomAmount}
                            onChange={handleChangeSelect}
                            fullWidth={false}
                        />
                        {selectedCustomAmount === 'custom' && (
                            <TextField
                                name="aw_gc_custom_amount"
                                placeholder={`${aw_gc_open_amount_min} - ${aw_gc_open_amount_max}`}
                                fullWidth={false}
                                onChange={formik.handleChange}
                                value={formik.values.aw_gc_custom_amount}
                                error={!!(formik.touched.aw_gc_custom_amount && formik.errors.aw_gc_custom_amount)}
                                errorMessage={(formik.touched.aw_gc_custom_amount && formik.errors.aw_gc_custom_amount) || null}
                                absolute="false"
                                hintProps={{
                                    displayHintText: !!(formik.touched.aw_gc_custom_amount && formik.errors.aw_gc_custom_amount),
                                    hintType: formik.touched.aw_gc_custom_amount && formik.errors.aw_gc_custom_amount ? 'error' : '',
                                    hintText: formik.errors.aw_gc_custom_amount,
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
            {aw_gc_type !== 'PHYSICAL' && emailTemplates.length > 1 && (
                <div className="mb-4 flex flex-col gap-4">
                    <Typography variant="h2">
                        {aw_gc_allow_open_amount || aw_gc_amounts?.length > 1 ? '2.' : '1.'} {`${t('validate:selectDesign')}`}
                    </Typography>
                    <div className="flex flex-row">
                        {emailTemplates.map((template, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={cx('xs:basis-full sm:basis-1/2 md:basis-4/12 template-option', {
                                        'template-selected': selectedTemplate.value === template.value,
                                    })}
                                    onClick={handleSelectTemplate}
                                    data-template={template.value}
                                >
                                    <Image src={template.image_url} width={150} height={112} />
                                </div>
                            );
                        })}
                        {!!(formik.touched.aw_gc_template && formik.errors.aw_gc_template) && (
                            <Typography color="red">
                                {formik.errors.aw_gc_template}
                            </Typography>
                        )}
                    </div>
                </div>
            )}
            <div className="mb-5 flex flex-col gap-4">
                <Typography variant="h2">
                    {aw_gc_type === 'PHYSICAL'
                        ? aw_gc_allow_open_amount || aw_gc_amounts?.length > 1
                            ? '2.'
                            : '1.'
                        : emailTemplates.length > 1
                            ? aw_gc_allow_open_amount
                                ? '3.'
                                : '2.'
                            : '1.'}
                    {' '}
                    {`${t('validate:composeEmail')}`}
                </Typography>
                <form className="flex flex-col gap-4">
                    {aw_gc_allow_delivery_date && (
                        <Datepicker
                            classWrapper="w-full"
                            label={t('validate:deliveryDate')}
                            name="aw_gc_delivery_date"
                            classLabel={cx('capitalize', 'mb-[8px]')}
                            value={formik.values.aw_gc_delivery_date}
                            onChange={handleChangeDate}
                            hintProps={{
                                displayHintText: !!(formik.touched.aw_gc_delivery_date && formik.errors.aw_gc_delivery_date),
                                hintType: formik.touched.aw_gc_delivery_date && formik.errors.aw_gc_delivery_date ? 'error' : '',
                                hintText: formik.errors.aw_gc_delivery_date,
                            }}
                        />
                    )}
                    <div className="flex flex-col gap-3">
                        <TextField
                            className="textfield w-full"
                            name="aw_gc_recipient_name"
                            label={`${t('validate:to')}*`}
                            placeholder={t('validate:recipientName')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_recipient_name}
                            absolute={false}
                            hintProps={{
                                displayHintText: !!(formik.touched.aw_gc_recipient_name && formik.errors.aw_gc_recipient_name),
                                hintType: formik.touched.aw_gc_recipient_name && formik.errors.aw_gc_recipient_name ? 'error' : '',
                                hintText: formik.errors.aw_gc_recipient_name,
                            }}
                        />

                        <TextField
                            className="textfield w-full"
                            name="aw_gc_recipient_email"
                            placeholder={t('validate:recipientEmail')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_recipient_email}
                            absolute={false}
                            hintProps={{
                                displayHintText: !!(formik.touched.aw_gc_recipient_email && formik.errors.aw_gc_recipient_email),
                                hintType: formik.touched.aw_gc_recipient_email && formik.errors.aw_gc_recipient_email ? 'error' : '',
                                hintText: formik.errors.aw_gc_recipient_email,
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-3">

                        <TextField
                            className="textfield w-full"
                            name="aw_gc_sender_name"
                            label={`${t('validate:from')}*`}
                            placeholder={t('validate:senderName')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_sender_name}
                            absolute={false}
                            hintProps={{
                                displayHintText: !!(formik.touched.aw_gc_sender_name && formik.errors.aw_gc_sender_name),
                                hintType: formik.touched.aw_gc_sender_name && formik.errors.aw_gc_sender_name ? 'error' : '',
                                hintText: formik.errors.aw_gc_sender_name,
                            }}
                        />
                        <TextField
                            className="textfield w-full"
                            name="aw_gc_sender_email"
                            placeholder={t('validate:senderEmail')}
                            fullWidth={false}
                            onChange={formik.handleChange}
                            value={formik.values.aw_gc_sender_email}
                            absolute={false}
                            hintProps={{
                                displayHintText: !!(formik.touched.aw_gc_sender_email && formik.errors.aw_gc_sender_email),
                                hintType: formik.touched.aw_gc_sender_email && formik.errors.aw_gc_sender_email ? 'error' : '',
                                hintText: formik.errors.aw_gc_sender_email,
                            }}
                        />
                    </div>

                    {aw_gc_custom_message_fields && (
                        <div className="flex flex-col gap-3">
                            {aw_gc_custom_message_fields === 1 && (
                                <>
                                    <TextField
                                        className="w-full"
                                        name="aw_gc_headline"
                                        label="Headline"
                                        placeholder="Enter your headline here (optional)"
                                        onChange={formik.handleChange}
                                        value={formik.values.aw_gc_headline}
                                    />
                                    <TextField
                                        className="w-full"
                                        name="aw_gc_message"
                                        label="Message"
                                        placeholder="Enter your Gift Card message here (optional)"
                                        multiline
                                        rows={4}
                                        onChange={formik.handleChange}
                                        value={formik.values.aw_gc_message}
                                    />
                                </>
                            )}
                            {aw_gc_custom_message_fields === 2 && (
                                <TextField
                                    name="aw_gc_headline"
                                    label="Headline"
                                    placeholder="Enter your headline here (optional)"
                                    onChange={formik.handleChange}
                                    value={formik.values.aw_gc_headline}
                                />
                            )}
                            {aw_gc_custom_message_fields === 3 && (
                                <TextField
                                    name="aw_gc_message"
                                    label="Message"
                                    placeholder="Enter your Gift Card message here (optional)"
                                    multiline
                                    rows={4}
                                    onChange={formik.handleChange}
                                    value={formik.values.aw_gc_message}
                                />
                            )}
                        </div>
                    )}
                    {aw_gc_type !== 'PHYSICAL' && (
                        <div className="gc-previewButton-container">
                            <Button className="gc-previewButton" onClick={handlePreview}>
                                <Typography color="white" type="bold">
                                    {t('common:label:preview')}
                                </Typography>
                            </Button>
                        </div>
                    )}
                </form>
            </div>
            <OptionItemAction
                loading={loading}
                disabled={disabled}
                showQty={showQty}
                handleAddToCart={handleAddToCart}
                qty={qty}
                setQty={setQty}
                t={t}
                showAddToCart={showAddToCart}
                {...other}
            />
            <Dialog
                open={open}
                onClickClose={handleCloseDialog}
                variant="plain"
            >
                <div className={cx(
                    'bg-neutral-50 w-max',
                    'p-4',
                    'relative',
                )}
                >
                    <Button
                        iconOnly
                        icon={<XMarkIcon />}
                        variant="plain"
                        className="absolute top-2 right-1"
                        onClick={handleCloseDialog}
                    />
                    <div className="flex flex-col items-center gap-4 bg-neutral-100 p-8">
                        <div className="gc-dialog-image">
                            <Image src={selectedTemplate.image} width={280} height={175} />
                        </div>
                        <Typography variant="h1">{t('common:label:giftCard')}</Typography>
                        <div className="!w-[110px] !h-[34px]">
                            <Image
                                width={110}
                                height={34}
                                src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                alt="logo"
                                quality={100}
                                storeConfig={storeConfig}
                            />
                        </div>
                        <div className="my-4 flex flex-col w-full">
                            <div className="grid grid-cols-3 gap-1 w-full">
                                <Typography>{t('common:label:to')}</Typography>
                                <div className="col-span-2">
                                    {': '}
                                    <Typography>{formik.values.aw_gc_recipient_name}</Typography>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 w-full">
                                <Typography>{t('common:label:from')}</Typography>
                                <div className="col-span-2">
                                    {': '}
                                    <Typography>{formik.values.aw_gc_sender_name}</Typography>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 w-full">
                                <Typography>{t('common:label:value')}</Typography>
                                <div className="col-span-2">
                                    {': '}
                                    <Typography>
                                        {selectedCustomAmount === 'custom'
                                            ? formatPrice(Number(formik.values.aw_gc_custom_amount))
                                            : formatPrice(selectedCustomAmount)}
                                    </Typography>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 w-full">
                                <Typography>{t('common:label:giftCardCode')}</Typography>
                                <div className="col-span-2">
                                    {': '}
                                    <Typography>XXXXXXXXXXXX</Typography>
                                </div>
                            </div>
                        </div>
                        <Button className="gc-dialog-card-details-button" onClick={() => router.push(`${getHost()}`)}>
                            <Typography variant="h2" color="white">
                                {t('common:label:shopNow')}
                            </Typography>
                        </Button>
                        <Typography>{t('common:label:applyShopNow')}</Typography>
                    </div>
                    <div className="flex flex-col items-center py-5 bg-neutral-100 mt-4">
                        {formik.values.aw_gc_headline && (
                            <Typography variant="h2" type="bold">
                                {formik.values.aw_gc_headline}
                            </Typography>
                        )}
                        {formik.values.aw_gc_message && <Typography>{formik.values.aw_gc_message}</Typography>}
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

const ViewProvider = (props) => (
    // <MuiPickersUtilsProvider utils={DateDayJs}>
    // </MuiPickersUtilsProvider>
    <AwGiftCardProduct {...props} />
);

export default ViewProvider;
