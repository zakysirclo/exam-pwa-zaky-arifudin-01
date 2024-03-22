/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-plusplus */
import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
import Divider from '@common_divider';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import OptionItemAction from '@plugin_optionitemaction';

const Select = dynamic(() => import('@plugin_optionitem/BundleOption/components/customizeType/select'), { ssr: false });
const Multiple = dynamic(() => import('@plugin_optionitem/BundleOption/components/customizeType/multiple'), { ssr: false });
const Radio = dynamic(() => import('@plugin_optionitem/BundleOption/components/customizeType/radio'), { ssr: false });
const Checkbox = dynamic(() => import('@plugin_optionitem/BundleOption/components/customizeType/checkbox'), { ssr: false });

const GenerateOptionsSelect = (props) => {
    const {
        data, options = [], selectOptions, currencyCache, dynamicPrice,
    } = props;
    if (data.type === 'select') {
        return <Select {...props} />;
    }
    if (data.type === 'multi') {
        return <Multiple {...props} />;
    }
    return options.map((val, idx) => {
        if (data.type === 'radio') {
            return val.product !== null ? (
                <Radio
                    val={val}
                    key={idx}
                    data={data}
                    selectOptions={selectOptions}
                    currencyCache={currencyCache}
                    dynamicPrice={dynamicPrice}
                />
            ) : null;
        }
        if (data.type === 'checkbox') {
            return val.product !== null ? (
                <Checkbox
                    val={val}
                    key={idx}
                    data={data}
                    selectOptions={selectOptions}
                    currencyCache={currencyCache}
                    dynamicPrice={dynamicPrice}
                />
            ) : null;
        }

        return null;
    });
};

const Customize = (props) => {
    const {
        data,
        t,
        items,
        changeQty,
        generateBundlePrice,
        selectOptions,
        handleAddToCart,
        loading,
        currencyCache,
        stockStatus,
    } = props;
    const [qty, setQty] = React.useState(1);
    const product = data && data.products ? data.products.items[0] : {};
    const isDynamicPrice = product ? product.dynamic_price : true;

    return (
        <>
            <Typography variant="bd-1c" color="text-neutral-500">
                {`${t('common:label:customize')} `}
                {product.name}
            </Typography>
            {items.length > 0 ? (
                <div className={cx('customization-container', 'mt-[16px]')}>
                    <div className="flex flex-col">
                        <div className="xs:basis-full lg:basis-full">
                            {items.map((val, idx) => (
                                <div className="item-list mb-[16px]" key={idx}>
                                    <Typography variant="bd-1">
                                        {val.title}
                                        <span className="required-label">*</span>
                                    </Typography>
                                    <div className="item-list-option mt-[16px] mb-[16px]">
                                        <GenerateOptionsSelect
                                            data={val}
                                            options={val.options}
                                            selectOptions={selectOptions}
                                            currencyCache={currencyCache}
                                            dynamicPrice={isDynamicPrice}
                                        />
                                    </div>
                                    <Typography variant="bd-2a">
                                        {t('product:quantity')}
                                    </Typography>
                                    <ButtonQty
                                        classNameInputContainer="mt-[6px]"
                                        value={val.options.find((option) => option.is_default)?.quantity}
                                        onChange={(e) => changeQty(val.position, e)}
                                        max={10000}
                                        disabled={!val.options.find((option) => option.is_default)?.can_change_quantity}
                                    />
                                    <Divider className="mt-[16px] mb-[24px]" />
                                </div>
                            ))}
                        </div>
                        <div className="xs:basis-full lg:basis-full flex flex-col gap-4">
                            <Typography variant="bd-1c" color="text-neutral-500" className="mb-[16px]">
                                {t('product:yourCustomization')}
                            </Typography>
                            <Typography variant="bd-1c" color="text-neutral-800" className="mb-[24px]">
                                {generateBundlePrice(items, currencyCache, isDynamicPrice)}
                            </Typography>
                            <OptionItemAction
                                t={t}
                                showStockStatus
                                stockStatus={stockStatus}
                                stockStatusClassWrapper="mb-[24px]"
                                value={1}
                                setQty={(e) => setQty(e)}
                                maxQty={10000}
                                handleAddToCart={() => handleAddToCart(qty)}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Customize;
