/* eslint-disable radix */
import Button from '@common/Button';
import TextArea from '@common/Forms/TextArea';
import Typography from '@common/Typography';
import { updateCartItemNote } from '@core_modules/cart/services/graphql';
import { getCartId } from '@helpers/cartId';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';

const OrderNote = ({ cartItemId, note, quantity }) => {
    const { t } = useTranslation();
    const [actUpdateCartItemNote] = updateCartItemNote();
    let noteParams = note;
    if (note !== null) {
        if (note.length === 0) {
            noteParams = null;
        }
    }
    const [activeNoteItem, setActiveNoteItem] = React.useState(noteParams !== null);
    const cartId = getCartId();
    const formik = useFormik({
        initialValues: {
            orderNote: note || '',
        },
        onSubmit: (values) => {
            actUpdateCartItemNote({
                variables: {
                    cartId,
                    cart_item_id: parseInt(cartItemId),
                    note: values.orderNote,
                    quantity: parseFloat(quantity),
                },
            })
                .then(() => {
                })
                .catch(() => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: `${t('cart:failedSaveOrderNote')}`,
                    });
                });
        },
    });

    const maxChar = { value: '255' };

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 mt-2">
            <Button className="!p-0" variant="plain" onClick={() => setActiveNoteItem(true)}>
                <Typography
                    className={activeNoteItem === true ? 'hidden' : 'cursor-pointer underline'}
                >
                    {t('cart:addANote')}
                </Typography>
            </Button>
            <Typography variant="bd-2b" className={activeNoteItem === true ? 'block' : 'hidden'}>
                {`${t('cart:itemNote')} - ${t('cart:maxChar', { maxChar })}`}
            </Typography>
            <TextArea
                inputProps={{
                    name: 'orderNote',
                    onBlur: () => {
                        if (formik.values.orderNote === '') {
                            setActiveNoteItem(false);
                        }
                        formik.submitForm();
                    },
                    className: 'w-full tablet:w-[320px]',
                }}
                value={formik.values.orderNote}
                onChange={formik.handleChange}
                maxLength={255}
                minRows={2}
                rows={2}
                className={activeNoteItem === true ? 'block w-full' : 'hidden'}
            />
        </form>
    );
};

export default OrderNote;
