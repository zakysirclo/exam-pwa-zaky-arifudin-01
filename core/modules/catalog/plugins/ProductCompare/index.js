/* eslint-disable react/require-default-props */
import WithLinkView from '@core_modules/catalog/plugins/ProductCompare/components/WithLink';
import Core from '@core_modules/catalog/plugins/ProductCompare/core';
import propTypes from 'prop-types';

const ShoppingBag = (props) => <Core WithLinkView={WithLinkView} {...props} />;

ShoppingBag.propTypes = {
    withLink: propTypes.bool,
};

export default ShoppingBag;
