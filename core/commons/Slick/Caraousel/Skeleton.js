import Skeleton from '@common_skeleton';

const CarouselSkeleton = () => {
    const SliderSkeleton = () => (
        <>
            <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                xsStyle={{ height: '60vw', marginBottom: '8px' }}
                smStyle={{ height: '42vw' }}
                mdStyle={{ height: '375px' }}
            />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="75%" animation="wave" />
        </>
    );
    return (
        <div className="px-4 py-6 tablet:px-0">
            <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2">
                <div className="hidden desktop:block">
                    <SliderSkeleton />
                </div>
                <div className="hidden tablet:block">
                    <SliderSkeleton />
                </div>
                <div>
                    <SliderSkeleton />
                </div>
                <div>
                    <SliderSkeleton />
                </div>
            </div>
        </div>
    );
};

export default CarouselSkeleton;
