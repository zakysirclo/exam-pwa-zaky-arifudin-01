import React from 'react';
import Typography from '@common_typography';
import Link from 'next/link';

const OtherRmaLink = ({
    t, other_rma_request,
}) => (
    <div className="flex flex-col">
        <Typography color="red">{t('rma:otherRequestRma')}</Typography>
        <div className="">
            {other_rma_request.map((number_rma, indx) => (
                (
                    <Link href="/rma/customer/view/id/[id]" as={`/rma/customer/view/id/${number_rma}`} key={indx}>

                        <Typography type="semiBold">
                            #
                            {number_rma}
                        </Typography>

                    </Link>
                )
            ))}
        </div>
    </div>
);

export default OtherRmaLink;
