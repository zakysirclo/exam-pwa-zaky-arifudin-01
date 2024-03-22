/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import CheckBox from '@common_forms/CheckBox';
import Skeleton from '@common_skeleton';
import Dialog from '@common_dialog';

const ConfirmationView = ({
    t, loading, agreements, checkList, modalList, handleCheckbox, handleOpenModal, handleCloseModal,
}) => {
    const Loader = () => (
        <div className="flex flex-col py-5 w-full">
            <Skeleton width="40%" height={35} />
            <Skeleton width="80%" height={30} />
            <Skeleton width="80%" height={30} />
        </div>
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {
                agreements && agreements.checkoutAgreements.map((item, index) => (
                    <div className="flex flex-col py-5 w-full checkoutAgreements" key={index}>
                        <div className="flex flex-col agreement-row">
                            <div>
                                {
                                    item.mode === 'MANUAL' ? (
                                        <CheckBox
                                            variant="single"
                                            checked={(checkList.length === 0) ? false : checkList[index].isChecked}
                                            onChange={() => handleCheckbox(index)}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            color="primary"
                                            size="small"
                                        />
                                    )
                                        : (
                                            <CheckBox
                                                variant="single"
                                                disabled
                                                checked
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                color="primary"
                                                size="small"
                                            />
                                        )
                                }
                                <Button onClick={() => handleOpenModal(index)}>
                                    <Typography
                                        variant="p-3"
                                        className="underline"
                                    >
                                        {item.checkbox_text}
                                    </Typography>
                                </Button>
                                <Dialog
                                    onClose={() => handleCloseModal(index)}
                                    open={modalList.length && modalList[index].isOpen}
                                    title={item.name}
                                    content={(
                                        <div className="flex flex-col gap-4 border-t border-t-neutral-200">
                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                            <Button
                                                variant="contained"
                                                onClick={() => handleCloseModal(index)}
                                                color="primary"
                                            >
                                                {t('checkout:close')}
                                            </Button>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default ConfirmationView;
