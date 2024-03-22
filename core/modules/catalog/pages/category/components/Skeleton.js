import CircularProgress from '@common_circularprogress';

const SkeletonCategory = () => (
    <div className="flex flex-col w-full h-[calc(100vh-300px)] items-center justify-center">
        <CircularProgress size="large" />
    </div>
);

export default SkeletonCategory;
