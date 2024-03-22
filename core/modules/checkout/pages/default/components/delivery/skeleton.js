import Skeleton from '@common_skeleton';

const SkeletonDelivery = () => (
    <div className="border-b border-b-neutral-200">
        <Skeleton width="60%" height={30} />
        <Skeleton className="rounded-[50%]" width="90%" height={70} />
    </div>
);

export default SkeletonDelivery;
