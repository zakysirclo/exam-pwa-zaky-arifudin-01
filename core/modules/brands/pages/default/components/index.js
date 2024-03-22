import cx from 'classnames';
import AllBrands from '@core_modules/brands/pages/default/components/all';
import Featured from '@core_modules/brands/pages/default/components/featured';
import Show from '@common/Show';

const Component = (props) => {
    const { t, featured, storeConfig } = props;
    const displayFeatured = true;
    return (
        <div className={cx('')}>
            <Show when={(featured.length > 0) && displayFeatured}>
                <Featured
                    t={t}
                    featured={featured}
                    storeConfig={storeConfig}
                />
            </Show>
            <AllBrands {...props} />
        </div>
    );
};

export default Component;
