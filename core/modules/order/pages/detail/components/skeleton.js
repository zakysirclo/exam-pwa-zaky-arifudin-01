import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonLoader = () => (
    <>
        <div className={cx('flex', 'flex-col', 'gap-y-5')}>
            <Skeleton className={cx('mobile:max-tablet:!hidden', 'tablet:!w-[120px]', '!rounded-lg')} />
            <Skeleton
                className={cx(
                    'tablet:max-desktop:mt-5',
                    'mobile:max-tablet:!w-full',
                    'tablet:!w-[430px]',
                    'mobile:!h-[56px]',
                    '!rounded-lg',
                    'mobile:max-tablet:!mt-4',
                )}
            />
            <Skeleton
                className={cx(
                    'mobile:max-desktop:!w-full',
                    'tablet:max-desktop:max-w-[720px]',
                    'desktop:!w-[896px]',
                    'mobile:!h-[160px]',
                    '!rounded-lg',
                )}
            />
            <Skeleton
                className={cx(
                    'mobile:max-desktop:!w-full',
                    'tablet:max-desktop:max-w-[720px]',
                    'desktop:!w-[896px]',
                    'mobile:!h-[524px]',
                    'desktop:!h-[320px]',
                    '!rounded-lg',
                )}
            />
        </div>
    </>
);

export default SkeletonLoader;
