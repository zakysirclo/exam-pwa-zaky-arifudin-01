/* eslint-disable prefer-destructuring */
import Typography from '@common_typography';
import Button from '@common_button';
import cx from 'classnames';
import { formatPrice } from '@helper_currency';
import { checkJson } from '@core_modules/trackingorder/pages/default/helpers/checkJson';

const resultItem = ({
    t, orders, storeConfig, openModal,
}) => {
    const data = orders.data[0];
    if (orders.data.length > 0) {
        let { detail } = data;
        detail = detail[0];
        const shippingMethods = detail.shipping_methods.shipping_detail;

        const items = [
            { primary: t('trackingorder:orderStatus'), secondary: data.status_label },
            {
                primary: t('trackingorder:shippedTo'),
                secondary: `${detail.shipping_address.firstname} ${detail.shipping_address.lastname}`,
            },
            { primary: t('trackingorder:orderId'), secondary: data.order_number },
            {
                primary: t('trackingorder:orderTotal'),
                secondary: formatPrice(data.grand_total, storeConfig.base_currency_code || 'USD'),
            },
            {
                primary: t('trackingorder:paymentMethod'),
                secondary: detail.payment.payment_additional_info.method_title,
            },
            {
                primary: t('trackingorder:shippingMethod'),
                secondary: detail.shipping_methods.shipping_description,
            },
        ];

        if (shippingMethods.length > 0) {
            shippingMethods.forEach((shipping) => {
                if (shipping.data_detail) {
                    let dt = shipping.data_detail;
                    dt = dt.replace(/'/g, '`');
                    dt = dt.replace(/"/g, "'");
                    dt = dt.replace(/`/g, '"');

                    if (checkJson(dt) && !JSON.parse(dt).errors) {
                        dt = JSON.parse(dt);
                        items.push({
                            primary: t('trackingorder:trackingOrder'),
                            secondary: (
                                <Button variant="outlined" onClick={() => openModal(shipping.trackorder_type, dt)} align="left">
                                    <Typography type="bold" decoration="underline" align="left">
                                        {shipping.track_number}
                                        {' '}
                                        {`(${shipping.trackorder_type})`}
                                    </Typography>
                                </Button>
                            ),
                        });
                    } else {
                        items.push({
                            primary: t('trackingorder:trackingOrder'),
                            secondary: shipping.track_number,
                        });
                    }
                } else {
                    items.push({
                        primary: t('trackingorder:trackingOrder'),
                        secondary: shipping.track_number,
                    });
                }
            });
        }
        return (
            <div className={cx('row')}>
                <div className="xs:basis-full">
                    <Typography className="label-result text-base">{t('trackingorder:trackingInformation')}</Typography>
                </div>
                <div className="xs:basis-full hidden-mobile">
                    <div className="table-container">
                        <table className="table">
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Typography className="clear-margin-padding first-letter:uppercase text-left">{item.primary}</Typography>
                                        </td>
                                        <td>
                                            <Typography className="clear-margin-padding">{item.secondary}</Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="xs:basis-full hidden-desktop">
                    <div className="list-container">
                        {items.map((item, i) => (
                            <div key={i} className="list-item-container">
                                <div
                                    primary={
                                        <Typography className="clear-margin-padding first-letter:uppercase text-left">{item.primary}</Typography>
                                    }
                                />
                                <div className="list-item-secondary-container">
                                    <Typography className="clear-margin-padding">{item.secondary}</Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <style jsx global>
                    {`
                        .label-result {
                            font-size: 20px;
                            margin-top: 30px;
                        }
                    `}
                </style>
            </div>
        );
    }
    return <div className="p-2 bg-yellow-500 text-neutral-white">{t('trackingorder:orderNotFound')}</div>;
};

export default resultItem;
