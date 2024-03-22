import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { pickupLocations, setInstoreShippingAddress, setShippingMethod } from '@core_modules/checkout/services/graphql';
import Alert from '@common_alert';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import Dialog from '@common_dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setPickupLocationCode, setSelectedData,
} from '@core_modules/checkout/redux/checkoutSlice';

const ModalPickupLocations = (props) => {
    const {
        t, open, setOpen, locations = [],
        handleOpenMessage,
    } = props;

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const [loading, setLoading] = useState(false);
    const [listLocations, setListLocations] = useState(locations);
    const [selected, setSelected] = useState(checkout);
    const [search, setSearch] = useState('');
    const [setShipMethod] = setShippingMethod();
    const [setInstoreAddress] = setInstoreShippingAddress();

    const handleSave = async () => {
        setLoading(true);
        const { cart } = checkout.data;
        try {
            const updatedShippingAddress = await setInstoreAddress({
                variables: {
                    cartId: cart.id,
                    city: selected.city,
                    countryCode: selected.country_id,
                    firstname: selected.name,
                    lastname: selected.name,
                    telephone: selected.phone,
                    postcode: selected.postcode,
                    street: selected.street,
                    region: selected.region_id.toString(),
                    latitude: selected.latitude.toString(),
                    longitude: selected.longitude.toString(),
                    pickup_location_code: selected.pickup_location_code,
                },
            });

            await setShipMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: 'instore',
                    methodCode: 'pickup',
                },
            });

            dispatch(setSelectedData({
                billing: updatedShippingAddress.data.setBillingAddressOnCart.cart,
                address: updatedShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses[0],

            }));

            dispatch(setPickupLocationCode(
                updatedShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses[0].pickup_location_code,
            ));

            setLoading(false);
            setOpen(!open);
        } catch (error) {
            let msg = t('checkout:message:serverError');
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                msg = error.graphQLErrors[0].message;
            }
            setLoading(false);
            setOpen(!open);
            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        const searched = locations.filter(({ name }) => name.toLowerCase().search(value.toLowerCase()) > -1);

        setSearch(value);
        setListLocations(searched);
    };

    useEffect(() => {
        setListLocations(locations);
    }, [locations]);

    const styleCard = 'w-full p-4 my-3 flex flex-col justify-between items-center border border-neutral-200 rouded-lg';
    const styleCardActive = '!border-primary';

    /* eslint-disable */
    return (
        <Dialog
            open={open}
            closeOnBackdrop
            onClose={() => setOpen()}
            onClickCloseTitle={() => setOpen()}
            title={t('checkout:pickupInformation:label')}
            useCloseTitleButton
            content={(
                <div className="flex flex-col border-t border-neutral-200">
                    <div className="flex flex-col">
                            <TextField label="Search" value={search} onChange={handleSearch} />
                            {listLocations && listLocations.length > 0 ? (
                                listLocations.map((loc) => {
                                    return (
                                        <div
                                            key={loc.pickup_location_code}
                                            onClick={() => setSelected(loc)}
                                            className={cx(
                                                styleCard,
                                                (selected && selected.pickup_location_code === loc.pickup_location_code) ? styleCardActive : ''
                                            )}
                                        >
                                            <Typography variant="bd-2">
                                                {loc.name}
                                            </Typography>
                                            <Typography>
                                                {loc.street}
                                                <br />
                                                {loc.city}
                                                <br />
                                                {loc.region}
                                                <br />
                                                {loc.country_id}
                                                <br />
                                                {loc.postcode}
                                                <br />
                                                {loc.telephone}
                                            </Typography>
                                        </div>
                                    );
                                })
                            ) : (
                                <Alert className="m-15" severity="warning">
                                    {t('checkout:storesNotFound')}
                                </Alert>
                            )}
                        </div>
                    <Button className="w-full" classNameText="justify-center" type="button" onClick={handleSave} loading={loading} disabled={loading}>
                            {t('common:button:save')}
                    </Button>
                </div>
            )}
        />
    );
};

const InStorePickup = (props) => {
    const checkout = useSelector(selectCheckoutState);
    const { t, handleOpenMessage } = props;
    const [getPickupLocations, results] = pickupLocations();
    const [open, setOpen] = useState(false);
    const locations = results.data?.pickupLocations.items;
    const { pickup_location_code } = checkout;
    const { address } = checkout.selected;

    useEffect(() => {
        getPickupLocations();
    }, [results.called]);

    return (
        <div
            id="pickupInStore"
            className={cx(
                'flex flex-col border-b border-b-neutral-200',
                'w-full py-6 gap-4',
            )}
        >
            <ModalPickupLocations
                t={t}
                open={open}
                setOpen={setOpen}
                locations={locations}
                handleOpenMessage={handleOpenMessage}
            />
            <Typography variant="h2" className="uppercase">
                {t('checkout:pickupInformation:label')}
            </Typography>
            <Typography>{t('checkout:pickupInformation:pickupAtLabel')}</Typography>
            <div className={cx(
                'my-2 p-4 flex flex-row items-center justify-between',
                'border rounded-lg border-neutral-200 max-w-lg',
                'mb-4',
            )}>
                <div className="flex flex-col">
                    {address && pickup_location_code && Object.keys(address).length > 0 && (
                        <>
                            <Typography variant="bd-2">
                                {address.name}
                            </Typography>
                            <Typography>
                                {address.street[0]}
                                <br />
                                {address.city}
                                <br />
                                {address.region.label}
                                <br />
                                {address.country.label}
                                <br />
                                {address.postcode}
                                <br />
                                {address.telephone}
                            </Typography>
                        </>
                    )}
                    <Button align="left" variant="plain" className="!p-0 !m-0" onClick={() => setOpen(!open)}>
                        <Typography variant="bd-2" className="uppercase">
                            {t('checkout:pickupInformation:changePickupLocation')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InStorePickup;
