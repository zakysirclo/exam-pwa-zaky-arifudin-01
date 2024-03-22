/* eslint-disable react/no-danger */
import Typography from '@common_typography';
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import ReCAPTCHA from 'react-google-recaptcha';
import dynamic from 'next/dynamic';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ContactForm = (props) => {
    const {
        //
        t,
        formik,
        sitekey,
        handleChangeCaptcha,
        recaptchaRef,
        message,
        setMessage,
        load,
        enableRecaptcha,
    } = props;
    return (
        <form onSubmit={formik.handleSubmit}>
            <Message open={message.open} variant={message.variant} setOpen={() => setMessage({ ...message, open: false })} message={message.text} />
            <TextField
                label={t('contact:fullName')}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                hintProps={{
                    displayHintText: !!(formik.touched.fullName && formik.errors.fullName),
                    hintType: formik.touched.fullName && formik.errors.fullName ? 'error' : '',
                    hintText: (formik.touched.fullName && formik.errors.fullName) || null,
                }}
                classWrapper="mb-4"
                className="max-tablet:w-full"
                absolute={false}
            />
            <TextField
                label={t('contact:email')}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                hintProps={{
                    displayHintText: !!(formik.touched.email && formik.errors.email),
                    hintType: formik.touched.email && formik.errors.email ? 'error' : '',
                    hintText: (formik.touched.email && formik.errors.email) || null,
                }}
                classWrapper="mb-4"
                className="max-tablet:w-full"
                absolute={false}
            />
            <TextField
                label={t('contact:telephone')}
                name="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                hintProps={{
                    displayHintText: !!(formik.touched.telephone && formik.errors.telephone),
                    hintType: formik.touched.telephone && formik.errors.telephone ? 'error' : '',
                    hintText: (formik.touched.telephone && formik.errors.telephone) || null,
                }}
                classWrapper="mb-4"
                className="max-tablet:w-full"
                absolute={false}
            />
            <TextField
                label={t('contact:message')}
                name="message"
                multiline
                rows="4"
                value={formik.values.message}
                onChange={formik.handleChange}
                hintProps={{
                    displayHintText: !!(formik.touched.message && formik.errors.message),
                    hintType: formik.touched.message && formik.errors.message ? 'error' : '',
                    hintText: (formik.touched.message && formik.errors.message) || null,
                }}
                classWrapper="mb-4"
                className="max-tablet:w-full"
                absolute={false}
            />
            {enableRecaptcha ? (
                <>
                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                    {formik.touched.captcha && formik.errors.captcha && <Typography className="text-red">{formik.errors.captcha}</Typography>}
                </>
            ) : null}
            <div />
            <Button disabled={load} loading={load} align="left" type="submit" className="mt-4">
                <Typography variant="span" letter="uppercase" color="white" type="bold">
                    {t('common:button:send')}
                </Typography>
            </Button>
            <style jsx global>
                {`
                    .contact-btn-container {
                        margin-top: 50px;
                    }
                `}
            </style>
        </form>
    );
};

const ContactPage = (props) => {
    const {
        //
        data,
        t,
        loading,
        Skeleton,
        isCms,
    } = props;
    return (
        <div>
            {/* eslint-disable-next-line react/no-danger */}
            {!isCms ? (
                <Typography variant="h1" className="my-4">
                    {t('contact:contactUs')}
                </Typography>
            ) : null}
            <div className="flex flex-row flex-wrap tablet:flex-nowrap">
                {!isCms ? (
                    <div className="md:basis-1/2 xs:basis-full">
                        {!loading && <div dangerouslySetInnerHTML={{ __html: data?.cmsBlocks?.items[0]?.content }} />}
                        {loading && <Skeleton />}
                    </div>
                ) : null}
                <div className="md:basis-1/2 xs:basis-full max-tablet:mt-4 tablet:px-8">
                    <ContactForm {...props} />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
