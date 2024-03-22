import Core from '@core_modules/product/plugins/OptionItem/SimpleOption/core';
import View from '@core_modules/product/plugins/OptionItem/SimpleOption/view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
