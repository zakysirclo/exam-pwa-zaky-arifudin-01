import Typography from '@common_typography';
import React from 'react';
import Button from '@common_button';

const Footer = ({
    cancelButton,
    updateButton,
    updateStatusButton,
    detail_rma,
    t,
    confirmCancel,
    handleUpdate,
    actionUpdateStatus,
}) => {
    let UpdateStatusButton = () => null;
    let UpdateButton = () => null;
    let CancelButton = () => null;

    if (cancelButton) {
        CancelButton = () => (
            <Button className="w-full" classNameText="justify-center" variant="outlined" onClick={confirmCancel}>
                <Typography variant="span" type="bold" letter="uppercase">{t('rma:view:cancelButton')}</Typography>
            </Button>
        );
    }
    if (updateButton) {
        UpdateButton = () => (
            <Button className="w-full" classNameText="justify-center" variant="outlined" onClick={() => handleUpdate()}>
                <Typography variant="span" type="bold" letter="uppercase">{t('rma:view:updateButton')}</Typography>
            </Button>
        );
    }
    if (updateStatusButton) {
        UpdateStatusButton = () => (
            <>
                <a href={detail_rma.confirm_shipping.print_label_url} download className="">
                    <Button className="w-full" classNameText="justify-center" variant="outlined">
                        <Typography variant="span" type="bold" letter="uppercase">{t('rma:view:printLabel')}</Typography>
                    </Button>
                </a>
                <Button className="w-full" classNameText="justify-center" variant="outlined" onClick={actionUpdateStatus}>
                    <Typography variant="span" type="bold" letter="uppercase">{t('rma:view:confirmShipping')}</Typography>
                </Button>
            </>
        );
    }

    return (
        <div className="flex flex-col tablet:flex-row items-center gap-3 desktop:max-w-[50%] mt-4">
            { UpdateButton() }
            { CancelButton() }
            { UpdateStatusButton() }
        </div>
    );
};

export default Footer;
