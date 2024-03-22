import cx from 'classnames';
import React from 'react';

import Button from '@common_button';
import Popover from '@common_popover';
import Skeleton from '@common_skeleton';
import Typography from '@common_typography';

import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';

const ViewSwitcherLanguage = (props) => {
    const {
        open, setOpen, dataLang, lang, onClickLanguage, loadDataLang, CustomButton,
    } = props;

    const listDataLanguage = [];

    if (dataLang !== undefined) {
        dataLang.map((item) => {
            listDataLanguage.push(item);
            return item;
        });
    }

    const PopoverContent = () => (
        <ul className={cx('currency-list__wrapper')}>
            {listDataLanguage !== null
                && listDataLanguage.length > 0
                && listDataLanguage.map((language_item, index) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <li
                        key={`language-${index}`}
                        className={cx('language-list__item', 'py-2', 'px-2', 'text-center', 'hover:cursor-pointer', 'hover:bg-neutral-100', 'group')}
                        onClick={() => onClickLanguage({ item: language_item })}
                    >
                        <Typography className={cx('currency-list__text', 'group-hover:text-primary-700')}>{language_item.label}</Typography>
                    </li>
                ))}
        </ul>
    );

    if (!loadDataLang && dataLang !== undefined) {
        return (
            <Popover
                content={<PopoverContent />}
                open={open}
                setOpen={setOpen}
                className={cx('top-[100%]', 'p-0')}
                wrapperClassName={cx('self-end')}
                wrapperId="top-header__content--currency-language-changer-menu__language-switcher"
            >
                {
                    React.isValidElement(CustomButton)
                        ? React.cloneElement(CustomButton, {
                            onClick: () => setOpen(!open),
                            icon: <ChevronDownIcon />,
                            children: <Typography className={cx('group-hover:text-primary-700')}>{lang?.label}</Typography>,
                            iconPosition: 'right',
                            iconProps: { className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]', 'group-hover:text-primary-700') },
                            classNameText: cx('!text-neutral-700'),
                        })
                        : (
                            <Button
                                className={cx(
                                    'm-2',
                                    'mr-0',
                                    '!px-0',
                                    '!py-0',
                                    'hover:shadow-none',
                                    'focus:shadow-none',
                                    'active:shadow-none',
                                    'active:shadow-none',
                                    'group',
                                    'swift-language-switcher',
                                )}
                                onClick={() => setOpen(!open)}
                                icon={<ChevronDownIcon />}
                                iconProps={{ className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]', 'group-hover:text-primary-700') }}
                                iconPosition="right"
                                variant="tertiary"
                                classNameText={cx('!text-neutral-700')}
                            >
                                <Typography className={cx('group-hover:text-primary-700')}>{lang?.label}</Typography>
                            </Button>
                        )
                }
            </Popover>
        );
    }

    return <Skeleton width={128} />;
};

export default ViewSwitcherLanguage;
