import Skeleton from '@common_skeleton';

const SkeletonLoader = () => (
    <div className="flex flex-row gap-4">
        <div className="lg:basis-2/12 hidden-mobile">
            <Skeleton className="rounded-[50%]" height={540} width="100%" />
        </div>
        <div className="lg:basis-10/12 xs:basis-full sm:basis-full">
            <Skeleton className="rounded-[50%]" width="100%" height={40} style={{ marginBottom: 10 }} />
            <div className="flex flex-col gap-2">
                <Skeleton animation="wave" variant="text" width={120} height={25} />
                <Skeleton className="rounded-[50%]" width="100%" height={40} />
                <Skeleton animation="wave" variant="text" width={120} height={25} />
                <Skeleton className="rounded-[50%]" width="100%" height={40} />
            </div>
            <div className="mt-5 flex flex-col gap-2">
                <Skeleton animation="wave" variant="text" width="50%" height={30} />
                <div>
                    <Skeleton className="rounded-[50%]" width={105} height={105} />
                    <div className="flex flex-row gap-1">
                        <Skeleton animation="wave" variant="text" width={90} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <div className="flex-grow" />
                    </div>
                </div>
                <Skeleton animation="wave" variant="text" width="50%" height={30} />
                <div>
                    <Skeleton className="rounded-[50%]" width={105} height={105} />
                    <div className="flex flex-row gap-1">
                        <Skeleton animation="wave" variant="text" width={90} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <div className="flex-grow" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonLoader;
