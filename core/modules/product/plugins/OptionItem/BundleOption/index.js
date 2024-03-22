import Core from '@core_modules/product/plugins/OptionItem/BundleOption/core';
import View from '@core_modules/product/plugins/OptionItem/BundleOption/view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
