/* eslint-disable jsx-a11y/control-has-associated-label */
import Skeleton from '@common_skeleton';

import cx from 'classnames';

export const SkeletonTable = () => {
    const data = [1, 2, 3];

    return (
        <>
            {data.map((item, index) => (
                <tr
                    className={cx('mobile:max-desktop:hidden', {
                        'bg-white': index % 2 === 1,
                        'bg-neutral-50': index % 2 !== 1,
                    })}
                    key={index}
                >
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                </tr>
            ))}
        </>
    );
};

export const SkeletonMobile = () => {
    const SkeletonData = [1, 2, 3];
    return (
        <div className={cx('desktop:hidden')}>
            {SkeletonData.map((item) => (
                <div style={{ marginBottom: 30 }} key={item}>
                    <Skeleton className={cx('!w-full', 'mobile:!h-[240px]')} />
                </div>
            ))}
        </div>
    );
};

export default {
    SkeletonTable,
    SkeletonMobile,
};
