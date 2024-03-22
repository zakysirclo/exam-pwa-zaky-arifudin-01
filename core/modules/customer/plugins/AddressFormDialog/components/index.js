/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable max-len */
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import Dialog from '@common_dialog';
import Checkbox from '@common_forms/CheckBox';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { BREAKPOINTS } from '@core/theme/vars';
import cx from 'classnames';
import dynamic from 'next/dynamic';

const GoogleMaps = dynamic(() => import('@common_googlemaps'), { ssr: false });

const AddressView = (props) => {
    const {
        t,
        open,
        setOpen,
        pageTitle,
        formik,
        addressId,
        addressState,
        setAddressState,
        mapPosition,
        handleDragPosition,
        disableDefaultAddress,
        loading,
        success,
        gmapKey,
        geocodingKey,
        enableSplitCity,
        responCountries,
        getRegion,
        responRegion,
        responCities,
        getCities,
    } = props;
    const addBtn = success ? cx('bg-green-500', 'hover:bg-green-500', 'py-8') : cx('py-8');
    const inputHintClasses = cx('z-10', '!static', 'mt-2');

    const [isDesktop, setIsDekstop] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth > BREAKPOINTS.xl) {
                setIsDekstop(true);
            } else {
                setIsDekstop(false);
            }
        }
    }, []);

    const getCountriesRender = () => (
        <Autocomplete
            useKey
            openOnFocus
            className={cx('addressForm-country-autoComplete')}
            inputClassName={cx('w-full')}
            popoverWrapperClassName={cx('w-full', 'flex', 'flex-col')}
            popoverContentClassName={cx('px-4', 'text-base', 'text-neutral-800', 'hover:text-neutral-500', 'max-h-[30vh]', '!px-2')}
            value={typeof formik.values.country === 'object' ? formik.values.country?.full_name_locale : formik.values.country}
            onChange={async (e) => {
                formik.setFieldValue('country', e);
                formik.setFieldValue('region', '');
                formik.setFieldValue('city', '');
                formik.setFieldValue('district', '');
                formik.setFieldValue('village', '');
                formik.setFieldValue('postcode', '');
                if (e && e.id) {
                    const state = { ...addressState };
                    state.dropdown.region = null;
                    state.dropdown.city = null;
                    await setAddressState(state);
                    getRegion({
                        variables: {
                            country_id: e.id,
                        },
                    });
                }
            }}
            loading={responCountries.loading}
            itemOptions={responCountries && responCountries.data && responCountries.data.countries}
            name="country"
            primaryKey="id"
            placeholder=""
            label={t('common:form:country')}
            labelKey="full_name_locale"
        />
    );

    // regions is state/province
    const getRegionRender = () => {
        if (addressState.dropdown.region && addressState.dropdown.region.length > 0 && open) {
            return (
                <Autocomplete
                    useKey
                    openOnFocus
                    id="controlled-region"
                    className="addressForm-province-autoComplete"
                    inputClassName={cx('w-full')}
                    popoverWrapperClassName={cx('w-full', 'flex', 'flex-col')}
                    popoverContentClassName={cx('px-4', 'text-base', 'text-neutral-800', 'hover:text-neutral-500', 'max-h-[30vh]', '!px-2')}
                    disabled={!formik.values.country}
                    itemOptions={addressState.dropdown.region}
                    loading={responRegion.loading}
                    name="region"
                    label={t('common:form:region')}
                    labelKey="name"
                    primaryKey="region_id"
                    placeholder=" "
                    value={typeof formik.values.region === 'object' ? formik.values.region?.name : formik.values.region}
                    onChange={async (e) => {
                        formik.setFieldValue('region', e);
                        formik.setFieldValue('city', '');
                        formik.setFieldValue('district', '');
                        formik.setFieldValue('village', '');
                        formik.setFieldValue('postcode', '');
                        if (e && e.region_id) {
                            const state = { ...addressState };
                            state.dropdown.city = null;
                            await setAddressState(state);
                            getCities({
                                variables: { regionId: e.region_id },
                            });
                        }
                    }}
                    inputProps={{
                        hintProps: {
                            className: inputHintClasses,
                            displayHintText: !!(formik.touched.region && formik.errors.region),
                            hintType: 'error',
                            hintText: formik.touched.region && formik.errors.region ? formik.errors.region : '',
                        },
                    }}
                />
            );
        }

        return (
            <TextField
                disabled={!formik.values.country}
                className={cx('w-full')}
                autoComplete="new-password"
                label={t('common:form:region')}
                name="region"
                value={formik.values.region || ''}
                onChange={(e) => {
                    formik.setFieldValue('region', e.target.value);
                    formik.setFieldValue('city', '');
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                }}
                hintProps={{
                    className: inputHintClasses,
                    displayHintText: !!(formik.touched.region && formik.errors.region),
                    hintType: 'error',
                    hintText: formik.touched.region && formik.errors.region ? formik.errors.region : '',
                }}
            />
        );
    };

    // city or kabupaten
    const getCityRender = () => {
        if (addressState.dropdown.city && addressState.dropdown.city.length && addressState.dropdown.city.length > 0 && open) {
            return (
                <Autocomplete
                    useKey
                    openOnFocus
                    id="controlled-city"
                    disabled={formik.values.region.region_id === 'ID' ? !formik.values.region && !responCities : !formik.values.region}
                    className="addressForm-city-autoComplete"
                    inputClassName={cx('w-full')}
                    popoverWrapperClassName={cx('w-full', 'flex', 'flex-col')}
                    popoverContentClassName={cx('px-4', 'text-base', 'text-neutral-800', 'hover:text-neutral-500', 'max-h-[30vh]', '!px-2')}
                    itemOptions={addressState.dropdown.city}
                    name="city"
                    label={t('common:form:city')}
                    labelKey="label"
                    primaryKey="name"
                    placeholder=" "
                    value={typeof formik.values.city === 'object' ? formik.values.city?.label : formik.values.city}
                    onChange={async (e) => {
                        formik.setFieldValue('city', e);
                        formik.setFieldValue('district', '');
                        formik.setFieldValue('village', '');
                        formik.setFieldValue('postcode', '');
                    }}
                    inputProps={{
                        hintProps: {
                            className: inputHintClasses,
                            displayHintText: !!(formik.touched.city && formik.errors.city),
                            hintType: 'error',
                            hintText: formik.touched.city && formik.errors.city ? formik.errors.city : '',
                        },
                    }}
                />
            );
        }

        return (
            <TextField
                disabled={formik.values.region.region_id === 'ID' ? !formik.values.region && !responCities : !formik.values.region}
                className={cx('w-full')}
                autoComplete="new-password"
                label="City"
                name="city"
                value={formik.values.city || ''}
                onChange={(e) => {
                    formik.setFieldValue('city', e.target.value);
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                }}
                hintProps={{
                    className: inputHintClasses,
                    displayHintText: !!(formik.touched.city && formik.errors.city),
                    hintType: 'error',
                    hintText: formik.touched.city && formik.errors.city ? formik.errors.city : '',
                }}
            />
        );
    };

    // district / kecamatan
    const getDistrictRender = () => {
        if (addressState.dropdown.district && addressState.dropdown.district.length && addressState.dropdown.district.length > 0 && open) {
            return (
                <Autocomplete
                    useKey
                    openOnFocus
                    id="controlled-district"
                    className="addressForm-district-autoComplete"
                    inputClassName={cx('w-full')}
                    popoverWrapperClassName={cx('w-full', 'flex', 'flex-col')}
                    popoverContentClassName={cx('px-4', 'text-base', 'text-neutral-800', 'hover:text-neutral-500', 'max-h-[30vh]', '!px-2')}
                    disabled={!formik.values.city}
                    itemOptions={addressState.dropdown.district}
                    name="district"
                    label="Kecamatan"
                    labelKey="label"
                    primaryKey="name"
                    placeholder=" "
                    value={typeof formik.values.district === 'object' ? formik.values.district?.label : formik.values.district}
                    onChange={async (e) => {
                        formik.setFieldValue('district', e);
                        formik.setFieldValue('village', '');
                        formik.setFieldValue('postcode', '');
                    }}
                    inputProps={{
                        hintProps: {
                            className: inputHintClasses,
                            displayHintText: !!(formik.touched.district && formik.errors.district),
                            hintType: 'error',
                            hintText: formik.touched.district && formik.errors.district ? formik.errors.district : '',
                        },
                    }}
                />
            );
        }

        return (
            <TextField
                disabled={!formik.values.city}
                className={cx('w-full')}
                autoComplete="new-password"
                label="Kecamatan"
                name="district"
                value={formik.values.district ? formik.values.district.label : ''}
                onChange={(e) => {
                    formik.setFieldValue('district', e.target.value);
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                }}
                hintProps={{
                    className: inputHintClasses,
                    displayHintText: !!(formik.touched.district && formik.errors.district),
                    hintType: 'error',
                    hintText: formik.touched.district && formik.errors.district ? formik.errors.district : '',
                }}
            />
        );
    };

    const getVillageRender = () => {
        if (addressState.dropdown.village && addressState.dropdown.village.length && addressState.dropdown.village.length > 0 && open) {
            return (
                <Autocomplete
                    useKey
                    openOnFocus
                    id="controlled-village"
                    className="addressForm-village-autoComplete"
                    inputClassName={cx('w-full')}
                    popoverWrapperClassName={cx('w-full', 'flex', 'flex-col')}
                    popoverContentClassName={cx('px-4', 'text-base', 'text-neutral-800', 'hover:text-neutral-500', 'max-h-[30vh]', '!px-2')}
                    disabled={!formik.values.district}
                    itemOptions={addressState.dropdown.village}
                    name="village"
                    label="Desa/Kelurahan"
                    labelKey="label"
                    primaryKey="name"
                    placeholder=" "
                    value={typeof formik.values.village === 'object' ? formik.values.village?.label : formik.values.village}
                    onChange={async (e) => {
                        formik.setFieldValue('village', e);
                        formik.setFieldValue('postcode', '');
                    }}
                    inputProps={{
                        hintProps: {
                            className: inputHintClasses,
                            displayHintText: !!(formik.touched.village && formik.errors.village),
                            hintType: 'error',
                            hintText: formik.touched.village && formik.errors.village ? formik.errors.village : '',
                        },
                    }}
                />
            );
        }

        return null;
    };

    return (
        <Dialog
            open={open}
            variant="container"
            title={addressId ? t('customer:address:editAddressTitle') : t('customer:address:addTitle')}
            useCloseTitleButton
            onClickCloseTitle={() => setOpen(false)}
            classContent={cx('mobile:max-tablet:max-h-[80vh]', 'mobile:max-tablet:overflow-y-scroll', 'rounded-b-[12px]')}
            content={
                <div className={cx('tablet:max-w-[960px]', 'w-full', 'self-center')} id="formAddress">
                    <div className={cx('overflow-y-auto', 'tablet:h-[80vh]')}>
                        <form onSubmit={formik.handleSubmit} autoComplete="new-password" className={cx('flex', 'flex-col', 'gap-y-6', 'tablet:pr-4')}>
                            <TextField
                                id="addressForm-firtsName-textField"
                                className={cx('w-full')}
                                autoComplete="new-password"
                                label={t('common:form:firstName')}
                                name="firstname"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                hintProps={{
                                    className: inputHintClasses,
                                    displayHintText: !!(formik.touched.firstname && formik.errors.firstname),
                                    hintType: 'error',
                                    hintText: formik.touched.firstname && formik.errors.firstname ? formik.errors.firstname : '',
                                }}
                            />
                            <TextField
                                id="addressForm-lastName-textField"
                                className={cx('w-full')}
                                autoComplete="new-password"
                                label={t('common:form:lastName')}
                                name="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                hintProps={{
                                    className: inputHintClasses,
                                    displayHintText: !!(formik.touched.lastname && formik.errors.lastname),
                                    hintType: 'error',
                                    hintText: formik.touched.lastname && formik.errors.lastname ? formik.errors.lastname : '',
                                }}
                            />
                            <TextField
                                id="addressForm-phoneNumber-textField"
                                className={cx('w-full')}
                                autoComplete="new-password"
                                label={t('common:form:phoneNumber')}
                                name="telephone"
                                value={formik.values.telephone}
                                onChange={formik.handleChange}
                                hintProps={{
                                    className: inputHintClasses,
                                    displayHintText: !!(formik.touched.telephone && formik.errors.telephone),
                                    hintType: 'error',
                                    hintText: formik.touched.telephone && formik.errors.telephone ? formik.errors.telephone : '',
                                }}
                            />
                            {responCountries && responCountries.data && responCountries.data.countries && getCountriesRender()}
                            {getRegionRender()}
                            {getCityRender()}
                            {enableSplitCity && formik.values.city ? getDistrictRender() : null}
                            {enableSplitCity && formik.values.district ? getVillageRender() : null}
                            <TextField
                                id="addressForm-postalCode-textField"
                                className={cx('w-full')}
                                autoComplete="new-password"
                                label={t('common:form:postal')}
                                name="postcode"
                                value={formik.values.postcode}
                                onChange={formik.handleChange}
                                onFocus={(e) => {
                                    e.target.setAttribute('autocomplete', 'new-password');
                                    e.target.setAttribute('autocorrect', 'false');
                                    e.target.setAttribute('aria-autocomplete', 'both');
                                    e.target.setAttribute('aria-haspopup', 'false');
                                    e.target.setAttribute('spellcheck', 'off');
                                    e.target.setAttribute('autocapitalize', 'off');
                                    e.target.setAttribute('autofocus', '');
                                    e.target.setAttribute('role', 'combobox');
                                }}
                                hintProps={{
                                    className: inputHintClasses,
                                    displayHintText: !!(formik.touched.postcode && formik.errors.postcode),
                                    hintType: 'error',
                                    hintText: formik.touched.postcode && formik.errors.postcode ? formik.errors.postcode : '',
                                }}
                            />
                            {gmapKey ? (
                                <div className={cx('mb-8')}>
                                    {typeof window !== 'undefined' && (
                                        <GoogleMaps
                                            gmapKey={gmapKey}
                                            geocodingKey={geocodingKey}
                                            formik={formik}
                                            mapPosition={mapPosition}
                                            dragMarkerDone={handleDragPosition}
                                            mode="location-search"
                                            inputClassName={cx('w-full')}
                                            useLabel
                                        />
                                    )}
                                </div>
                            ) : (
                                <TextField
                                    id="addressForm-addressDetail-textField"
                                    className={cx('w-full')}
                                    autoComplete="new-password"
                                    label={t('common:form:addressDetail')}
                                    placeholder={t('common:search:addressDetail')}
                                    name="addressDetail"
                                    value={formik.values.addressDetail}
                                    onChange={formik.handleChange}
                                    onFocus={(e) => {
                                        e.target.setAttribute('autocomplete', 'off');
                                        e.target.setAttribute('autocorrect', 'false');
                                        e.target.setAttribute('aria-autocomplete', 'both');
                                        e.target.setAttribute('aria-haspopup', 'false');
                                        e.target.setAttribute('spellcheck', 'off');
                                        e.target.setAttribute('autocapitalize', 'off');
                                        e.target.setAttribute('autofocus', '');
                                        e.target.setAttribute('role', 'combobox');
                                    }}
                                    hintProps={{
                                        className: inputHintClasses,
                                        displayHintText: !!(formik.touched.addressDetail && formik.errors.addressDetail),
                                        hintType: 'error',
                                        hintText: formik.touched.addressDetail && formik.errors.addressDetail ? formik.errors.addressDetail : '',
                                    }}
                                />
                            )}

                            {disableDefaultAddress != null && (
                                <div className={cx('-mt-2')}>
                                    <Checkbox
                                        id={`addressform-defaultshippingbilling-checkbox-${addressId || 'new'}`}
                                        variant="single"
                                        label={t('customer:address:confirmPinPoint')}
                                        checked={formik.values.defaultShippingBilling}
                                        name="confirmPinPoint"
                                        onChange={() => formik.setFieldValue('defaultShippingBilling', !formik.values.defaultShippingBilling)}
                                        classNames={{
                                            checkboxContainerClasses: cx('flex', 'flex-row'),
                                            checkboxClasses: cx('cursor-pointer', 'min-w-5', 'focus:shadow-none'),
                                        }}
                                    >
                                        <label className="mt-[-2px]" htmlFor={`addressform-defaultshippingbilling-checkbox-${addressId || 'new'}`}>
                                            <Typography>{t('customer:address:useDefault')}</Typography>
                                        </label>
                                    </Checkbox>
                                </div>
                            )}

                            {gmapKey ? (
                                <div className={cx('-mt-2')}>
                                    <Checkbox
                                        id={`addressform-confirmpinpoint-checkbox-${addressId || 'new'}`}
                                        variant="single"
                                        label={t('customer:address:confirmPinPoint')}
                                        checked={formik.values.confirmPinPoint}
                                        name="confirmPinPoint"
                                        onChange={() => formik.setFieldValue('confirmPinPoint', !formik.values.confirmPinPoint)}
                                        classNames={{
                                            checkboxContainerClasses: cx('flex', 'flex-row'),
                                            checkboxClasses: cx('cursor-pointer', 'min-w-5', 'focus:shadow-none'),
                                        }}
                                    >
                                        <label className="mt-[-2px]" htmlFor={`addressform-confirmpinpoint-checkbox-${addressId || 'new'}`}>
                                            <Typography>{`${t('customer:address:confirmPinPoint')}`}</Typography>
                                        </label>
                                    </Checkbox>
                                    {!!(formik.touched.confirmPinPoint && formik.errors.confirmPinPoint) && (
                                        <div style={{ marginTop: '1.5rem', marginLeft: '1.75rem' }}>
                                            <Typography className={cx('text-red')}>
                                                {(formik.touched.confirmPinPoint && formik.errors.confirmPinPoint) || null}
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className={cx('p-4', 'relative', 'text-center')}>
                                <Button
                                    className={cx(addBtn, 'swift-addressForm-saveAddress-btn', 'w-full')}
                                    classNameText={cx('text-center', 'justify-center')}
                                    type="submit"
                                    disabled={loading}
                                    loading={loading}
                                >
                                    <Typography color="white" className={cx('text-center')}>
                                        {t(success ? 'common:button:saved' : 'common:button:save')}
                                    </Typography>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    );
};

export default AddressView;
