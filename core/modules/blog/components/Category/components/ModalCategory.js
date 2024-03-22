import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import Router from 'next/router';
import { modules } from '@config';

const ModalCategory = (props) => {
    const {
        open, setOpen, data, t,
    } = props;
    const { link } = modules.blog;
    const handleClick = (item) => {
        Router.push(
            link.category.href,
            link.category.as + item.url_key,
        );
        setOpen();
    };
    return (
        <Dialog open={open}>
            <div className="container-modal-category">
                <div className="flex flex-col px-[80px] pt-[20px] pb-[80px]">
                    <div className="m-0 flex flex-col text-center">
                        <Button
                            variant="plain"
                            onClick={() => Router.push(link.default.href)}
                        >

                            <Typography className="font-semibold text-center">
                                {t('common:label:all')}
                            </Typography>
                        </Button>
                        {
                            data.map((item, key) => (
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
            </div>
        </Dialog>
    );
};

export default ModalCategory;
