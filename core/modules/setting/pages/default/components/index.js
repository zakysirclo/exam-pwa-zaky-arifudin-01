import classNames from 'classnames';
import SwitcherCurrency from '@common_currency';
import SwitcherLanguage from '@common_language';

const SettingPage = (props) => {
    const { t } = props;
    return (
        <div className={classNames('md:basis-full')}>
            <div>
                <SwitcherLanguage {...props} />
            </div>
            <div>
                <SwitcherCurrency title={t('common:setting:currency')} {...props} />
            </div>
        </div>
    );
};

export default SettingPage;
