import Layout from '@layout';
import { getGiftCard } from '@core_modules/customer/services/graphql';
import { currencyVar } from '@core/services/graphql/cache';

const GiftCard = (props) => {
    const config = {
        title: 'Gift Card',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Gift Card',
        bottomNav: false,
        tagSelector: 'swift-page-giftcard',
    };
    // cache currency
    const currencyCache = currencyVar();
    const { t, storeConfig, Content } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedCode, setSelectedCode] = React.useState('');
    const [search, setSearch] = React.useState({
        value: '',
        error: null,
    });
    const { loading, data, error } = getGiftCard();

    const handleOpenDetail = (code) => {
        setSelectedCode(code);
        setOpen(true);
    };
    const handleCloseDetail = () => {
        setOpen(false);
        setSelectedCode('');
    };
    const handleTextSearch = (event) => {
        setSearch({
            value: event.target.value,
            error: '',
        });
    };
    const handleSearch = () => {
        if (search.value === '' || !search.value) {
            setSearch({
                error: t('customer:giftCard:required'),
                variant: '',
            });
        } else {
            handleOpenDetail(search.value);
        }
    };
    return (
        <Layout {...props} pageConfig={config}>
            <Content
                {...props}
                t={t}
                storeConfig={storeConfig}
                openDetail={open}
                handleCloseDetail={handleCloseDetail}
                selectedCode={selectedCode}
                handleOpenDetail={handleOpenDetail}
                data={data}
                loading={loading}
                error={error}
                search={search}
                handleTextSearch={handleTextSearch}
                handleSearch={handleSearch}
                currencyCache={currencyCache}
            />
        </Layout>
    );
};

export default GiftCard;
