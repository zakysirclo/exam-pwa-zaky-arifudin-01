import Skeleton from '@common_skeleton';

const SkeletonLoader = () => (
    <div className="skeleton-loader">
        <Skeleton width="60%" height={35} />
        <Skeleton width="70%" height={35} />
        <Skeleton width="90%" height={20} />
        <Skeleton width="70%" height={20} />

        <div className="skeleton-btn-continue">
            <span>
                <Skeleton className="rounded-[50%]" width="100%" height={35} />
            </span>
        </div>
    </div>
);

export default SkeletonLoader;
