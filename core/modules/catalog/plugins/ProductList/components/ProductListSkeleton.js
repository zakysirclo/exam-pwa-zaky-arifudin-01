import React from 'react';
import cx from 'classnames';

const ProductListSkeleton = ({ isGrid }) => (
    <>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
                <div className="w-auto h-auto p-2" key={key}>
                    {
                        isGrid ? (
                            <div className="flex flex-col gap-2 tablet:gap-2 animate-pulse">
                                <div className="h-[144px] tablet:h-[205px] desktop:h-[250px] w-auto bg-neutral-100" />
                                <div className="h-5 w-full bg-neutral-100" />
                                <div className="h-4 w-3/4 bg-neutral-100" />
                            </div>
                        ) : (
                            <div className="flex flex-row w-full h-max gap-2 animate-pulse">
                                <div className={cx(
                                    'h-[144px] tablet:h-[205px] desktop:h-[250px] bg-neutral-100',
                                    'w-[244px] tablet:w-[305px] desktop:w-[350px]',
                                )}
                                />
                                <div className="flex flex-col justify-between h-[144px] tablet:h-[205px] desktop:h-[250px] gap-2 w-full">
                                    <div className="flex flex-col gap-2">
                                        <div className="h-5 w-full bg-neutral-100" />
                                        <div className="h-4 w-3/4 bg-neutral-100" />
                                    </div>
                                    <div className="h-8 rounded-md w-full bg-neutral-100" />
                                </div>
                            </div>
                        )
                    }
                </div>
            ))
        }
    </>
);

export default ProductListSkeleton;
