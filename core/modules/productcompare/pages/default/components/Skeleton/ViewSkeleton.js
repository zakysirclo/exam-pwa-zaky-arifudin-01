import Skeleton from '@common_skeleton';

const SkeletonView = () => (
    <div>
        <Skeleton variant="rect" width="60%" height={40} style={{ marginBottom: 20 }} />
        {
            [1, 2].map((i) => (
                <div className="flex flex-row" key={i} style={{ marginBottom: 15 }}>
                    <div className="xs:basis-full">
                        <Skeleton variant="rect" width="100%" height={150} />
                    </div>
                </div>
            ))
        }
    </div>
);

export default SkeletonView;
