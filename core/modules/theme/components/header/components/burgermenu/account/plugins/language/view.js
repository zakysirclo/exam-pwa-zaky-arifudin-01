/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames';
import React from 'react';

import Skeleton from '@common_skeleton';
import Typography from '@common_typography';

const ViewSwitcherLanguage = (props) => {
    const { dataLang, lang, onClickLanguage, loadDataLang, switcherContentActive, setSwitcherContentActive, setSwitcherContent } = props;

    const listDataLanguage = [];

    if (dataLang !== undefined) {
        dataLang.map((item) => {
            listDataLanguage.push(item);
            return item;
        });
    }

    const chevronLeft = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block relative right-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    `;

    const ChevronRight = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline-block relative right-0 hover:cursor-pointer"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );

    if (!loadDataLang && dataLang !== undefined) {
        return (
            <>
                {!switcherContentActive && (
                    <div
                        className={cx('flex', 'justify-between', 'items-center', 'hover:cursor-pointer')}
                        onClick={() => {
                            setSwitcherContentActive(true);
                            const content = () => (
                                <>
                                    {listDataLanguage.map((language_item, index) => {
                                        if (index === 0) {
                                            return (
                                                <>
                                                    <div
                                                        className={cx('py-2', 'px-4', 'bg-neutral-100', 'hover:cursor-pointer')}
                                                        onClick={() => {
                                                            setSwitcherContentActive(false);
                                                            setSwitcherContent(null);
                                                        }}
                                                        key={index}
                                                    >
                                                        <div
                                                            className={cx('hover:cursor-pointer')}
                                                            dangerouslySetInnerHTML={{
                                                                __html: `<span>${chevronLeft}</span><span class="font-medium text-base leading-[18px]">Language</span>`,
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className={cx('py-2', 'px-4', 'hover:cursor-pointer')}
                                                        onClick={() => onClickLanguage({ item: language_item })}
                                                        key={index}
                                                    >
                                                        <Typography>{language_item.label}</Typography>
                                                    </div>
                                                </>
                                            );
                                        }
                                        return (
                                            <div
                                                className={cx('py-2', 'px-4', 'hover:cursor-pointer')}
                                                onClick={() => onClickLanguage({ item: language_item })}
                                                key={index}
                                            >
                                                <Typography>{language_item.label}</Typography>
                                            </div>
                                        );
                                    })}
                                </>
                            );
                            setSwitcherContent(content);
                        }}
                    >
                        <div className={cx('pt-4', 'px-4')}>
                            <Typography>{lang?.label}</Typography>
                        </div>
                        <div className={cx('pt-4')}>
                            <ChevronRight />
                        </div>
                    </div>
                )}
            </>
        );
    }

    return <Skeleton width={128} />;
};

export default ViewSwitcherLanguage;
