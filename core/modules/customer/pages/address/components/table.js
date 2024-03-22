/* eslint-disable jsx-a11y/control-has-associated-label */
import Dialog from '@common_dialog';
import Typography from '@common_typography';
import Show from '@common_show';
import Radio from '@common_forms/Radio';
import AddressFormDialog from '@plugin_addressform';
import React, { useState } from 'react';
import cx from 'classnames';

const TableAddress = (props) => {
    const {
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
        addressId,
        idx,
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
        <>
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

            <tr
                className={cx({
                    'bg-white': idx % 2 === 1,
                    'bg-neutral-50': idx % 2 !== 1,
                }, 'swift-table-row')}
            >
                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'px-4', 'py-3')}>
                    <Radio
                        color="default"
                        size="sm"
                        variant="single"
                        value={addressId}
                        checked={!loadingAddress && checked}
                        onClick={handleChange}
                        id={`${addressId}_${value}`.replace(/ /g, '_')}
                        className={cx('text-center')}
                        classNames={{
                            radioClasses: cx('cursor-pointer'),
                        }}
                    />
                </td>
                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'px-4', 'py-3')}>{firstname}</td>
                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'px-4', 'py-3')}>{lastname}</td>
                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'px-4', 'py-3')}>
                    {country.id === 'ID' ? (
                        <>
                            <p>{`${street},`}</p>
                            <p>{`Kec. ${city.split(', ')[1]}`}</p>
                            <p>{`Kel. ${city.split(', ')[2]}`}</p>
                            <p>{`${city.split(', ')[0]}`}</p>
                            <p>{`${postcode}`}</p>
                            <p>{`${region}`}</p>
                            <p>{`${country.full_name_locale || ''}`}</p>
                        </>
                    ) : (
                        <>
                            <p>{`${city.split(', ')[0]},`}</p>
                            <p>{`${street}`}</p>
                            <p>{`${city}, ${region},`}</p>
                            <p>{`${country.full_name_locale || ''}, ${postcode},`}</p>
                        </>
                    )}
                </td>
                <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'px-4', 'py-3')}>{telephone}</td>
                <td>
                    <button className="swift-action-edit" type="button" onClick={() => setOpen(!open)}>
                        <a className="px-4">
                            <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                {t('customer:address:editAddress')}
                            </Typography>
                        </a>
                    </button>
                </td>
                <td>
                    <Show when={selectedAddressId !== addressId}>
                        <button className="swift-action-remove" type="button" onClick={() => setOpenDelete(true)}>
                            <a className="px-4">
                                <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                    {t('customer:address:removeTitle')}
                                </Typography>
                            </a>
                        </button>
                    </Show>
                </td>
            </tr>
        </>
    );
};

export default TableAddress;
