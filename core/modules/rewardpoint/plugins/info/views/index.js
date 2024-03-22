/* eslint-disable no-nested-ternary */
import Link from 'next/link';

const InfoTemplate = ({
    t, data, loading, error,
}) => (
    (
        <Link href="/aw_rewardpoints/info">

            <div>
                <p>{t('customer:menu:myPoint')}</p>
                <h3>
                    {loading || !data ? 'Loading ...' : error ? 0 : data.customerRewardPoints.balance}
                </h3>
            </div>

        </Link>
    )
);

export default InfoTemplate;
