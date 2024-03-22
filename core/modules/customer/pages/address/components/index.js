/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
// Library
import Button from '@common_button';
import Skeleton from '@common_skeleton';
import Typography from '@common_typography';
import { SkeletonMobile, SkeletonTable } from '@core_modules/customer/pages/address/components/skeleton';
import Layout from '@layout_customer';
import AddressFormDialog from '@plugin_addressform';
import dynamic from 'next/dynamic';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import cx from 'classnames';
import Alert from '@common_alert';
import Show from '@common_show';
import useMediaQuery from '@hook/useMediaQuery';

const ItemMobile = dynamic(() => import('@core_modules/customer/pages/address/components/ItemMobile'), { ssr: false });
const TableAddress = dynamic(() => import('@core_modules/customer/pages/address/components/table'), { ssr: false });

// Main Render Page
const Content = (props) => {
    const {
        // prettier-ignore
        loading,
        address,
        selectedAddressId,
        handleOpenNew,
        handleAddress,
        loadingAddress,
        success,
        openNew,
        setOpenDialogNew,
        t,
        handleChange,
        removeAddress,
    } = props;
    const { isDesktop } = useMediaQuery();

    return (
        <Layout {...props}>
            <div className={cx('flex', 'flex-col', 'w-full', 'h-full', 'text-base')}>
                {/** Desktop */}
                <Show when={isDesktop}>
                    <div className={cx('desktop-view')}>
                        <div className={cx('relative', 'overflow-x-auto', 'border-[1px]', 'border-neutral-100', 'rounded-lg')}>
                            <table className={cx('swift-table-address', 'w-full', 'text-base')}>
                                <thead>
                                    <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                        <th className={cx('px-4', 'py-3')}>Default</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:address:firstname')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:address:lastname')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:address:street')}</th>
                                        <th className={cx('px-4', 'py-3')}>{t('customer:address:phone')}</th>
                                        <th colSpan="2" className={cx('px-4', 'py-3')}>
                                            {t('common:label:action')}
                                        </th>
                                    </tr>
                                </thead>
                                <Show when={loading}>
                                    <tbody>
                                        <SkeletonTable />
                                    </tbody>
                                </Show>
                                <Show when={!loading}>
                                    <tbody>
                                        <Show when={address?.length}>
                                            <>
                                                {address.map((item, index) => (
                                                    <TableAddress
                                                        {...item}
                                                        handleAddress={handleAddress}
                                                        removeAddress={removeAddress}
                                                        checked={item.id == selectedAddressId}
                                                        key={item.id}
                                                        addressId={item.id}
                                                        firstname={item.firstname}
                                                        lastname={item.lastname}
                                                        telephone={item.telephone}
                                                        postcode={item.postcode}
                                                        region={item.region.region}
                                                        city={item.city}
                                                        country={{
                                                            id: item.country.code,
                                                            full_name_locale: item.country.label,
                                                        }}
                                                        street={item.street.join(' ')}
                                                        value={item.id}
                                                        defaultBilling={item.default_billing}
                                                        defaultShipping={item.default_shipping}
                                                        loadingAddress={loadingAddress}
                                                        success={success}
                                                        handleChange={handleChange}
                                                        selectedAddressId={selectedAddressId}
                                                        t={t}
                                                        idx={index}
                                                    />
                                                ))}
                                            </>
                                        </Show>
                                        <Show when={!address?.length}>
                                            <tr>
                                                <td colSpan={6}>
                                                    <Alert severity="warning" withIcon>
                                                        {t('customer:address:emptyMessage')}
                                                    </Alert>
                                                </td>
                                            </tr>
                                        </Show>
                                    </tbody>
                                </Show>
                            </table>
                        </div>
                    </div>
                </Show>

                {/** Mobile Tablet */}
                <Show when={!isDesktop}>
                    <div className={cx('swift-mobile-tablet-view')}>
                        <Show when={loading}>
                            <SkeletonMobile />
                        </Show>
                        <Show when={!loading}>
                            <>
                                <Show when={address?.length}>
                                    <>
                                        {address.map((item, index) => (
                                            <ItemMobile
                                                {...item}
                                                first={index === 0}
                                                handleAddress={handleAddress}
                                                checked={item.id === selectedAddressId}
                                                key={item.id}
                                                addressId={item.id}
                                                firstname={item.firstname}
                                                lastname={item.lastname}
                                                telephone={item.telephone}
                                                postcode={item.postcode}
                                                region={item.region.region}
                                                city={item.city}
                                                country={{
                                                    id: item.country.code,
                                                    full_name_locale: item.country.label,
                                                }}
                                                street={item.street.join(' ')}
                                                value={item.id}
                                                defaultBilling={item.default_billing}
                                                defaultShipping={item.default_shipping}
                                                loadingAddress={loadingAddress}
                                                success={success}
                                                handleChange={handleChange}
                                                selectedAddressId={selectedAddressId}
                                                t={t}
                                                removeAddress={removeAddress}
                                            />
                                        ))}
                                    </>
                                </Show>
                                <Show when={!address?.length}>
                                    <Alert severity="warning" withIcon>
                                        {t('customer:address:emptyMessage')}
                                    </Alert>
                                </Show>
                            </>
                        </Show>
                    </div>
                </Show>

                <div className={cx('pt-4')}>
                    <Show when={loading}>
                        <div className={cx('px-4')}>
                            <Skeleton height={24} width={124} />
                        </div>
                    </Show>
                    <Show when={!loading}>
                        <Button className="swift-action-add" icon={<PlusIcon />} iconPosition="right" onClick={() => setOpenDialogNew(true)}>
                            <Typography className={cx('!text-neutral-white')}>{t('customer:address:addTitle')}</Typography>
                        </Button>
                    </Show>
                </div>
                <AddressFormDialog
                    {...props}
                    onSubmitAddress={(data, type) => {
                        handleAddress(data, type);
                    }}
                    loading={loadingAddress}
                    success={success}
                    open={openNew}
                    setOpen={() => handleOpenNew(!openNew)}
                />
            </div>
        </Layout>
    );
};

export default Content;
