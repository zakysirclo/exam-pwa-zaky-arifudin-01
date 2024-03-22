/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@plugin_addressform';
import cx from 'classnames';
import Show from '@common_show';
import Dialog from '@common_dialog';

const ItemAddress = (props) => {
    const {
        addressId,
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        handleAddress,
        loadingAddress,
        success,
        t,
        selectedAddressId,
        handleChange,
        removeAddress,
    } = props;

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
    const handleRemoveAddress = () => {
        removeAddress(addressId);
        setOpenDelete(true);
    };

    return (
        <div className={cx('swift-mobile-item', 'py-2')}>
            <Dialog
                open={openDelete}
                title={t('customer:address:warningDelete')}
                onClose={() => setOpenDelete(!openDelete)}
                positiveAction={handleRemoveAddress}
                positiveLabel={t('common:button:yes')}
                negativeLabel={t('common:button:cancel')}
                negativeAction={() => setOpenDelete(!openDelete)}
            />

            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />
            <div
                className={cx('flex', 'flex-row', 'shadow-sm', 'p-4', 'justify-start', 'rounded-lg', 'gap-x-4', 'border-[1px]', 'border-neutral-300')}
            >
                <div className={cx('flex', 'justify-center', 'items-center', 'basis-1/12')}>
                    <Radio
                        color="default"
                        size="sm"
                        variant="single"
                        value={addressId}
                        checked={!loadingAddress && checked && addressId === selectedAddressId}
                        onClick={handleChange}
                        id={`${addressId}_${value}`.replace(/ /g, '_')}
                        className={cx('text-center')}
                        classNames={{
                            radioClasses: cx('cursor-pointer', '!mr-0', {
                                'border-[3px] border-primary': addressId === selectedAddressId,
                            }),
                        }}
                    />
                </div>
                <div>
                    {country.id === 'ID' ? (
                        <div className={cx('flex', 'flex-col', 'gap-y-0', 'pb-4')}>
                            <p>{`${firstname} ${lastname}`}</p>
                            <p>{`${city.split(', ')[0]}`}</p>
                            <p>{`${street},`}</p>
                            <p>{`Kec. ${city.split(', ')[1]}, Kel. ${city.split(', ')[2]}`}</p>
                            <p>{`${city.split(', ')[0]} ${postcode}`}</p>
                            <p>{`${region}, ${country.full_name_locale || ''}`}</p>
                            <p>{`T: ${telephone}`}</p>
                        </div>
                    ) : (
                        <div className={cx('flex', 'flex-col', 'gap-y-0', 'pb-4')}>
                            <p>{`${firstname} ${lastname}`}</p>
                            <p>{`${city.split(', ')[0]},`}</p>
                            <p>{`${street}`}</p>
                            <p>{`${city}, ${region},`}</p>
                            <p>{`${country.full_name_locale || ''}, ${postcode},`}</p>
                            <p>{`T: ${telephone}`}</p>
                        </div>
                    )}
                    <button className="swift-mobile-action-edit" type="button" onClick={() => setOpen(!open)}>
                        <a className="pr-4">
                            <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                {t('customer:address:editAddress')}
                            </Typography>
                        </a>
                    </button>
                    <Show when={selectedAddressId !== addressId}>
                        <button className="swift-mobile-action-remove" type="button" onClick={() => setOpenDelete(true)}>
                            <a className="px-4">
                                <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                    {t('customer:address:removeTitle')}
                                </Typography>
                            </a>
                        </button>
                    </Show>
                </div>
            </div>
        </div>
    );
};

export default ItemAddress;
