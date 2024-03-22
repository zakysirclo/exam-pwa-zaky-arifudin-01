# Description

Popover

## How To Use

**1. Import module to your component**
```node
import Popover from '@common_popover';
```

**2. Use the button component**

```node
<Popover content={<PopoverContent />} open={open} setOpen={setOpen}>
    {children}
</Popover>
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| children       | true    | component's children, can be a text or component | any |
| content       | true    | popover content | react-component |
| open       | true    | show popover content state | boolean |
| setOpen       | true    | set popover content state | function |
| className | false | additional className for the badge counter | string |
| contentClassName | false | additional className for the popover content | string |
| wrapperClassName | false | additional className for the popover wrapper | string |
| wrapperId | false | additional id for the popover wrapper | string |