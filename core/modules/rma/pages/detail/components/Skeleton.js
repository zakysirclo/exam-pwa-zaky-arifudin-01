/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Divider from '@common/Divider';
import Skeleton from '@common_skeleton';
import classNames from 'classnames';

const SkeletonLoader = () => (
    <div className={classNames(
        'shadow-sm border border-neutral-100 rounded-md',
        'flex flex-col gap-5 mt-4',
    )}
    >
        <>
            <div className="p-4 w-full">
                <div className="flex flex-col gap-2 desktop:max-w-[50%]">
                    <div className="grid grid-cols-3 gap-5">
                        <Skeleton width="100%" />
                        <Skeleton />
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <Skeleton width="100%" />
                        <Skeleton width="200%" />
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <Skeleton width="100%" />
                        <Skeleton width="85%" />
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <Skeleton width="100%" />
                        <Skeleton width="200%" />
                    </div>
                </div>
            </div>
            <Divider />
        </>
        <div
            className={classNames(
                'flex flex-col gap-3 px-4 pb-5',
            )}
        >
            {
                [1, 2, 3].map((index) => (
                    <div className="flex flex-row gap-4 w-full" key={index}>
                        <Skeleton height={105} width={105} />
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton width="30%" className="!hidden tablet:!inline-block" />
                            <Skeleton width="100%" className="tablet:!hidden" />

                            <Skeleton width="20%" className="!hidden tablet:!inline-block" />
                            <Skeleton width="70%" className="tablet:!hidden" />

                            <Skeleton width="30%" className="!hidden tablet:!inline-block" />
                            <Skeleton width="100%" className="tablet:!hidden" />
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
);

export default SkeletonLoader;
