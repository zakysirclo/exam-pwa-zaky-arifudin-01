import Core from '@core_modules/product/plugins/OptionItem/VirtualOption/core';
import View from '@core_modules/product/plugins/OptionItem/VirtualOption/view';

const SimpleOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default SimpleOptionItem;
