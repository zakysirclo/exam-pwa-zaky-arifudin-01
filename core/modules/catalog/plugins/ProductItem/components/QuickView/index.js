/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import QuickView from './view';

const QuickViewCore = (props) => {
    const { t } = useTranslation(['validate', 'common', 'product', 'catalog']);
    const {
        onClose, selectedValue, keyProduct, open, data, storeConfig = {},
    } = props;
    let productKey;
    for (let i = 0; i < data.items.length; i += 1) {
        if (keyProduct === data.items[i].url_key) {
            productKey = [i];
        }
    }

    const handleClose = () => {
        onClose(selectedValue);
        document.body.style = '';
    };

    return (
        <QuickView
            open={open}
            handleClose={handleClose}
            t={t}
            storeConfig={storeConfig}
            product={data}
            productKey={productKey}
            slug={keyProduct}
        />
    );
};

QuickViewCore.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default QuickViewCore;
