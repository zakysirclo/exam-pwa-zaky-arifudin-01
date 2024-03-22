import Button from '@common_button';
import Dialog from '@common_dialog';
import Skeleton from '@common_skeleton';
import Radio from '@common_forms/Radio';
import Add from '@heroicons/react/24/outline/PlusIcon';
import AddressFormDialog from '@plugin_addressform';
import Typography from '@common_typography';
import ItemAddress from '@core_modules/checkout/pages/default/components/ItemModalAddress';

const Loader = () => (
    <div className="flex flex-col gap-4 w-full">
        {[1, 2, 3, 4].map((key) => (
            <Skeleton variant="rect" width="100%" height={118} key={key} />
        ))}
    </div>
);

const AddressView = (props) => {
    const {
        t, open, setOpen, loading, success,
        address, handleAddress, selectedAddressId, loadingAddress,
        handleChange, handleCloseDiff, handleOpenNew, openNew, typeAddress, dataEdit,
        updateAddress, manageCustomer, refetchAddress,
    } = props;

    const getItemAddress = () => {
        let content;
        if (loading) {
            content = <Loader />;
        } else if (!address) {
            content = <Loader />;
        } else if (address.length === 0) {
            content = null;
        } else {
            content = (
                <Radio
                    data={address}
                    CustomItem={ItemAddress}
                    onChange={(e) => handleChange(e)}
                    customItemProps={{
                        t,
                        manageCustomer,
                        loadingAddress,
                        success,
                        handleOpenNew,
                        updateAddress,
                        handleCloseDiff,
                        selectedAddressId,
                        refetchAddress,
                        handleChange,
                    }}
                    classNames={{
                        radioGroupClasses: 'gap-5',
                    }}
                />
            );
        }

        return content;
    };

    return (
        <>
            <AddressFormDialog
                {...props}
                open={openNew}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => handleOpenNew(typeAddress)}
                pageTitle={typeAddress === 'new' ? t('customer:address:addTitle') : t('customer:address:editTitle')}
                {...dataEdit}
            />
            <Dialog
                open={open}
                title={t('customer:address:pageTitle')}
                onClickCloseTitle={() => setOpen(false)}
                useCloseTitleButton
                onClose={() => setOpen(false)}
                classContent="!px-0 border-t border-t-[2px] border-t-neutral-200"
                content={(
                    <div className="flex flex-col" id="checkoutListAddress">
                        <div className="overflow-y-auto tablet:h-[80vh]">
                            {getItemAddress()}
                        </div>
                        <div className="w-full flex flex-row items-center justify-center">
                            <Button
                                variant="outlined"
                                size="sm"
                                onClick={() => handleOpenNew('new')}
                            >
                                <Typography variant="bd-2" letter="uppercase" type="bold">
                                    {t('customer:address:addTitle')}
                                </Typography>
                                <Add className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            />
        </>
    );
};

export default AddressView;
