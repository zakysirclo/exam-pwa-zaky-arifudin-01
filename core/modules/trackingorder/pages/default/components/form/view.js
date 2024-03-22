import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';

const FormTemplate = (props) => {
    const { formik, t, loading } = props;
    return (
        <>
            <form className="flex-col gap-6 inline-flex mx-auto w-full" onSubmit={formik.handleSubmit}>
                <TextField
                    className="w-full"
                    label={t('trackingorder:email')}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    hintProps={{
                        displayHintText: formik.touched.email && formik.errors.email,
                        hintType: formik.touched.email && formik.errors.email ? 'error' : '',
                        hintText: formik.errors.email,
                        className: 'mt-2',
                    }}
                    absolute={false}
                />
                <TextField
                    className="w-full"
                    label={t('trackingorder:orderId')}
                    name="order_id"
                    value={formik.values.order_id}
                    onChange={formik.handleChange}
                    hintProps={{
                        displayHintText: formik.touched.order_id && formik.errors.order_id,
                        hintType: formik.touched.order_id && formik.errors.order_id ? 'error' : '',
                        hintText: formik.errors.order_id,
                        className: 'mt-2',
                    }}
                    absolute={false}
                />
                <div className="">
                    <Button fullWidth type="submit" rootClassName="" loading={loading}>
                        <Typography variant="span" type="bold" letter="uppercase" color="white">
                            {t('trackingorder:track')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </>
    );
};

export default FormTemplate;
