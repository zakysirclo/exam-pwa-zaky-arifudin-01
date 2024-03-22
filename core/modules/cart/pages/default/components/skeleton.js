import Skeleton from '@common_skeleton';

const SkeletonCart = () => (
    <>
        <div className="flex desktop:hidden">
            <div className="w-full h-full flex flex-col px-[18px] mb-[50px]">
                <Skeleton className="rounded-[50%] mb-5" width="100%" height={40} />
                {
                    [1, 2, 3, 4].map((i) => (
                        <div className="flex flex-row gap-4" key={i} style={{ marginBottom: 15 }}>
                            <div className="xs:basis-4/12">
                                <Skeleton className="rounded-[50%]" width="100%" height={150} />
                            </div>
                            <div className="xs:basis-8/12">
                                <Skeleton width="100%" height={30} />
                                <Skeleton width="100%" height={30} />
                                <Skeleton width="100%" height={30} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="hidden desktop:flex flex-row gap-4">
            <div className="xs:basis-full sm:basis-8/12 md:basis-9/12" style={{ height: '100%' }}>
                <Skeleton className="rounded-[50%] mb-[20px]" width="100%" height={40} />
                {
                    [1, 2, 3, 4, 5].map((i) => (
                        <div className="flex flex-row  mb-[15px]" key={i}>
                            <div className="xs:basis-2/12">
                                <Skeleton className="rounded-[50%]" width="80%" height={150} />
                            </div>
                            <div className="xs:basis-10/12">
                                <Skeleton width="100%" height={30} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="xs:basis-full sm:basis-4/12 md:basis-3/12 hidden-mobile">
                <Skeleton className="w-[50%]" width="100%" height={200} />
            </div>
        </div>
    </>
);

export default SkeletonCart;
