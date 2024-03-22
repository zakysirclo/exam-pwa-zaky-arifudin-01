/* eslint-disable no-lonely-if */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */

import Typography from '@common_typography';
import formatDate from '@helper_date';
import ArrowTopRightOnSquareIcon from '@heroicons/react/20/solid/ArrowTopRightOnSquareIcon';
import Link from 'next/link';

const ShipperView = (props) => {
    // prettier-ignore
    const {
        data, orders, type, t,
    } = props;

    const isLGX = type.toLowerCase().includes('logistix');
    const isShipperid = type.toLowerCase().includes('shipperid');
    const isPopaket = type.toLowerCase().includes('popaket');
    const shipperData = {
        detail: {
            receiver_name: '',
            driver_name: '',
            driver_phone: '',
            driver_license_number: '',
            shipper_name: '',
            description: '',
            update_date: '',
            last_status: '',
            live_tracking: '',
        },
    };
    let histories = [];

    if (isLGX) {
        const receiver_fullname = `${orders.data[0].detail[0].shipping_address.firstname} ${orders.data[0].detail[0].shipping_address.lastname}`;
        histories = data.data.shipmentTracking.trackingData[0]?.historyStatus || [];
        shipperData.detail = {
            ...shipperData.detail,
            receiver_name: receiver_fullname || 'unknown',
            driver_name: data.data.shipmentTracking.trackingData[0]?.driverInfo.name || 'unknown',
            driver_phone: data.data.shipmentTracking.trackingData[0]?.driverInfo.phoneNumber || 'unknown',
            driver_license_number: data.data.shipmentTracking.trackingData[0]?.driverInfo.licenseNumber || 'unknown',
            description: histories[histories.length - 1]?.note || '',
            update_date: formatDate(histories[histories.length - 1].timestamp, 'DD-MM-YYYY HH:mm'),
            last_status: histories[histories.length - 1]?.status || '',
            live_tracking: data.data.shipmentTracking.trackingData[0].trackingUrl || '',
        };
    } else {
        const detail = isShipperid ? data?.data : isPopaket ? data[0] : {};
        histories = isShipperid ? data?.data?.trackings : isPopaket ? data : [];

        if (isShipperid) {
            shipperData.detail = {
                ...shipperData.detail,
                receiver_name: detail?.consignee?.name || '',
                shipper_name: detail?.consigner?.name || '',
                driver_name: detail?.driver?.name || '',
                driver_phone: detail?.driver?.phone || '',
                driver_license_number: detail?.driver?.vehicle_number || '',
                update_date: detail?.last_updated_date ? formatDate(detail.last_updated_date, 'DD-MM-YYYY HH:mm') : '',
                last_status: detail?.trackings?.length > 0 ? detail?.trackings[detail.trackings.length - 1]?.shipper_status?.description : '',
                live_tracking: detail?.trackURL && detail?.trackURL !== '' ? detail.trackURL : '',
            };
        }

        if (isPopaket) {
            shipperData.detail = {
                ...shipperData.detail,
                update_date: detail?.date ? formatDate(detail.date, 'DD-MM-YYYY HH:mm') : '',
                last_status: detail?.status || '',
                description: detail?.description || '',
            };
        }
    }

    return (
        <div>
            <div className="trackingorder-detail">
                <Typography variant="h2" className="mb-1">
                    Detail
                </Typography>
                <div style={{ marginBottom: 30 }}>
                    {shipperData.detail.receiver_name !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:receiverName')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.receiver_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.driver_name !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:driverName')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.driver_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.driver_phone !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:driverPhone')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.driver_phone}</Typography>
                        </div>
                    )}
                    {shipperData.detail.driver_license_number !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:driverLicenseNumber')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.driver_license_number}</Typography>
                        </div>
                    )}
                    {shipperData.detail.shipper_name !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:shipperName')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.shipper_name}</Typography>
                        </div>
                    )}
                    {shipperData.detail.description !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:description')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.description}</Typography>
                        </div>
                    )}
                    {shipperData.detail.update_date !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:updateDate')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.update_date}</Typography>
                        </div>
                    )}
                    {shipperData.detail.last_status !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">{t('trackingorder:lastStatus')}</Typography>
                            <Typography className="tracking--list-item__desc">{shipperData.detail.last_status}</Typography>
                        </div>
                    )}
                    {shipperData.detail.live_tracking !== '' && (
                        <div className="tracking--list-item">
                            <Typography className="tracking--list-item__title">Live Tracking</Typography>
                            <div className="track-link flex ml-4">
                                <Link href={shipperData.detail.live_tracking || '#'}>
                                    <div className="flex">
                                        <Typography className="mr-1 !min-w-[50px]">{t('trackingorder:track')}</Typography>
                                        <ArrowTopRightOnSquareIcon width={16} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="trackingorder-history">
                <Typography variant="h2" className="capitalize mb-1">
                    {t('trackingorder:history')}
                </Typography>

                {histories &&
                    histories.map((history, index) => {
                        let dateTime;
                        let description;

                        if (isLGX) {
                            dateTime = history.timestamp ? formatDate(new Date(history.timestamp * 1000), 'DD-MM-YYYY HH:mm') : '';
                            description = history.note;
                        } else {
                            if (isShipperid) {
                                dateTime = formatDate(history.created_date, 'DD-MM-YYYY HH:mm');
                                description = history?.shipper_status?.description || '-';
                            } else if (isPopaket) {
                                dateTime = formatDate(history.date, 'DD-MM-YYYY HH:mm');
                                description = history.description || '-';
                            }
                        }

                        return (
                            <div key={index} className="flex">
                                <Typography className="min-w-[155px]">{dateTime}</Typography>
                                <Typography className="ml-4 font-normal">{description}</Typography>
                            </div>
                        );
                    })}
            </div>
            <style jsx>
                {`
                    .trackingorder-detail :global(a:hover),
                    .trackingorder-history :global(a:hover) {
                        text-decoration: underline;
                    }
                    .tracking--list-item {
                        display: flex;
                        min-width: 155px;
                    }
                    .tracking--list-item :global(span:first-child) {
                        min-width: 155px;
                    }
                    .tracking--list-item :global(.track-link > *) {
                        background-color: #eee;
                        padding: 5px;
                        text-decoration: none !important;
                        border-radius: 5px;
                    }
                    .tracking--list-item :global(.tracking--list-item__desc) {
                        margin-left: 16px;
                        font-weight: 400;
                    }
                `}
            </style>
        </div>
    );
};

export default ShipperView;
