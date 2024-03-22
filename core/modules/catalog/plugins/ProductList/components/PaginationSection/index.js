import Pagination from '@common/Pagination';
import React from 'react';

const noRender = (prevProps, nextProps) => (
    prevProps.page === nextProps.page && prevProps.totalPage === nextProps.totalPage
);

const PaginationSection = React.memo((props) => {
    const {
        page, totalPage, handleChangePage,
    } = props;

    return (
        <div className="flex justify-end items-center my-5">
            { totalPage && totalPage > 0 ? (
                <>
                    <Pagination
                        totalPage={totalPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        className="hidden tablet:flex"
                    />
                    <Pagination
                        totalPage={totalPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        mobile
                        className="hidden xs:max-sm:flex"
                    />
                </>
            ) : null }
        </div>
    );
}, noRender);

export default PaginationSection;
