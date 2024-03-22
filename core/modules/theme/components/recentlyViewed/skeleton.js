import Skeleton from '@common_skeleton';

const SkeletonRecently = () => (
    <>
        <div className="flex flex-row justify-evenly items-center mt-[20px] mb-[20px] w-full mobile:hidden">
            <Skeleton
                className="rounded-[50%]"
                width="17%"
                height={300}
            />
            <Skeleton
                className="rounded-[50%]"
                width="17%"
                height={300}
            />
            <Skeleton
                className="rounded-[50%]"
                width="17%"
                height={300}
            />
            <Skeleton
                className="rounded-[50%]"
                width="17%"
                height={300}
            />
            <Skeleton
                className="rounded-[50%]"
                width="17%"
                height={300}
            />
            <Skeleton
                className="rounded-[50%]"
                width="17%"
                height={300}
            />
        </div>
        <div className="flex flex-row justify-evenly items-center mt-[20px] mb-[20px] w-full mobile:hidden">
            <Skeleton
                className="rounded-[50%]"
                width="48%"
                height={300}
            />
            <Skeleton
                className="rounded-[50%]"
                width="48%"
                height={300}
            />
        </div>
    </>
);

export default SkeletonRecently;
