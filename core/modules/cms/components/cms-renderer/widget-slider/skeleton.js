import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonWidgetSlider = () => (
    <>
        <div className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <Skeleton width="100%" height={300} />
        </div>
    </>
);
export default SkeletonWidgetSlider;
