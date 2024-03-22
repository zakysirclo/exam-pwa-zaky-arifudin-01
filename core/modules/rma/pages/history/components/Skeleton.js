/* eslint-disable jsx-a11y/control-has-associated-label */
import cx from 'classnames';
import Skeleton from '@common_skeleton';

export const SkeletonDesktop = () => (
    <>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={5}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={5}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={5}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
    </>
);

export const SkeletonMobile = () => (
    <>
        <div>
            <Skeleton width="100%" height={100} />
        </div>
        <div className={cx('mt-[12px]')}>
            <Skeleton width="100%" height={100} />
        </div>
        <div className={cx('mt-[12px]')}>
            <Skeleton width="100%" height={100} />
        </div>
    </>
);
