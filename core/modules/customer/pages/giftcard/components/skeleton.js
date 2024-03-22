import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonProductReview = () => (
    <>
        <div className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <Skeleton width="100%" height={30} />
        </div>
        <div className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <Skeleton width="100%" height={30} />
        </div>
        <div className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <Skeleton width="100%" height={30} />
        </div>
    </>
);
export default SkeletonProductReview;
