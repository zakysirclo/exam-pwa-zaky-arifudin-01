/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Typography from '@common_typography/index';
import useMediaQuery from '@hook/useMediaQuery';
import cx from 'classnames';
import { HomeIcon } from '@heroicons/react/20/solid';
import { COLORS } from '@theme_vars';
import { setResolver, getResolver } from '@helper_localstorage';
import { createExcerpt } from '@helper_text';

const handleClick = async (url, id) => {
    if (id) {
        const urlResolver = getResolver();
        urlResolver[url] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);
    }
};

const ItemBreadcrumb = ({
    icon,
    iconOnly,
    id,
    url,
    label,
    labelStyle,
    seperate,
}) => {
    const { isMobile } = useMediaQuery();
    return (
        <div className={cx(
            'swift-section-breadcrumb-item',
            'flex',
            'items-center',
        )}
        >

            <Link href={url} onClick={() => handleClick(url, id)}>
                <Typography
                    variant="bd-2b"
                    style={labelStyle}
                    className={cx('text-sm', 'whitespace-nowrap', 'flex', 'items-center', '!text-neutral-400')}
                >
                    {iconOnly && icon }
                    {!iconOnly && isMobile ? createExcerpt(label, 40) : label}
                </Typography>
            </Link>
            {
                seperate && <Typography variant="bd-2b" className="mx-[10px]" color="text-neutral-400">/</Typography>
            }
        </div>
    );
};

const Breadcrumb = ({
    data = [],
    iconHomeOnly,
    withHome = true,
    className,
}) => (
    <div className={cx(
        'swift-section-breadcrumb',
        'flex',
        'items-center',
        'mb-[10px]',
        'overflow-x-auto',
        className,
    )}
    >
        {
            withHome && (
                <ItemBreadcrumb
                    iconOnly={iconHomeOnly}
                    key="breadcrumb-home"
                    icon={<HomeIcon className="h-[18px] w-[18px] text-neutral-400" />}
                    url="/"
                    seperate={data?.length > 0}
                />
            )
        }
        {
            data && data.map((item, index) => {
                const isActive = item?.active || false;
                return (
                    <ItemBreadcrumb
                        key={`breadcrumb-${index}-${item?.id}`}
                        id={item?.id}
                        url={item?.link}
                        label={item?.label}
                        labelStyle={isActive ? { color: COLORS.neutral[600] } : { color: COLORS.neutral[400] }}
                        seperate={!isActive}
                    />
                );
            })
        }
    </div>
);

export default Breadcrumb;
