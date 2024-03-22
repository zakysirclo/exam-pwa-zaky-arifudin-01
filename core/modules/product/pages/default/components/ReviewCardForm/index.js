/* eslint-disable max-len */
import Typography from '@common_typography';
import TextField from '@common_forms/TextField';
import RatingStar from '@common_ratingstar';
import cx from 'classnames';

const ReviewCardForm = ({ t, Formik }) => (
    <div className={cx('review-form')}>
        <TextField
            required
            absolute={false}
            className="w-full"
            onChange={Formik.handleChange}
            value={Formik.values.nickname}
            placeholder={t('product:nickname')}
            label={t('product:nickname')}
            inputProps={{
                name: 'nickname',
                placeholder: t('common:label:egJohnDoe'),
            }}
            hintProps={{
                className: 'mt-[6px]',
                displayHintText: !!(Formik.touched.nickname && Formik.errors.nickname),
                hintType: Formik.touched.nickname && Formik.errors.nickname ? 'error' : '',
                hintText: (Formik.touched.nickname && Formik.errors.nickname) || null,
            }}
        />
        <div className={cx('section-rating', 'mt-[24px]')}>
            <Typography>
                {t('product:rate')}
                <span className={cx('text-red-600')}> *</span>
            </Typography>
            <RatingStar
                value={Formik.values.rating}
                classContainer={cx('mb-[6px]')}
                onChange={(newValue) => {
                    Formik.setFieldValue('rating', newValue);
                }}
            />
            {Formik.touched.rating && Formik.errors.rating && (
                <Typography variant="bd-2b" color="!text-red">
                    {Formik.touched.rating && Formik.errors.rating ? Formik.errors.rating : ''}
                </Typography>
            )}
        </div>
        <TextField
            required
            absolute={false}
            className="w-full"
            classWrapper="mt-[24px]"
            onChange={Formik.handleChange}
            value={Formik.values.title}
            label={t('product:title')}
            inputProps={{
                name: 'title',
                placeholder: t('common:label:addReviewTitle'),
            }}
            hintProps={{
                className: 'mt-[6px]',
                displayHintText: !!(Formik.touched.title && Formik.errors.title),
                hintType: Formik.touched.title && Formik.errors.title ? 'error' : '',
                hintText: (Formik.touched.title && Formik.errors.title) || null,
            }}
        />
        <TextField
            required
            multiline
            absolute={false}
            name="detail"
            className="w-full"
            classWrapper="mt-[24px]"
            onChange={Formik.handleChange}
            value={Formik.values.detail}
            placeholder={t('product:review')}
            label={t('product:review')}
            inputProps={{
                name: 'detail',
                className: 'align-top h-[140px]',
                placeholder: t('common:label:addReview'),
            }}
            hintProps={{
                className: 'mt-[6px]',
                displayHintText: !!(Formik.touched.detail && Formik.errors.detail) || true,
                hintType: Formik.touched.detail && Formik.errors.detail ? 'error' : 'info',
                hintText:
                    Formik.touched.detail && Formik.errors.detail
                        ? (Formik.touched.detail && Formik.errors.detail) || null
                        : t('common:form:maxChar', { length: 500 }),
            }}
        />
    </div>
);

export default ReviewCardForm;
