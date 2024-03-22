import Skeleton from '@common_skeleton';
import classNames from 'classnames';

const SkeletonLoader = () => (
    <div className={
        classNames(
            'w-full flex flex-col items-center justify-center',
            'px-20 py-8 gap-2',
            'bg-no-repeat bg-cover bg-center',
        )
    }
    >
        <Skeleton width="40%" height={25} />
        <Skeleton width="40%" height={25} />
        <div className="w-9/12 my-4 grid grid-cols-1 tablet:grid-cols-3 gap-4">
            {[1, 2, 3].map((key) => <Skeleton key={key} width="100%" height={125} />)}
        </div>

        <Skeleton width="25%" height={35} />
    </div>
);

export default SkeletonLoader;
