/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
import Radio from '@common/Forms/Radio';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';

const RadioOption = ({
    val, selectOptions, data, currencyCache, dynamicPrice,
}) => (
    <div className="options-radio-container mb-[12px]">
        <Radio
            variant="single"
            id={val.id}
            name={val.id}
            value={val.id}
            checked={val.is_default}
            onClick={() => selectOptions(data, val.id)}
            classNames={{
                checkboxClasses: 'w-[16px] h-[16px]',
            }}
        >
            <Typography variant="bd-2b">
                {`${val.label} + ${formatPrice(dynamicPrice === false
                    ? val.price
                    : val.product.price_range.minimum_price.final_price.value,
                val.product.price_range.minimum_price.final_price.currency, currencyCache)}`}
            </Typography>
        </Radio>
    </div>
);

export default RadioOption;
