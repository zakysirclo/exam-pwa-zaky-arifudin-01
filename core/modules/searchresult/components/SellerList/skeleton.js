import Skeleton from '@common/Skeleton';

const SkeletonSeller = () => (
    <div className="flex flex-row mt-3 gap-3">
        <div className="flex">
            <Skeleton width={50} height={55} />
        </div>
        <div className="flex flex-col gap-1">
            <Skeleton width={150} height={25} />
            <Skeleton width={150} height={20} />
        </div>
    </div>
);

export default SkeletonSeller;
