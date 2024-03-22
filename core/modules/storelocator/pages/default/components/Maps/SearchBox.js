/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { useTranslation } from 'next-i18next';
import TextField from '@common/Forms/TextField';
import Magnify from '@heroicons/react/24/outline/MagnifyingGlassIcon';

const SearchBox = React.forwardRef((props, ref) => {
    const { t } = useTranslation(['common']);
    return (
        <StandaloneSearchBox
            ref={ref}
            onPlacesChanged={() => {
                props.handleSearch();
                props.setValue(ref.current.getPlaces()[0].formatted_address);
            }}
        >
            <TextField
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                fullWidth
                placeholder={t('common:search:location')}
                rightIcon={<Magnify />}
                className="!w-full"
            />
        </StandaloneSearchBox>
    );
});

export default SearchBox;
