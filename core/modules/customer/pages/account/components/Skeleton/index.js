/* eslint-disable max-len */
import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonLoader = () => (
    <>
        <div className={cx('flex', 'flex-row', 'tablet:border-t-[1px]', 'tablet:border-neutral-200', 'tablet:mt-3')}>
            <div className="mobile:max-desktop:basis-full desktop:basis-10/12 pt-5">
                <Skeleton
                    animation="wave"
                    variant="rect"
                    height={240}
                    className={cx('my-4', 'mobile:max-tablet:!w-full', 'tablet:max-desktop:!w-full', 'desktop:!w-[887px]')}
                />
                <Skeleton
                    animation="wave"
                    variant="rect"
                    height={240}
                    className={cx('my-4', 'mobile:max-tablet:!w-full', 'tablet:max-desktop:!w-full', 'desktop:!w-[887px]')}
                />
                <Skeleton
                    animation="wave"
                    variant="rect"
                    height={240}
                    className={cx('my-4', 'mobile:max-tablet:!w-full', 'tablet:max-desktop:!w-full', 'desktop:!w-[887px]')}
                />
            </div>
        </div>
    </>
);

export default SkeletonLoader;
