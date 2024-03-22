/* eslint-disable consistent-return */
import Dialog from '@common_dialog';
import React from 'react';
import Typography from '@common_typography';
import Skeleton from '@common_skeleton';
import Button from '@common_button';
import Router from 'next/router';
import { modules } from '@config';

const CategoryWrapperSkeleteon = () => {
    const SkeletonRect = ({ width }) => (
        <Skeleton
            className="self-center mb-[32px]"
            width={width}
            height={16}
        />
    );
    return (
        <div className="w-full mt-[36px]">
            <div className="grid items-center">
                {[100, 60, 180, 65, 150, 70, 80, 175, 70, 55, 115, 60, 155].map((width, i) => (
                    <SkeletonRect key={i} width={width} />
                ))}
            </div>
        </div>
    );
};

const ListCategory = ({ setOpen, t, loadCategory }) => {
    const { loading, error, data } = loadCategory;
    const { link } = modules.blog;
    if (loading) return <CategoryWrapperSkeleteon />;
    if (error) {
        return (
            <div className="alert-danger-container">
                <div className="m-15 p-2 bg-red-600 text-neutral-white">{t('commong:error:fetchError')}</div>
            </div>
        );
    }
    if (!data || data.getBlogCategory.data.length === 0) {
        return (
            <div className="alert-warning-container">
                <div className="m-15 p-2 bg-yellow-500 text-neutral-white">{t('common:error:notFound')}</div>
            </div>
        );
    }
    if (!loading && data && data.getBlogCategory.data.length > 0) {
        const handleClick = (item) => {
            Router.push(
                link.category.href,
                link.category.as + item.url_key,
            );
            setOpen();
        };
        return (
            <div className="flex flex-col justify-center items-center px-[80px] pt-[20px] pb-[80px]">
                <div className="m-0 flex flex-col justify-center items-center">
                    <Button
                        variant="plain"
                        onClick={() => Router.push(link.default.href)}
                    >
                        <Typography className="font-semibold items-center">
                            {t('common:label:all')}
                        </Typography>
                    </Button>
                    {
                        data.getBlogCategory.data.map((item, key) => (
                            <Button
                                variant="plain"
                                onClick={() => handleClick(item)}
                                key={key}
                            >
                                <Typography className="font-semibold text-center">
                                    {item.name}
                                </Typography>
                            </Button>
                        ))
                    }
                </div>
            </div>
        );
    }
};

const ModalContent = ({
    open, setOpen, t, ...other
}) => (
    <Dialog open={open}>
        <div className="modal-content-container">
            {
                open && (<ListCategory setOpen={setOpen} t={t} {...other} />)
            }
        </div>
    </Dialog>
);

const ModalCategory = ({ t, ...other }) => {
    const [openModal, setOpenModal] = React.useState(false);
    return (
        <>
            <ModalContent t={t} open={openModal} setOpen={() => setOpenModal(false)} {...other} />
            <div className="flex flex-row justify-start items-center pr-[20px] w-auto">
                <Button variant="plain" className="object-contain" onClick={() => setOpenModal(true)}>
                    <div className="menu" />
                </Button>
                <Typography className="font-bold first-letter:uppercase">
                    {t('common:title:category')}
                </Typography>
            </div>
        </>
    );
};

export default ModalCategory;
