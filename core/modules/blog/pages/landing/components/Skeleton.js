import Skeleton from '@common_skeleton';

const SkeletonBlog = () => (
    <div className="grid desktop:grid-cols-2 gap-6">
        <div className="flex max-tablet:flex-col">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-4 tablet:mb-16" />
            <div className="flex flex-col tablet:ml-6 tablet:w-full desktop:w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
        <div className="flex max-tablet:flex-col">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-4 tablet:mb-16" />
            <div className="flex flex-col tablet:ml-6 tablet:w-full desktop:w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
        <div className="flex max-tablet:flex-col">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-4 tablet:mb-16" />
            <div className="flex flex-col tablet:ml-6 tablet:w-full desktop:w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
        <div className="flex max-tablet:flex-col">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-4 tablet:mb-16" />
            <div className="flex flex-col tablet:ml-6 tablet:w-full desktop:w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
    </div>
);

export default SkeletonBlog;
