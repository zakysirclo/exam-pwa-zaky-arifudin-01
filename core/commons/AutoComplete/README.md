# Description

AutoComplete

## How To Use

**Sample Code**
```node
import { getCountries as getAllCountries } from '@core_modules/customer/services/graphql';
import CommonAutocomplete from '@common_autocomplete';

const Component = () => {
    const [getCountries, responCountries] = getAllCountries();

    React.useEffect(() => {
        console.log(responCountries);
    }, [responCountries]);

    React.useEffect(() => {
        getCountries();
    }, []);

    return (
        <>
            {responCountries && responCountries.data && responCountries.data.countries && (
                <CommonAutocomplete
                    value={sampleValue}
                    onChange={setSampleValue}
                    className="addressForm-country-autoComplete"
                    enableCustom={false}
                    loading={responCountries.loading}
                    itemOptions={responCountries && responCountries.data && responCountries.data.countries}
                    name="country"
                    primaryKey="id"
                    labelKey="full_name_locale"
                    useKey
                />
            )}
        </>
    );
}

export default Component;
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| disabled       | optional    | disabled state | boolean |
| label       | true    | label | string |
| labelKey       | optional    | `required` if the value of `useKey` is `true`, used for non-standard value: label structure | string |
| loading       | true    | loading state | boolean |
| name       | true    | textfield name | string |
| onChange       | required    | function to control the form value | function |
| value | required | value of the textfield | any |
| className | optional | additional className for the textfield | string or tailwind class |
| enableCustom | optional | enable custom list component render | boolean |
| placeholder | optional | the placeholder text | string |
| customPopover | optional | custom popover component, this is `required` if the value of `enableCustom` is `true` | React Component |
| itemOptions | optional | list of options | array |
| primaryKey | optional | `required` if the value of `useKey` is `true`, used for non-standard value: label structure | string |
| useKey | optional | used for non-standard value: label structure | boolean |