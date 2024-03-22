import Typography from '@common_typography';
import Button from '@common_button';
import ButtonQty from '@common_buttonqty';
import Drawer from '@common/Drawer';

const EditDrawer = ({
    t, open, toggleOpen, id, quantity = 1, product_name = '', updateItem,
}) => {
    const [qty, setQty] = React.useState(quantity);

    React.useEffect(() => {
        setQty(quantity);
    }, [quantity]);
    const toggleDrawer = (anchor, _open) => (event) => {
        if (
            event
            && event.type === 'keydown'
            && (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        toggleOpen(!_open);
    };
    return (
        <Drawer
            position="bottom"
            open={open}
            onClose={toggleDrawer('bottom', false)}
            onOpen={toggleDrawer('bottom', true)}
        >
            <div className="w-full h-full flex justify-center items-center p-4">
                <Typography variant="title" type="regular" align="center">
                    {product_name}
                </Typography>
                <div className="flex flex-row pl-4 py-4 pr-7">
                    <Typography variant="bd-2b">{t('common:title:qty')}</Typography>
                    <ButtonQty
                        value={qty}
                        onChange={setQty}
                        max={10000}
                    />
                </div>
                <Button
                    id="cart-editDrawer-saveBtn"
                    onClick={() => {
                        toggleOpen(false);
                        updateItem({
                            cart_item_id: id,
                            quantity: qty,
                        });
                    }}
                >
                    {t('cart:button:saveEdit')}
                </Button>
            </div>
        </Drawer>
    );
};

export default EditDrawer;
