/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cx from 'classnames';
import Link from 'next/link';

import Typography from '@common_typography';
import genereateCmsMenu from '@core_modules/theme/components/header/components/v1/genereateCmsMenu';

const BurgerMenuCategories = (props) => {
    const { data = [], cmsMenu } = props;

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
    const [activeSubMenu, setActiveSubMenu] = React.useState(false);
    const [activeSubMenuIndex, setActiveSubMenuIndex] = React.useState(0);
    const [activeSubMenuLv1, setActiveSubMenuLv1] = React.useState(false);
    const [activeSubMenuLv1Index, setActiveSubMenuLv1Index] = React.useState(0);
    const [activeSubMenuLv2, setActiveSubMenuLv2] = React.useState(false);
    const [activeSubMenuLv2Index, setActiveSubMenuLv2Index] = React.useState(0);

    let cmsMenuList = [];

    if (cmsMenu) {
        cmsMenuList = genereateCmsMenu(cmsMenu);
    }

    const mergeData = [...data, ...cmsMenuList];

    return (
        <div className={cx('p-4')}>
            <div className={cx('grid', 'grid-cols-1')}>
                {!activeSubMenu &&
                    mergeData.map((categories, index) => (
                        <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4')} key={index}>
                            {categories.children.length > 0 ? (
                                <div className={cx('flex', 'justify-between', 'items-center')}>
                                    <Link href={`/${categories.url_path}`} prefetch={false}>
                                        <div className={cx('font-medium', 'text-base', 'leading-[18px]', 'hover:cursor-pointer')}>
                                            {categories.name}
                                        </div>
                                    </Link>
                                    <div
                                        onClick={() => {
                                            setActiveSubMenu(true);
                                            setActiveSubMenuIndex(index);
                                        }}
                                    >
                                        <ChevronRight />
                                    </div>
                                </div>
                            ) : (
                                <Link href={`/${categories.url_path}`} prefetch={false}>
                                    <Typography className={cx('font-medium', 'text-base', 'leading-[18px]', 'hover:cursor-pointer')}>
                                        {categories.name}
                                    </Typography>
                                </Link>
                            )}
                        </div>
                    ))}
                {activeSubMenu &&
                    !activeSubMenuLv1 &&
                    !activeSubMenuLv2 &&
                    mergeData[activeSubMenuIndex].children.map((categories, index) => {
                        if (index === 0) {
                            return (
                                <>
                                    <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4', 'bg-neutral-100')}>
                                        <div
                                            className={cx('hover:cursor-pointer')}
                                            onClick={() => {
                                                setActiveSubMenu(false);
                                                setActiveSubMenuIndex(0);
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: `<span>${chevronLeft}</span><span class="font-medium text-base leading-[18px]">${mergeData[activeSubMenuIndex].name}</span>`,
                                            }}
                                        />
                                    </div>
                                    <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4')} key={index}>
                                        {categories.children.length > 0 ? (
                                            <div className={cx('flex', 'justify-between', 'items-center')}>
                                                <Link href={`/${categories.url_path}`} prefetch={false}>
                                                    <div className={cx('font-medium', 'text-base', 'leading-[18px]', 'hover:cursor-pointer')}>
                                                        {categories.name}
                                                    </div>
                                                </Link>
                                                <div
                                                    onClick={() => {
                                                        setActiveSubMenuLv1(true);
                                                        setActiveSubMenuLv1Index(index);
                                                    }}
                                                >
                                                    <ChevronRight />
                                                </div>
                                            </div>
                                        ) : (
                                            <Link href={`/${categories.url_path}`} prefetch={false}>
                                                <Typography className={cx('font-medium', 'text-base', 'leading-5')}>{categories.name}</Typography>
                                            </Link>
                                        )}
                                    </div>
                                </>
                            );
                        }
                        return (
                            <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4')} key={index}>
                                {categories.children.length > 0 ? (
                                    <div className={cx('flex', 'justify-between', 'items-center')}>
                                        <Link href={`/${categories.url_path}`} prefetch={false}>
                                            <div className={cx('font-medium', 'text-base', 'leading-[18px]', 'hover:cursor-pointer')}>
                                                {categories.name}
                                            </div>
                                        </Link>
                                        <div
                                            onClick={() => {
                                                setActiveSubMenuLv1(true);
                                                setActiveSubMenuLv1Index(index);
                                            }}
                                        >
                                            <ChevronRight />
                                        </div>
                                    </div>
                                ) : (
                                    <Link href={`/${categories.url_path}`} prefetch={false}>
                                        <Typography className={cx('font-medium', 'text-base', 'leading-5')}>{categories.name}</Typography>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                {activeSubMenuLv1 &&
                    !activeSubMenuLv2 &&
                    mergeData[activeSubMenuIndex].children[activeSubMenuLv1Index].children.map((categories, index) => {
                        if (index === 0) {
                            return (
                                <>
                                    <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4', 'bg-neutral-100')}>
                                        <div
                                            className={cx('hover:cursor-pointer')}
                                            onClick={() => {
                                                setActiveSubMenuLv1(false);
                                                setActiveSubMenuLv1Index(0);
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: `<span>${chevronLeft}</span><span class="font-medium text-base leading-[18px]">${mergeData[activeSubMenuIndex].name} / ${mergeData[activeSubMenuIndex].children[activeSubMenuLv1Index].name}</span>`,
                                            }}
                                        />
                                    </div>
                                    <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4')} key={index}>
                                        {categories.children.length > 0 ? (
                                            <div className={cx('flex', 'justify-between', 'items-center')}>
                                                <Link href={`/${categories.url_path}`} prefetch={false}>
                                                    <div className={cx('font-medium', 'text-base', 'leading-[18px]', 'hover:cursor-pointer')}>
                                                        {categories.name}
                                                    </div>
                                                </Link>
                                                <div
                                                    onClick={() => {
                                                        setActiveSubMenuLv2(true);
                                                        setActiveSubMenuLv2Index(index);
                                                    }}
                                                >
                                                    <ChevronRight />
                                                </div>
                                            </div>
                                        ) : (
                                            <Link href={`/${categories.url_path}`} prefetch={false}>
                                                <Typography className={cx('font-medium', 'text-base', 'leading-5')}>{categories.name}</Typography>
                                            </Link>
                                        )}
                                    </div>
                                </>
                            );
                        }
                        return (
                            <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4')} key={index}>
                                {categories.children.length > 0 ? (
                                    <div className={cx('flex', 'justify-between', 'items-center')}>
                                        <Link href={`/${categories.url_path}`} prefetch={false}>
                                            <div className={cx('font-medium', 'text-base', 'leading-[18px]', 'hover:cursor-pointer')}>
                                                {categories.name}
                                            </div>
                                        </Link>
                                        <div
                                            onClick={() => {
                                                setActiveSubMenuLv2(true);
                                                setActiveSubMenuLv2Index(index);
                                            }}
                                        >
                                            <ChevronRight />
                                        </div>
                                    </div>
                                ) : (
                                    <Link href={`/${categories.url_path}`} prefetch={false}>
                                        <Typography className={cx('font-medium', 'text-base', 'leading-5')}>{categories.name}</Typography>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                {activeSubMenuLv2 &&
                    mergeData[activeSubMenuIndex].children[activeSubMenuLv1Index].children[activeSubMenuLv2Index].children.map((categories, index) => {
                        if (index === 0) {
                            return (
                                <>
                                    <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4', 'bg-neutral-100')}>
                                        <div
                                            className={cx('hover:cursor-pointer')}
                                            onClick={() => {
                                                setActiveSubMenuLv2(false);
                                                setActiveSubMenuLv2Index(0);
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: `<span>${chevronLeft}</span><span class="font-medium text-base leading-[18px]">${mergeData[activeSubMenuIndex].name} / ${mergeData[activeSubMenuIndex].children[activeSubMenuLv1Index].name} / ${mergeData[activeSubMenuIndex].children[activeSubMenuLv1Index].children[activeSubMenuLv2Index].name}</span>`,
                                            }}
                                        />
                                    </div>
                                    <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4')} key={index}>
                                        <Link href={`/${categories.url_path}`} prefetch={false}>
                                            <Typography className={cx('font-medium', 'text-base', 'leading-5')}>{categories.name}</Typography>
                                        </Link>
                                    </div>
                                </>
                            );
                        }
                        return (
                            <div className={cx('border-b-[1px]', 'border-neutral-100', 'py-3', 'px-4')} key={index}>
                                <Link href={`/${categories.url_path}`} prefetch={false}>
                                    <Typography className={cx('font-medium', 'text-base', 'leading-5')}>{categories.name}</Typography>
                                </Link>
                            </div>
                        );
                    })}
                <div className={cx('py-6', 'px-4')} />
            </div>
        </div>
    );
};

export default BurgerMenuCategories;
