/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import cx from 'classnames';
import React from 'react';

import Skeleton from '@common_skeleton';
import Typography from '@common_typography';

import CheckIcon from '@heroicons/react/24/solid/CheckIcon';

const ViewSwitcherCurrency = (props) => {
    const { currencyState, setDefaultCurrency, loading, app_cookies, switcherContentActive, setSwitcherContentActive, setSwitcherContent } = props;
    const cookies_currency = app_cookies?.cookies_currency;

    const isEmptyCookiesCurrency = currencyState === undefined || currencyState === null;

    if (!loading && currencyState !== null) {
        if (currencyState.exchange_rates.length <= 1) {
            return null;
        }
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

    let finalDefaultCurrency = '';
    if (currencyState !== null) {
        finalDefaultCurrency = currencyState.default_display_currency_code;
    } else if (!isEmptyCookiesCurrency) {
        const currencyObject = JSON.parse(cookies_currency);
        finalDefaultCurrency = currencyObject.default_display_currency_code;
    }

    if (!loading && !isEmptyCookiesCurrency) {
        return (
            <>
                {!switcherContentActive && (
                    <div
                        className={cx('flex', 'justify-between', 'items-center', 'hover:cursor-pointer')}
                        onClick={() => {
                            setSwitcherContentActive(true);
                            const content = () => (
                                <>
                                    {currencyState !== null &&
                                        currencyState.exchange_rates.map((currency_item, index) => {
                                            const { currency_to } = currency_item;
                                            const currency_default = currencyState === null ? '' : currencyState.default_display_currency_code;
                                            const isCurrent = currency_to === currency_default;
                                            const default_display_currency_code = currency_to;
                                            const default_currency_rate = currency_item.rate;
                                            if (index === 0) {
                                                return (
                                                    <>
                                                        <div
                                                            className={cx('py-2', 'px-4', 'bg-neutral-100')}
                                                            onClick={() => {
                                                                setSwitcherContentActive(false);
                                                                setSwitcherContent(null);
                                                            }}
                                                            key={index}
                                                        >
                                                            <div
                                                                className={cx('hover:cursor-pointer')}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: `<span>${chevronLeft}</span><span class="font-medium text-base leading-[20px]">Currency</span>`,
                                                                }}
                                                            />
                                                        </div>
                                                        <>
                                                            {isCurrent ? (
                                                                <div
                                                                    className={cx('py-2', 'px-4', 'flex', 'justify-between', 'hover:cursor-pointer')}
                                                                    onClick={() => {
                                                                        setDefaultCurrency({
                                                                            default_display_currency_code,
                                                                            default_currency_rate,
                                                                        });
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    <Typography className="font-semibold">{`${currency_to}`}</Typography>
                                                                    <CheckIcon className={cx('h-5 w-5')} />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={cx('py-2', 'px-4', 'hover:cursor-pointer')}
                                                                    onClick={() => {
                                                                        setDefaultCurrency({
                                                                            default_display_currency_code,
                                                                            default_currency_rate,
                                                                        });
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    <Typography>{`${currency_to}`}</Typography>
                                                                </div>
                                                            )}
                                                        </>
                                                    </>
                                                );
                                            }
                                            return (
                                                <div
                                                    className={cx('py-2', 'px-4', 'hover:cursor-pointer')}
                                                    onClick={() => {
                                                        setDefaultCurrency({
                                                            default_display_currency_code,
                                                            default_currency_rate,
                                                        });
                                                    }}
                                                    key={index}
                                                >
                                                    <Typography>{`${currency_to}`}</Typography>
                                                </div>
                                            );
                                        })}
                                </>
                            );
                            setSwitcherContent(content);
                        }}
                    >
                        <div className={cx('pt-4', 'px-4')}>
                            <Typography>{`${finalDefaultCurrency}`}</Typography>
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

export default ViewSwitcherCurrency;
