import Button from '@common_button';
import Typography from '@common_typography';

const Footer = ({ t, data: { detail } }) => (
    <div className="">
        <Button fullWidth variant="outlined">
            <Typography variant="span" letter="uppercase" type="bold">{t('order:reorder')}</Typography>
        </Button>
        {
            (detail[0].status_label === 'complete' || detail[0].status_label.toLowerCase() === 'complete')
                    && (
                        <Button fullWidth variant="outlined">
                            <Typography variant="span" letter="uppercase" type="bold">{t('order:return')}</Typography>
                        </Button>
                    )
        }
        <Button fullWidth variant="outlined">
            <Typography variant="span">{t('order:print')}</Typography>
        </Button>
    </div>
);

export default Footer;
