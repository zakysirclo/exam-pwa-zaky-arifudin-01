import cx from 'classnames';
import Button from '@common_button';
import Skeleton from '@core_modules/customer/pages/newsletter/components/skeleton';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import Checkbox from '@common_forms/CheckBox';
import Show from '@common_show';

const SettingPage = (props) => {
    const {
        t, isSubscribed, isSubscribedBefore, handleChange, handleSave, loading,
    } = props;

    const isDisabled = loading || isSubscribedBefore === isSubscribed;

    return (
        <Layout {...props} title={t('customer:setting:newsletter')}>
            <div className={cx('pt-5')}>
                <Show when={loading}>
                    <Skeleton />
                </Show>
                <Show when={!loading}>
                    <Checkbox
                        id="customer-subscribe-checkbox"
                        label={t('customer:setting:newsletter_subscription')}
                        flex="column"
                        checked={isSubscribed}
                        onChange={handleChange}
                        variant="single"
                    >
                        <label htmlFor="customer-subscribe-checkbox">
                            <Typography variant="bd-2b">{t('customer:setting:newsletter_subscription')}</Typography>
                        </label>
                    </Checkbox>
                </Show>
                <div className={cx('pt-5')}>
                    <Button className="swift-action-save" onClick={handleSave} disabled={isDisabled}>
                        <Typography className={cx(isDisabled ? '!text-neutral-black' : '!text-neutral-white')}>{t('common:button:save')}</Typography>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingPage;
