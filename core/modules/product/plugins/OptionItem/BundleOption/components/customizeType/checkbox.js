/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
import { formatPrice } from '@helper_currency';
import Typography from '@common_typography';
import CheckBox from '@common/Forms/CheckBox';

const CheckBoxOption = ({
    val, selectOptions, data, currencyCache, dynamicPrice,
}) => (
    <div className="options-checkbox-container mb-[12px]">
        <CheckBox
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
        </CheckBox>
    </div>
);

export default CheckBoxOption;
