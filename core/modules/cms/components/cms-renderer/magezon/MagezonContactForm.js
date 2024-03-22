import React from 'react';
import ContactForm from '@core_modules/contact/pages/default/index';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

const MagezonContactForm = (props) => {
    const {
        //
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        disable_element,
        form_width,
    } = props;

    const { t } = useTranslation(['common', 'contact', 'validate']);

    if (!disable_element) {
        return (
            <div
                className={cx('mgz-contact-form', {
                    'max-sm:hidden': xs_hide,
                    'max-md:hidden': sm_hide,
                    'max-lg:hidden': md_hide,
                    'max-xl:hidden': lg_hide,
                })}
            >
                <ContactForm isCms t={t} />
                <style jsx>
                    {`
                        .mgz-contact-form {
                            max-width: ${form_width}px;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

export default MagezonContactForm;
