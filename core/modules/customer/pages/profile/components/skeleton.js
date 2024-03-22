import React from 'react';
import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonLoader = () => (
    <div>
        <Skeleton width="200px" height="40px" />
        <br />
        <Skeleton width="450px" height="40px" className={cx('mb-3', 'max-w-[100%]')} />
        <br />
        <Skeleton width="200px" height="40px" />
        <br />
        <Skeleton width="450px" height="40px" className={cx('mb-3', 'max-w-[100%]')} />
        <br />
        <Skeleton width="200px" height="40px" />
        <br />
        <Skeleton width="450px" height="40px" className={cx('mb-3', 'max-w-[100%]')} />
        <br />
        <Skeleton width="200px" height="40px" />
        <br />
        <Skeleton width="450px" height="40px" className={cx('mb-3', 'max-w-[100%]')} />
        <br />
        <Skeleton width="200px" height="40px" />
        <br />
        <Skeleton width="450px" height="40px" className={cx('mb-3', 'max-w-[100%]')} />
        <br />
    </div>
);

export default SkeletonLoader;
