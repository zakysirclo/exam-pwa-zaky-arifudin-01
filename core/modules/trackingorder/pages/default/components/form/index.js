/* eslint-disable no-nested-ternary */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FormView from '@core_modules/trackingorder/pages/default/components/form/view';
import DetailView from '@core_modules/trackingorder/plugins/ModalTrackOrder';
import { checkJson } from '@core_modules/trackingorder/pages/default/helpers/checkJson';
import dynamic from 'next/dynamic';
import Typography from '@common/Typography';
import cx from 'classnames';

const Breadcrumb = dynamic(() => import('@common_breadcrumb'), { ssr: false });

const FormCom = (props) => {
    const {
        setOrderField, t, email, data, loading, error, getTrackOrder,
    } = props;
    const [openResult, setOpenResult] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [modalData, setModalData] = React.useState('');

    const breadcrumbsData = [{ label: t('trackingorder:trackingOrder'), link: '#', active: true }];

    const TrackingSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        order_id: Yup.string().required(`${t('trackingorder:orderId')} ${t('validate:required')}`),
    });

    const handleHashed = () => {
        const router = useRouter();
        if (router.query.hash) {
            const decodedStr = Buffer.from(router.query.hash, 'base64').toString();
            const params = decodedStr.split('&');
            const dataParam = {};
            params.forEach((param) => {
                const val = param.split('=');
                Object.assign(dataParam, { [val[0]]: val[1] });
            });
            if (Object.keys(dataParam).length !== 0 && dataParam.email && dataParam.order_id) {
                React.useEffect(() => {
                    setOrderField(dataParam);
                    getTrackOrder();
                    setOpenResult(true);
                }, []);
                return [dataParam.email, dataParam.order_id];
            }
        }
        return '';
    };

    const hashedVal = handleHashed();

    const formik = useFormik({
        initialValues: {
            email: hashedVal !== '' ? hashedVal[0] : email || '',
            order_id: hashedVal !== '' ? hashedVal[1] : '',
        },
        validationSchema: TrackingSchema,
        onSubmit: async (values, { resetForm, setValues }) => {
            await setOrderField(values);
            getTrackOrder();
            setOpenResult(true);
            resetForm();
            setValues(values);
        },
    });

    useEffect(() => {
        if (!loading && !error && data?.ordersFilter?.data?.length > 0 && data.ordersFilter.data[0].detail?.length > 0) {
            const shippingMethods = data.ordersFilter.data[0].detail[0].shipping_methods.shipping_detail;
            let orderDetail = shippingMethods[0].data_detail;
            orderDetail = orderDetail.replace(/'/g, '`');
            orderDetail = orderDetail.replace(/"/g, "'");
            orderDetail = orderDetail.replace(/`/g, '"');

            if (checkJson(orderDetail) && !JSON.parse(orderDetail).errors) {
                orderDetail = JSON.parse(orderDetail);
                setOpenModal(true);
                setModalType(shippingMethods[0].trackorder_type);
                setModalData(orderDetail);
            }
        }

        if (error || !data || data?.ordersFilter?.data?.length === 0) {
            setOpenModal(true);
            setModalType('');
            setModalData('');
        }
    }, [data, error, loading]);

    const handleOpenResult = (val) => {
        setOpenResult(val);
    };

    return (
        <>
            <Breadcrumb
                withHome
                iconHomeOnly
                className={cx('mb-[40px]', 'desktop:mt-[10px]', 'tablet:mt-[0px]', 'mobile:mt-[16px] mobile:ml-[16px]')}
                data={breadcrumbsData}
            />
            <Typography className="flex justify-center mb-10 mt-14 tablet:mt-0" variant="h1">
                {t('trackingorder:trackingOrder')}
            </Typography>
            <div className="flex justify-center max-tablet:mb-16">
                <div
                    className="max-w-[400px] w-full tablet:w-[550px] tablet:max-w-[550px] desktop:w-[650px] desktop:max-w-[650px]
                            rounded-md border border-neutral-200 bg-white flex-col gap-6 inline-flex
                            mobile:mx-4 mx-auto px-3 pb-6 tablet:p-8 pt-5 "
                >
                    <FormView {...props} formik={formik} handleOpenResult={handleOpenResult} openResult={openResult} />
                </div>
                {!loading && (data || modalData) ? (
                    <DetailView
                        {...props}
                        modalType={modalType}
                        modalData={modalData}
                        open={openModal}
                        setOpen={setOpenModal}
                        orders={data.ordersFilter}
                    />
                ) : null}
            </div>
        </>
    );
};

export default FormCom;
