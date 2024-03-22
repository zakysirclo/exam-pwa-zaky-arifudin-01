/* eslint-disable camelcase */
import Typography from '@common_typography';
import formatDate from '@helper_date';
import RatingStar from '@common_ratingstar';
import cx from 'classnames';

const CustomerReview = (props) => {
    const {
        nickname, created_at, detail, ratings,
    } = props;
    const date = created_at || Date.now();
    const valueRate = ratings && ratings.length > 0 && ratings[0].value ? ratings[0].value : 0;
    return (
        <div className={cx('bg-neutral-50', 'p-[24px]', 'mb-[24px]', 'rounded-[12px]')}>
            <div className={cx('rating-card-info-container')}>
                <div className={cx('rating-card-info')}>
                    <div className={cx('rating-card-name')}>
                        <Typography variant="bd-1a">
                            {nickname || 'Anonymouse' }
                        </Typography>
                    </div>
                    <div className={cx('rating-card-date')}>
                        <Typography variant="bd-2b" color="text-neutral-500">
                            {formatDate(date)}
                        </Typography>
                    </div>
                </div>
                <div className="py-[12px]">
                    <RatingStar value={valueRate} />
                </div>
            </div>
            <div className={cx('rating-card-detail-container')}>
                <Typography variant="bd-1a" className="first-letter:uppercase break-words">
                    { detail || '-' }
                </Typography>
            </div>
        </div>
    );
};

export default CustomerReview;
