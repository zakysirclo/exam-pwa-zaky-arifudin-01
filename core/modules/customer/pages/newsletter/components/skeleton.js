import React from 'react';
import Skeleton from '@common_skeleton';

function SkeletonContent() {
    return (
        <div className="w-full flex flex-col [&>*+*]:mt-[12px]">
            <Skeleton
                width={240}
                height={20}
            />
            <Skeleton
                width={160}
                height={20}
            />
        </div>
    );
}

export default SkeletonContent;
