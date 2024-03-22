import Skeleton from '@common_skeleton';

const SkeletonCart = () => {
    const [heightState, setHeight] = React.useState(500);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) {
                setHeight(window.innerHeight - 220);
            } else {
                setHeight(window.innerHeight - 260);
            }

            return () => {};
        }
        return null;
    }, [window]);

    return (
        <div>
            <ol className="mobile:max-tablet:hidden tablet:mx-6 py-4 overflow-y-auto scrollbar-none" style={{ height: heightState }}>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[120px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[120px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[120px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[120px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
            </ol>
            <ol className="tablet:hidden mx-6 py-4 overflow-y-auto scrollbar-none" style={{ height: heightState }}>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[100px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[100px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[100px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
                <li className="item-loading pb-4 flex gap-x-4">
                    <Skeleton className="!rounded-md !h-[136px] !w-[100px] shrink-0" />
                    <div className="flex flex-col gap-y-4 h-full w-full">
                        <Skeleton className="!rounded-md !h-[80px] !w-full" />
                        <Skeleton className="!rounded-md !h-[40px] !w-full" />
                    </div>
                </li>
            </ol>
        </div>
    );
};

export default SkeletonCart;
