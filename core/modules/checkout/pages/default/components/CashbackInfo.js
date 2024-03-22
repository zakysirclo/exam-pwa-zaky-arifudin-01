import { formatPrice } from '@helper_currency';
import Typography from '@common_typography';

const CashbackInfo = ({
    message, price, currency = 'IDR', promo_name,
}) => (
    <div id="checkoutCashbackInfo" className="m-15">
        <div className="p-2 bg-green-700 text-neutral-white">
            { message[0] }
            <Typography className="font-bold">
                {formatPrice(price, currency)}
            </Typography>
            {message[1]}
            <Typography className="font-bold">
                {promo_name}
            </Typography>
            { message[2]}
        </div>
    </div>
);

export default CashbackInfo;
