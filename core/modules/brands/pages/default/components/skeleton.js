import cx from 'classnames';
import Skeleton from '@common_skeleton';

const SkeletonBrands = () => (
    <div>
        <div className={cx('flex justify-center')}>
            <Skeleton width="160px" height={20} />
        </div>
        <div className={cx('mt-[16px]')}>
            <Skeleton width="100%" height={200} />
        </div>
        <div className={cx('flex justify-center mt-[42px]')}>
            <Skeleton width="90%" height={60} />
        </div>
        {
            Array(3).fill(0).map((_, idx) => (
                <div
                    className={cx(
                        'mt-[42px]',
                    )}
                    key={idx}
                >
                    <Skeleton width="50px" height={20} />
                    <Skeleton className="mt-[12px]" width="100%" height={200} />
                </div>
            ))
        }
    </div>
);

export default SkeletonBrands;
