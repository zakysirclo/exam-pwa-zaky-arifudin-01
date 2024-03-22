import cx from 'classnames';
import Skeleton from '@common_skeleton';

const SellerSkeleton = () => (
    <div className="flex flex-col gap-5">
        <div className={cx(
            'flex flex-row justify-between items-center',
            'rounded-lg shadow-base p-5',
            'border border-neutral-100',
        )}
        >
            <div className="flex flex-row items-center gap-4 w-full">
                <div className="w-[70px] h-[65px] bg-neutral-300 rounded-full animate-pulse" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton width="20%" height={25} />
                    <Skeleton width="35%" height={20} />
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3 desktop:gap-4">
            {
                [1, 2, 3, 4, 5, 6].map((key) => (
                    <div
                        className={cx(
                            'w-full h-max',
                            'flex flex-col gap-4',
                        )}
                        key={key}
                    >
                        <div className="w-full h-[250px] desktop:h-[300px] animate-pulse bg-neutral-100" />
                        <div className="flex flex-col gap-2">
                            <Skeleton width="75%" height={25} />
                            <Skeleton width="85%" height={25} />
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
);

export default SellerSkeleton;
