# Description

Button

## How To Use

**1. Import module to your component**
```node
import Button from '@common_button';
```

**2. Use the button component**

```node
<Button variant="primary">
    Text
</Button>
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| children       | true    | component's children, can be a text or component | any |
| className       | false    | additional className for the button | string |
| variant       | false    | defaults to 'primary' | string |
| disabled       | false    | set disabled state, defaults to false | bool |
| loading       | false    | set loading state, defaults to false | bool |
| onClick       | false    | click handler | func |
| size       | false    | size of the button, defaults to 'md' | string |
| icon | false | Icon from [heroicon]("https://unpkg.com/browse/@heroicons/react@2.0.18/24/outline/")  | element |
|iconPosition | false | position of icon (left or right), default left | string |
| iconOnly | false | render button icon only | bool |
|linkProps | false | additional next/link props to provide button variant link | object|
