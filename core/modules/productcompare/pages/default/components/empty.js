import Button from '@common_button';
import classNames from 'classnames';
import Alert from '@common/Alert';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

const EmptyView = (props) => {
    const { t } = props;
    return (
        <div className={classNames('flex flex-col items-center justify-center w-full gap-10')}>
            <div className="w-full">
                <Alert severity="warning">{t('common:productCompare:emptyCompare')}</Alert>
            </div>
            <Button
                variant="plain"
                link="/"
                icon={<ArrowRightIcon className="w-5 h-5" />}
                iconPosition="right"
                classNameText="!text-primary"
                className="!w-max !p-0"
            >
                {t('common:button:continueShopping')}
            </Button>

        </div>
    );
};

export default EmptyView;
