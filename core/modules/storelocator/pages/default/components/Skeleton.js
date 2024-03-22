const SkeletonStoreLocator = () => (
    <div className="flex flex-col">
        <div className="md:basis-3/12">
            <div className="flex flex-col gap-2 tablet:gap-2 animate-pulse">
                <div className="h-[515px] w-full bg-neutral-100" />
                <div className="h-5 w-full bg-neutral-100" />
            </div>
        </div>
    </div>
);

export default SkeletonStoreLocator;
