import Account from '@core_modules/customer/pages/account/components/Customer/view/components/account';
import Address from '@core_modules/customer/pages/account/components/Customer/view/components/address';
import Order from '@core_modules/customer/pages/account/components/Customer/view/components/order';

const ViewMobile = (props) => {
    // eslint-disable-next-line object-curly-newline
    const { t, userData, reOrder, storeConfig, returnUrl } = props;
    const { customer, customerOrders } = userData;
    return (
        <div>
            <div>
                <Account customer={customer} t={t} storeConfig={storeConfig} />
                <Address customer={customer} t={t} storeConfig={storeConfig} />
                <Order storeConfig={storeConfig} customerOrders={customerOrders || {}} t={t} reOrder={reOrder} returnUrl={returnUrl} />
            </div>
        </div>
    );
};

export default ViewMobile;
