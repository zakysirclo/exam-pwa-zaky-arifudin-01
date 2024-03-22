# Description

Radio component creates a list of radio buttons

## How To Use

**1. Import module to your component**
```node
import Radio from '@common_forms/Radio';
```

**2. Place the Radio component**

```node
....
     <Radio
        value={value}
        onChange={handleSelect}
        valueData={data}
    />
....
```


### Properties
| Props       | Required | Description | Type | Default |
| :---        | :---     | :---        |:---  |:---  |
| `label`       | false    | the radio group label | `string`||
| `data`       | true    | array of data to display as radio buttons | `array`||
| `onChange`       | true    | radio onChange handler | `function`||
| `value`       | true    | selected item | `string`||
| `name`       | false    | name of the field | `string`||
| `CustomItem`       | false    | custom radio to render | `components`||
| `customItemProps`       | false    | custom radio props like its classnames | `object`||
| `error`       | false    | show / hide error message | `bool`| false |
| `errorMessage`       | false    | error message text | `string`||
| `disabled`       | false    | set disabled state | `bool`| false |
| `CustomLabel`       | false    | custom radio group label | `components`||
| `useLoadMore`       | false    | enable show / hide feature | `bool`| false |
| `size`       | false    | size of the radio button | `md`|
| `type`    | false | type of item radio `check` or `radio` | `string` | `radio` |