# Description

Accordion

## How To Use

**Sample Code**
```node
import Accordion from '@common_accordion';

const Component = () => {
    return (
        <>
            <Accordion label="Testing Accordion">
                <div className="w-full">
                    Loremp sample content accordion
                </div>
            </Accordion>
        </>
    );
}

export default Component;
```

### Properties
| Props       | Required | default | Description | Type |
| :---        | :---     |:---- | :---        |:---  |
| `open`    | `false` | condition open or close detail accordion | `false` | `boolean` |
| `handleOpen` | `false` | function handling open detail accordion | `undefined` | `function` |
| `handleClose` | `false` | function handling close detail accordion | `undefined` | `function` |
| `CustomAccordionSummary` | `false` | Custom Element Accordion Summary | `undefined` | `React Element`|
| `className` | `false` | Custom classname accordion wrapper |  | `string`|
| `classSummary` | `false` | Custom classname accordion summary |  | `string`|
| `classLabel` | `false` | Custom classname accordion label (text only) |  | `string`|
| `classContent` | `false` | Custom classname accordion content |  | `string`|