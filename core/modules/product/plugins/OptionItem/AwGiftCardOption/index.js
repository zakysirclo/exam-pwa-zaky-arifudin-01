/* eslint-disable arrow-body-style */

import Core from '@core_modules/product/plugins/OptionItem/AwGiftCardOption/core';
import View from '@core_modules/product/plugins/OptionItem/AwGiftCardOption/view';

const AwGiftCardProduct = (props) => {
    return (
        <Core {...props} View={View} />
    );
};

export default AwGiftCardProduct;
