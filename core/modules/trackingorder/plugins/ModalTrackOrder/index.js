/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */

import Typography from '@common_typography';
import ShipperView from '@core_modules/trackingorder/pages/default/components/shipper';
import formatDate from '@helper_date';
import Dialog from '@common_dialog';
import ArrowTopRightOnSquareIcon from '@heroicons/react/20/solid/ArrowTopRightOnSquareIcon';
import Link from 'next/link';
import { modules } from '@config';
import { checkJson } from '@core_modules/trackingorder/pages/default/helpers/checkJson';
import { startCase } from 'lodash';
import cx from 'classnames';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const ModalResult = (props) => {
    // prettier-ignore
    const {
        open, setOpen, t, orders, modalType, modalData,
    } = props;
    const { trackingorder } = modules;

    const Content = () => {
        const data = orders?.data?.length > 0 ? orders.data[0] : null;
        const detail = data?.detail?.length > 0 ? data.detail[0] : null;
        const shippingMethods = detail?.shipping_methods?.shipping_detail;

        const items = [];
        const gosend = detail?.shipping_methods?.shipping_description?.match(/go-send/i) || '';

        let trackOrder;
        if (shippingMethods) {
            shippingMethods.forEach((method) => {
                const { data_detail } = method;
                if (data_detail && data_detail !== '[]') {
                    let dt = data_detail;
                    dt = dt.replace(/'/g, '`');
                    dt = dt.replace(/"/g, "'");
                    dt = dt.replace(/`/g, '"');

                    if (checkJson(dt) && !JSON.parse(dt).errors) {
                        dt = JSON.parse(dt);

                        const listField = gosend ? trackingorder.fieldDetail.gosend : trackingorder.fieldDetail.shipperid;

                        if (
                            modalType.toLowerCase().includes('logistix') ||
                            modalType.toLowerCase().includes('jne') ||
                            modalType.toLowerCase().includes('sap') ||
                            modalType.toLowerCase().includes('shipperid') ||
                            modalType.toLowerCase().includes('anteraja') ||
                            modalType.toLowerCase().includes('popaket')
                        ) {
                            trackOrder = <ShipperView type={modalType} data={modalData} orders={orders} t={t} />;
                        } else {
                            const keys = Object.keys(dt);
                            for (let idx = 0; idx < keys.length; idx += 1) {
                                if (listField.includes(keys[idx])) {
                                    let secondary = dt[keys[idx]];
                                    if (secondary !== null && secondary !== '' && secondary.includes('http')) {
                                        secondary = (
                                            <div className="track-link">
                                                <Link href={secondary} legacyBehavior>
                                                    <a target="_blank" className="item-link">
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span>{t('trackingorder:track')}</span>
                                                            <ArrowTopRightOnSquareIcon className="text-sm" />
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                        );
                                    }

                                    if (secondary !== null && secondary.length <= 30) {
                                        const date = formatDate(secondary);
                                        if (date !== 'Invalid Date') secondary = date;
                                    }
                                    items.push({
                                        primary: startCase(keys[idx]),
                                        secondary,
                                    });
                                }
                            }
                        }
                    } else {
                        items.push({
                            primary: t('trackingorder:status'),
                            secondary: dt,
                        });
                    }
                } else {
                    trackOrder = <div className="p-2 bg-yellow-500 text-neutral-white my-[32px]">{t('trackingorder:noDataAvailable')}</div>;
                }
            });
        }

        return (
            <div className="'w-full flex flex-col desktop:flex-row-reverse gap-2 !bg-[transparent]',">
                <div className="w-full desktop:w-auto flex justify-end">
                    <div
                        role="presentation"
                        onClick={() => setOpen(false)}
                        className={cx(
                            'w-7 h-7 p-1 rounded-md justify-center items-center gap-1.5 inline-flex group',
                            'bg-neutral-white bg-opacity-40 hover:bg-primary',
                            'cursor-pointer',
                        )}
                    >
                        <XMarkIcon className="w-5 h-5 relative group-hover:text-neutral-white" />
                    </div>
                </div>
                <div
                    className={cx('w-full h-max max-h-[calc(100vh-60px)] p-4 tablet:p-8 bg-neutral-white rounded-lg', 'shadow-xl overflow-y-scroll')}
                >
                    {modalData?.data || data ? (
                        <div className="list-container">
                            {trackOrder}
                            {items.map((item, i) => (
                                <>
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                        <Typography letter="capitalize" className="clear-margin-padding" style={{ width: '40%' }}>
                                            {item.primary}
                                        </Typography>
                                        <Typography variant="span" type="regular" className="clear-margin-padding" style={{ width: '60%' }}>
                                            {item.secondary}
                                        </Typography>
                                    </div>
                                </>
                            ))}
                        </div>
                    ) : (
                        <div className="p-2 bg-yellow-500 text-neutral-white my-[32px]">{t('trackingorder:noDataAvailable')}</div>
                    )}
                </div>
                <style jsx>
                    {`
                        .row :global(.track-link) {
                            display: flex;
                        }
                        .row :global(.track-link > *) {
                            background-color: #eee;
                            padding: 5px;
                            text-decoration: none !important;
                            border-radius: 5px;
                        }
                    `}
                </style>
                <style jsx global>
                    {`
                        .label-result {
                            font-size: 20px;
                            margin-top: 30px;
                        }
                        .item-link {
                            font-weight: bold;
                            text-decoration: underline;
                        }
                    `}
                </style>
            </div>
        );
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                content={<Content />}
                classContainer="!shadow-none max-w-[360px] tablet:!max-w-[700px] desktop:!max-w-[945px]"
                classContent="!p-0 !bg-[transparent]"
                classWrapperTitle="!hidden"
            />
        </>
    );
};

export default ModalResult;
