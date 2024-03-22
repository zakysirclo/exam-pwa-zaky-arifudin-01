/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-plusplus */
import Typography from '@common_typography';
import Link from 'next/link';
import Image from '@common_image';
import cx from 'classnames';
import Show from '@common/Show';
import Skeleton from './skeleton';

const SellerItem = (props) => {
    const {
        name, id, logo, city,
    } = props;
    const citySplit = city?.split(',');

    return (
        <div className="flex flex-row justify-between items-center">
            <Link href={`/seller/${id}`}>
                <div className="flex flex-row mt-3 gap-4 items-center justify-between">
                    <div className="float-left">
                        <div className={cx(
                            'rounded-lg flex items-center justify-center w-[60px] h-[60px]',
                            'bg-neutral-100 !overflow-hidden',
                        )}
                        >
                            <Image src={logo} classContainer="w-[60px] h-[60px]" className="w-[60px] h-[60px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Typography variant="bd-2" className="capitalize">
                            {name}
                        </Typography>
                        <Typography variant="bd-3b" className="capitalize">
                            {citySplit ? citySplit[0] : ''}
                        </Typography>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const SellerView = (props) => {
    const { data, loading } = props;

    return (
        <div className="flex flex-col gap-3 mb-4">
            <Typography variant="h2" className="uppercase">Seller</Typography>
            <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
                <Show when={loading}>
                    {[1, 2, 3, 4].map((key) => (
                        <Skeleton key={key} />
                    ))}
                </Show>
                <Show when={!loading}>
                    {data.map((item, idx) => (
                        <SellerItem {...item} key={idx} />
                    ))}
                </Show>
            </div>
        </div>
    );
};

export default SellerView;
