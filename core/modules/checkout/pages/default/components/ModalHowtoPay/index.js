import React from 'react';
import Button from '@common_button';
import Dialog from '@common_dialog';
import gqlService from '@core_modules/checkout/services/graphql';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';

const ModalHowtoPay = ({
    open,
    setOpen,
    setDisplayHowToPay,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const { data, error, loading: loadingTutor } = gqlService.getCmsPage({ identifier: 'how-to-pay' });
    const mount = React.useRef(null);

    React.useEffect(() => {
        mount.current = true;
        if (mount.current && data && !error) {
            setDisplayHowToPay(true);
        }
        return () => {
            mount.current = false;
        };
    }, [data, error]);

    if (data && !error) {
        return (
            <Dialog
                open={open}
                onClose={() => setOpen()}
                title={data.cmsPage.title}
                onClickCloseTitle={() => setOpen()}
                closeOnBackdrop
                useCloseTitleButton
                content={(
                    <div className="flex !max-h-[calc(100vh-36px)] flex-col gap-4 desktop:border-t desktop:border-neutral-200">
                        <div className={cx(
                            'flex flex-col relative max-h-[calc(100vh-300px)] !overflow-y-scroll overflow-x-hidden',
                            'max-w-full',
                        )}
                        >
                            <CmsRenderer content={data.cmsPage.content} />
                        </div>
                        <div className="flex flex-row justify-end bg-neutral-white">
                            <Button loading={loadingTutor} classNameText="justify-center" className="w-[100px]" onClick={setOpen} type="submit">
                                {t('checkout:buttonOk')}
                            </Button>
                        </div>
                    </div>
                )}
            />
        );
    }
    return null;
};

export default ModalHowtoPay;
