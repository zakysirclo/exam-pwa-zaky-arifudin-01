import Dialog from '@common_dialog';
import { useTranslation } from 'next-i18next';

const ModalCookies = () => {
    const { t } = useTranslation();
    return (
        <>
            <Dialog onClose={() => {}} aria-labelledby="dialog-cookies-warning" open>
                <div className="dialog-content">
                    <div>
                        <h2 id="server-modal-title">{t('common:error:browser')}</h2>
                        <p id="server-modal-description">{t('common:message:browserError')}</p>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ModalCookies;
