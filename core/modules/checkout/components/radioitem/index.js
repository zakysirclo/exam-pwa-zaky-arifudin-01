/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import Typography from '@common_typography';
import { formatPrice } from '@helpers/currency';
import { currencyVar } from '@core/services/graphql/cache';
import Radio from '@common_forms/Radio';
import classNames from 'classnames';

const RadioDeliveryItem = (props) => {
    const {
        value,
        label,
        promoLabel,
        selected,
        onChange = () => {},
        image = null,
        classContent = '',
        amount,
        price_incl_tax,
        storeConfig,
        disabled = false,
        id,
        name,
    } = props;
    const handleChange = () => {
        if (!disabled) {
            onChange(value);
        }
    };

    // cache currency
    const currencyCache = currencyVar();

    const labelType = selected ? 'bold' : 'regular';
    let rightSide;

    if (image) {
        // eslint-disable-next-line @next/next/no-img-element
        rightSide = <img src={image} className="max-w-[50px] max-h-[25px] right-0" alt="cimb" />;
    }
    const base_currency_code = storeConfig ? storeConfig.base_currency_code : 'RP';
    if (amount && price_incl_tax && price_incl_tax.value > amount.value) {
        rightSide = (
            <div className="flex flex-row between-xs">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography type={labelType} className="line-through text-right">
                        {formatPrice(price_incl_tax.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography type={labelType} className="ml-auto font-bold text-right">
                        {formatPrice(amount.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
            </div>
        );
    } else if (price_incl_tax && price_incl_tax.value) {
        rightSide = (
            <div className="flex flex-row">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography vtype={labelType} className="ml-auto font-normal text-right">
                        {formatPrice(price_incl_tax.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
            </div>
        );
    } else if (price_incl_tax && price_incl_tax.value === 0 && amount && amount.value === 0) {
        rightSide = (
            <div className="flex flex-row">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography variant="bd-2" type={labelType} className="ml-auto font-bold text-right">
                        {price_incl_tax.value !== 0 ? formatPrice(price_incl_tax.value, amount.currency, currencyCache
                            || base_currency_code, currencyCache) : 'FREE'}
                    </Typography>
                </div>
            </div>
        );
    }

    const shippingLabel = (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography type={labelType}>
                    {label}
                </Typography>
            </div>
            {promoLabel ? (
                <Typography type={labelType}>
                    (
                    {promoLabel}
                    )
                </Typography>
            ) : null}
        </div>
    );

    const itemId = id || `${label}_${value}_${Math.random(Date.now())}`.replace(/ /g, '_');

    return (
        <div className="swift-checkoutRadioItem items-center flex flex-row">
            <Radio
                color="default"
                size="sm"
                variant="single"
                checked={selected}
                onClick={handleChange}
                className="flex-[0_0_auto] flex items-center justify-center"
                classNames={{
                    radioClasses: classNames(
                        'cursor-pointer',
                        disabled ? '!border-neutral-500 focus:!border-500 !text-neutral-500' : '',
                    ),
                }}
                id={itemId}
                disabled={disabled}
                name={name || itemId}
            />

            <label
                htmlFor={itemId}
                className={classNames(
                    'flex flex-row items-center w-full justify-between',
                    'cursor-pointer',
                    classContent,
                )}
            >
                {shippingLabel}
                {rightSide}
            </label>
        </div>
    );
};

export default RadioDeliveryItem;
