# Description

TextField

## How To Use

**1. Import module to your component**
```node
import TextField from '@common_forms/TextField';
```

**2. Use the button component**

```node
<TextField value="value" onChange={() => {}} />
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| placeholder       | false    | the placeholder text | string |
| className       | false    | additional className for the textfield | string |
| value       | false    | value of the textfield | any |
| onChange       | false    | textfield onChange handler | func |
| label       | false    | label of the textfield | string |
| hintProps       | false    | set the props of the hint element | obj |
| hintProps.displayHintText       | false    | set to display the hint text, defaults to false | bool |
| hintProps.hintType       | false    | set the type of the hint, can choose from 'error', 'warning', 'success', and '', defaults to '' | string |
| hintProps.hintText       | false    | set the text of the hint | string |
| leftIcon       | false    | Icon from [heroicon]("https://unpkg.com/browse/@heroicons/react@2.0.18/24/outline/") | element |
| leftIconProps       | false    | additional object props for leftIcon like `className`, etc | object |
| rightIcon       | false    | Icon from [heroicon]("https://unpkg.com/browse/@heroicons/react@2.0.18/24/outline/") | element |
| rightIconProps      | false    | additional object props for leftIcon like `className`, etc | object |