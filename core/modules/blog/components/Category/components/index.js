import Button from '@common_button';
import Typography from '@common_typography';
import React from 'react';
import Router from 'next/router';
import Divider from '@common_divider';
import ModalContent from '@core_modules/blog/components/Category/components/ModalCategory';
import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import { modules } from '@config';

const ContentCategory = (props) => {
    const { t, data } = props;
    const desktop = breakPointsUp('sm');
    const [openModal, setOpenModal] = React.useState(false);
    const { link } = modules.blog;
    const handleClick = (item) => {
        Router.push(
            link.category.href,
            link.category.as + item.url_key,
        );
    };
    return (
        <>
            <ModalContent t={t} open={openModal} setOpen={() => setOpenModal(false)} {...props} />
            {
                desktop ? (
                    <div className="pt-[10px] pr-[20px] pb-[15px] pl-[30px]">
                        <Button variant="plain" className="mb-[20px] cursor-default">
                            <Typography className="uppercase hover:bg-none">
                                {t('blog:category')}
                            </Typography>
                        </Button>
                        {
                            data.map((item, key) => (
                                <Button
                                    variant="plain"
                                    onClick={() => handleClick(item)}
                                    key={key}
                                >

                                    <Typography className="text-center">
                                        {item.name}
                                    </Typography>
                                </Button>
                            ))
                        }
                        <Divider className="mt-[10px] ml-[10px]" />
                    </div>
                ) : (
                    <div className={classNames('flex flex-row justify-start items-center pr-[20px] w-auto', 'hidden-desktop')}>
                        <Button
                            variant="plain"
                            className="object-contain"
                            onClick={() => setOpenModal(true)}
                        >
                            <div className="menu" />
                        </Button>
                        <Typography className="font-bold uppercase">
                            {t('blog:category')}
                        </Typography>
                    </div>
                )
            }
        </>
    );
};

export default ContentCategory;
