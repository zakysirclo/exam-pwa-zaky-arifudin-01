import Typography from '@common_typography';
import formatDate from '@helper_date';
import Link from 'next/link';
import { formatPrice } from '@helper_currency';

const ItemOrder = ({
    status_label, order_number, detail, t, created_at,
}) => (
    <div className="">
        <div className="">
            <Typography variant="p" type="bold">
                {status_label}
            </Typography>
            <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${order_number}`}>

                <Typography variant="title" type="regular">
                    #
                    {order_number}
                </Typography>

            </Link>
            <div className="">
                <div className={`flex flex-col ${''}`}>
                    <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                        {t('order:date')}
                    </Typography>
                    <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                        {t('order:totalItems')}
                    </Typography>
                    <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                        Total
                    </Typography>
                </div>
                <div className="">
                    <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                        {formatDate(created_at)}
                    </Typography>
                    <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                        { detail[0].items.length }
                    </Typography>
                    <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                        { formatPrice(detail[0].grand_total, detail[0].global_currency_code) }
                    </Typography>
                </div>
            </div>
        </div>
    </div>
);

export default ItemOrder;
