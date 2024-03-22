import Skeleton from '@common_skeleton';

const SkeletonLoader = () => (
    <div className="flex flex-col">
        <Skeleton variant="text" animation="wave" width="45%" height={20} />
        <Skeleton variant="rect" animation="wave" width="100%" height={50} style={{ marginBottom: 10 }} />
        <Skeleton variant="text" animation="wave" width="45%" height={20} />
        <Skeleton variant="rect" animation="wave" width="100%" height={50} style={{ marginBottom: 10 }} />
        <Skeleton variant="text" animation="wave" width="45%" height={20} />
        <Skeleton variant="rect" animation="wave" width="100%" height={50} style={{ marginBottom: 10 }} />
        <Skeleton variant="text" animation="wave" width="45%" height={20} />
        <Skeleton variant="rect" animation="wave" width="100%" height={50} style={{ marginBottom: 10 }} />
        <Skeleton variant="text" animation="wave" width="45%" height={20} />
        <Skeleton variant="rect" animation="wave" width="100%" height={50} style={{ marginBottom: 10 }} />
        <Skeleton variant="text" animation="wave" width="45%" height={20} />
        <Skeleton variant="rect" animation="wave" width="100%" height={50} style={{ marginBottom: 10 }} />
    </div>
);

export default SkeletonLoader;
