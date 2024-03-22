/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Typography from '@common_typography';
import Show from '@common/Show';

const BrandItem = ({ group, children }) => (
    <div
        className={cx(
            'mt-[48px]',
        )}
    >
        <Typography
            className=""
            variant="h2"
        >
            {group}
        </Typography>
        <ul
            className={cx(
                'grid gap-3 mt-[12px]',
                'desktop:grid-cols-4',
                'tablet:grid-cols-3',
                'mobile:grid-cols-1',
            )}
        >
            {
                children.map((child, childIdx) => {
                    if (child.is_active !== 1) return null;
                    const hrefLink = child.category_url
                        ? child.category_url
                        : `/catalogsearch/result?q=${child.name}&brand=${child.name}`;
                    return (
                        <li key={childIdx}>
                            <Show when={child.attribute_id}>
                                <Link
                                    href={hrefLink}
                                >
                                    <Typography
                                        className=""
                                        variant="p1"
                                    >
                                        {child.name}
                                    </Typography>
                                </Link>
                            </Show>
                            <Show when={!child.attribute_id}>
                                <Typography
                                    className=""
                                    variant="p1"
                                >
                                    {child.name}
                                </Typography>
                            </Show>
                        </li>
                    );
                })
            }
        </ul>
    </div>
);

const AllBrands = (props) => {
    const { all } = props;
    const [selectedIndex, setSelectedIndex] = useState(-1);
    return (
        <div
            className={cx(
                'p-[24px_0] desktop:p-[8px_0]',
            )}
        >
            <ul
                className={cx(
                    'flex flex-wrap items-center justify-center',
                )}
            >
                <li
                    className={cx(
                        'w-[36px] h-[36px] text-[18px] m-[2px] cursor-pointer rounded-full relative',
                        'hover:bg-primary hover:text-[#fff] transition-all duration-[0.25s] ease-in-out',
                        selectedIndex === -1 && 'bg-primary text-[#fff]',
                    )}
                    onClick={() => setSelectedIndex(-1)}
                >
                    <span
                        className={cx(
                            'absolute top-[50%] left-[50%]',
                            'translate-x-[-50%] translate-y-[-50%]',
                        )}
                    >
                        #
                    </span>
                </li>
                {
                    all.map((brand, brandIdx) => (
                        <li
                            className={cx(
                                'w-[36px] h-[36px] text-[18px] m-[2px] cursor-pointer rounded-full relative',
                                'hover:bg-primary hover:text-[#fff] transition-all duration-[0.25s] ease-in-out',
                                selectedIndex === brandIdx && 'bg-primary text-[#fff]',
                            )}
                            onClick={() => setSelectedIndex(brandIdx)}
                        >
                            <span
                                className={cx(
                                    'absolute top-[50%] left-[50%]',
                                    'translate-x-[-50%] translate-y-[-50%]',
                                )}
                            >
                                {brand.group}
                            </span>
                        </li>
                    ))
                }
            </ul>
            <Show when={selectedIndex === -1}>
                {
                    all.map((brand, brandIdx) => (
                        <BrandItem {...brand} key={brandIdx} />
                    ))
                }
            </Show>
            <Show when={selectedIndex >= 0}>
                <BrandItem {...all[selectedIndex]} />
            </Show>
        </div>
    );
};

export default AllBrands;
