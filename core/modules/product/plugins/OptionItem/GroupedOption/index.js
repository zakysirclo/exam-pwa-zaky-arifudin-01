import Core from '@core_modules/product/plugins/OptionItem/GroupedOption/core';
import View from '@core_modules/product/plugins/OptionItem/GroupedOption/view';

const GroupedProductOptionItem = (props) => (
    <Core
        {...props}
        View={View}
    />
);

export default GroupedProductOptionItem;
