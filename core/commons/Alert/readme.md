# Description

Alert

## How To Use

**Sample Code**
```node
import Alert from '@common_alert';

const Component = () => {
    return (
        <>
            <Alert severity="warning">
                Loremp sample content accordion
            </Alert>
        </>
    );
}

export default Component;
```

### Properties
| Props       | Required | default | Description | Type |
| :---        | :---     |:---- | :---        |:---  |
| `severity`    | `false` | saverity variant color alert with value `success`, `error`, or `warning` | `success` | `string` |
| `children` | `required` | childre alert can be value `string` or `element` | | `string` or `React Element`|
| `withIcon` | `false` | Showing icon on alert |  | `boolean`|
| `className` | `false` | Custom classname alet wrapper |  | `string`|
| `classChildren` | `false` | Custom classname classChildren wrapper |  | `string`|
| `iconClassName` | `false` | Custom classname icon wrapper |  | `string`|
