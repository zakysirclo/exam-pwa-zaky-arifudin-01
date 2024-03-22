# Description

**CheckBox** \
Lists a list of checkboxes

## How To Use

**1. Import module to your component**
```node
import CheckBox from '@common_forms/CheckBox';
```
**2. Place CheckBox component**

```node
....
    <CheckBox
        data={data}
        label="label"
        value={value}
        onChange={onChange}
        classNames={{
            checkboxGroupClasses: 'flex-row'
        }}
    />
....
```

### Properties
| Props       | Required | Description | Type | Default |
| :---        | :---     | :---        |:---  |:---     |
| `data`       | true    | array of items to be displayed | `array` | [] |
| `label`       | false    | the checkbox group label | `string` | '' |
| `size`       | false    | size of the checkbox | `string` | 'md' |
| `value`       | false    | selected values | `array` | [] |
| `onChange`       | false    | onChange handler | `function` | void |
| `disabled`       | false    | set disabled set | `bool` | false |
| `useLoadMore`       | false    | allows load more/less behavior | `bool` | false |
| `classNames`       | false    | allows setting additional element classes | `obj` | false |
| `classNames.checkboxClasses`       | false    | set additional checkbox classes | `string` | '' |
| `classNames.checkboxGroupClasses`       | false    | set additional classes for the container of the checkbox list, useful for when setting the flex layout of the checkbox | `string` | '' |
| `flex`       | false    | flex direction to render list checkbox to `row` or `col` | `string` | `col` |
