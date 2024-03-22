# Description

TextArea

## How To Use

**1. Import module to your component**
```node
import TextArea from '@common_forms/TextArea';
```

**2. Use the button component**

```node
<TextArea value="value" onChange={() => {}} />
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| placeholder       | false    | the placeholder text | string |
| className       | false    | additional className for the textare | string |
| value       | false    | value of the textare | any |
| onChange       | false    | onChange handler | func |
| label       | false    | label of the textare | string |
| disabled       | false    | set disabled state | bool |
| hintProps       | false    | set the props of the hint element | obj |
| hintProps.displayHintText       | false    | set to display the hint text, defaults to false | bool |
| hintProps.hintType       | false    | set the type of the hint, can choose from 'error', 'warning', 'success', and '', defaults to '' | string |
| hintProps.hintText       | false    | set the text of the hint | string |
| inputProps       | false    | set the props of the input element, can be used to override existing props and take control of the input element from parent | obj |
