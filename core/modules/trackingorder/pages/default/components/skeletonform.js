import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonForm = () => (
    <>
        <div className="flex flex-col">
            <Skeleton className="!w-[150px]" height={30} />
            <div className="mt-4 flex flex-col items-center m-[0_auto]">
                <Skeleton className="!w-[400px]" height={30} />
                <Skeleton
                    className={cx(
                        '!max-w-[400px]',
                        '!w-full',
                        'tablet:!w-[550px]',
                        'tablet:!max-w-[550px]',
                        'desktop:!w-[650px]',
                        'desktop:!max-w-[650px]',
                        '!h-[400px]',
                        'mt-10',
                    )}
                />
            </div>
        </div>
    </>
);

export default SkeletonForm;
