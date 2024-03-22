/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import Typography from '@common_typography';
import Radio from '@common_forms/Radio';
import Select from '@common_forms/Select';
import Checkbox from '@common_forms/CheckBox';
import Skeleton from '@common_skeleton';
import { formatPrice } from '@helper_currency';

const ExtraFeeView = ({
    cart, globalCurrency, t, state, handleChange, loading, currencyCache,
}) => {
    const Loader = () => (
        <div className="w-full flex flex-col gap-3">
            <Skeleton variant="text" width="40%" height={35} />
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
        </div>
    );
    if (loading.all || loading.extraFee) {
        return <Loader />;
    }
    return (
        <>
            <div className="w-full flex flex-col gap-3" id="checkoutExtraFee">
                {/* <Typography variant="title" type="bold" className={classanames(styles.title)}>{t('common:title:extraFee')}</Typography> */}
                {
                    cart.addtional_fees.data.map((item, key) => {
                        const data = item.options.map((option) => ({
                            ...option,
                            originalLabel: option.label,
                            label: `${option.label} (${formatPrice(option.price, globalCurrency, currencyCache)})`,
                            value: JSON.stringify(option),
                        }));
                        if (item.frontend_type === 'checkbox' && item.enabled) {
                            return (
                                <div className="flex flex-col" key={key}>
                                    <Typography variant="bd-2">
                                        {item.fee_name}
                                    </Typography>
                                    <Checkbox
                                        label=""
                                        key={key}
                                        flex="column"
                                        data={data}
                                        value={state[item.id_fee] ? state[item.id_fee] : []}
                                        onChange={(val) => handleChange(item.id_fee, val)}
                                    />
                                </div>
                            );
                        }
                        if (item.frontend_type === 'radio' && item.enabled) {
                            return (
                                <div className="flex flex-col" key={key}>
                                    <Typography variant="bd-2">
                                        {item.fee_name}
                                    </Typography>
                                    <Radio
                                        flex="column"
                                        data={data}
                                        value={state[item.id_fee] ? state[item.id_fee] : ''}
                                        onChange={(val) => handleChange(item.id_fee, val)}
                                    />
                                </div>
                            );
                        }
                        if (item.frontend_type === 'dropdown' && item.enabled) {
                            return (
                                <div className="flex flex-col" key={key}>
                                    <Select
                                        options={data}
                                        label={item.fee_name}
                                        value={state[item.id_fee] ? state[item.id_fee] : ''}
                                        onChange={(event) => handleChange(item.id_fee, event.target.value)}
                                        helperText={t('common:form:select')}
                                    />
                                </div>
                            );
                        }
                    })
                }
            </div>
        </>
    );
};

export default ExtraFeeView;
