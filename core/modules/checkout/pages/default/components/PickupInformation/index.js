/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Typography from '@common_typography';
import cx from 'classnames';
import Skeleton from '@common_skeleton';
import ModalPickupInformation from '@core_modules/checkout/pages/default/components/ModalPickupInformation';
import ModalSelectStore from '@core_modules/checkout/pages/default/components/ModalSelectStore';
import gqlService from '@core_modules/checkout/services/graphql';
import { useSelector } from 'react-redux';
import {
    selectCheckoutState,
} from '@core_modules/checkout/redux/checkoutSlice';
import { useEffect } from 'react';

const PickupInformation = (props) => {
    const {
        t, formik,
    } = props;

    const checkout = useSelector(selectCheckoutState);

    const { cart } = checkout.data;
    let listStores = [];
    const pickupStores = gqlService.getPickupStore({
        variables: { cart_id: cart.id },
        skip: typeof cart === 'undefined',
    });

    if (!pickupStores.loading && pickupStores.data && !pickupStores.error) {
        listStores = pickupStores.data.getPickupStore.store;
    }
    const [openModal, setOpenModal] = React.useState({
        openModalInfo: false,
        openModalSelectStore: false,
    });
    const handleOpen = (state) => {
        setOpenModal({
            ...openModal,
            [state]: !openModal[state],
        });
    };

    useEffect(() => {
        if (!pickupStores.loading && pickupStores.error) {
            window.toastMessage({
                open: true,
                text: t('chekcout:pickupInformation:failedFetchStore'),
                variant: 'error',
            });
        }
    }, [pickupStores]);

    return (
        <div
            id="checkoutPickupStore"
            className={cx(
                'flex flex-col border-b border-b-neutral-200',
                'w-full py-6 gap-4',
            )}
        >
            <ModalPickupInformation
                open={openModal.openModalInfo}
                setOpen={() => handleOpen('openModalInfo')}
                checkout={checkout}
            />
            <ModalSelectStore
                open={openModal.openModalSelectStore}
                setOpen={() => handleOpen('openModalSelectStore')}
                checkout={checkout}
                listStores={listStores}
            />
            <Typography variant="bd-1" className="uppercase">
                {t('checkout:pickupInformation:label')}
            </Typography>
            <div className={cx(
                'border rounded-lg border-neutral-200',
                'max-w-lg p-4 mb-4',
            )}
            >
                <div className="flex flex-col gap-4">
                    {
                        (Object.keys(checkout.pickupInformation).length > 0 && checkout.pickupInformation?.pickup_person_name) && (
                            <>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Person</td>
                                            <td>{' : '}</td>
                                            <td><strong>{checkout.pickupInformation.pickup_person_name}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>{t('common:form:phoneNumber')}</td>
                                            <td>{' : '}</td>
                                            <td><strong>{checkout.pickupInformation.pickup_person_phone}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{' : '}</td>
                                            <td><strong>{checkout.pickupInformation.pickup_person_email}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )
                    }
                    <Button
                        align="left"
                        variant="plain"
                        className="!p-0"
                        onClick={() => handleOpen('openModalInfo')}
                        disabled={
                            formik.values.email !== '' && formik.values.email !== formik.values.oldEmail
                        }
                    >
                        <Typography
                            variant="bd-3"
                            className={cx('uppercase', checkout?.pickupInformation?.pickup_person_name ? '!text-primary' : '')}
                        >
                            {t('checkout:pickupInformation:changePickupInformation')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <Typography>
                {t('checkout:pickupInformation:pickupAtLabel')}
            </Typography>
            <div className={cx(
                'border rounded-lg border-neutral-200',
                'max-w-lg p-4 mb-4',
            )}
            >
                <div className="flex flex-col gap-4">
                    {
                        (Object.keys(checkout.selectStore).length > 0) && (
                            <>
                                <Typography variant="bd-2" type="bold">
                                    {checkout.selectStore.name}
                                </Typography>
                                <Typography>
                                    {checkout.selectStore.street}
                                    <br />
                                    {checkout.selectStore.city}
                                    <br />
                                    {checkout.selectStore.region}
                                    <br />
                                    {checkout.selectStore.country_id}
                                    <br />
                                    {checkout.selectStore.postcode}
                                    <br />
                                    {checkout.selectStore.telephone}
                                </Typography>
                            </>
                        )
                    }
                    {
                        pickupStores.loading || !pickupStores.data ? (
                            <Skeleton width={270} height={30} />
                        ) : (
                            <Button
                                align="left"
                                variant="plain"
                                className="!p-0"
                                onClick={() => handleOpen('openModalSelectStore')}
                                disabled={
                                    formik.values.email !== '' && formik.values.email !== formik.values.oldEmail
                                }
                            >
                                <Typography
                                    variant="bd-3"
                                    className={cx('uppercase', (checkout.selectStore && checkout.selectStore.length) ? '!text-primary' : '')}
                                >
                                    {t('checkout:pickupInformation:changePickupLocation')}
                                </Typography>
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PickupInformation;
