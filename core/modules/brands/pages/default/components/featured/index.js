import cx from 'classnames';
import Typography from '@common_typography';
import ContainerScroll from '@common/ContainerScroll';
import Item from '@core_modules/brands/pages/default/components/featured/Item';

const FeaturedBrands = (props) => {
    const {
        featured, t, storeConfig,
    } = props;

    return (
        <div className={cx('mb-[16px] desktop:mb-[32px]')}>
            <Typography
                variant="h2"
                className="text-center mb-4"
            >
                {t('brands:featuredBrands')}
            </Typography>
            <ContainerScroll
                showArrow
                className="desktop:!gap-4 tablet:!gap-3 mobile:!gap-2"
            >
                {featured.map((feat, index) => (
                    <Item
                        {...feat}
                        storeConfig={storeConfig}
                        key={index}
                    />
                ))}
            </ContainerScroll>
        </div>
    );
};

export default FeaturedBrands;
