import Typography from '@common_typography';
import React from 'react';
import AddressFormDialog from '@plugin_addressform';
import Radio from '@common/Forms/Radio';
import Button from '@common/Button';
import cx from 'classnames';

const ItemAddress = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        default_shipping = false,
        default_billing = false,
        value = '',
        checked = false,
        loading,
        open,
        setOpen,
        handleSave,
        success,
        id,
        t,
        onChange,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const region_value = region.region;
    const street_value = street[0];
    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleSave}
                loading={loading}
                success={success}
                setOpen={() => setOpen(false)}
                pageTitle={t('customer:address:editTitle')}
                addressId={id}
                region={region_value}
                street={street_value}
                defaultShipping={default_shipping}
                defaultBilling={default_billing}
            />
            <div
                className={cx(
                    'flex flex-col checkoutListItemAddress border-b border-neutral-200',
                    'desktop:px-[32px] tablet:px-[32px] mobile:px-[16px]',
                )}
            >
                <Radio
                    variant="single"
                    id={id}
                    checked={checked}
                    value={value}
                    onClick={() => {
                        if (onChange) {
                            onChange({
                                target: {
                                    value: id,
                                },
                            });
                        }
                    }}
                    className="flex flex-row items-center gap-3"
                >
                    <div className="w-full pb-2 flex flex-col">
                        <label htmlFor={id} className="flex flex-col cursor-pointer">
                            <Typography className="" variant="bd-2">
                                {`${firstname} ${lastname}`}
                            </Typography>
                            <Typography className="" variant="bd-2">
                                {street}
                                ,
                            </Typography>
                            <Typography className="" variant="bd-2">
                                {city !== '' && `${city}, `}
                                {region !== '' && `${region.region || ''}, `}
                                {country !== '' && `${country.full_name_locale || ''}, `}
                                {postcode !== '' && postcode}
                            </Typography>
                            <Typography className="" variant="bd-2">
                                {telephone}
                            </Typography>
                        </label>

                        <Button variant="plain" onClick={() => setOpen(true)} className="!p-0">
                            <Typography className="mt-3 cursor-pointer" variant="bd-2">
                                {t('common:button:edit')}
                            </Typography>
                        </Button>
                    </div>
                </Radio>
            </div>
        </>
    );
};

export default ItemAddress;
