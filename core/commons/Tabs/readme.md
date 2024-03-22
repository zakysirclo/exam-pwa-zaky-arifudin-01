# Description

Tabs is module commons to create custom top tabs view

## How To Use

**Import module to your component**
```node
import Tabs from '@common_tabs';
```

**Sample Code**
```node
import Tabs from '@common_tabs';

<Tabs data={data} onChange={handleChange} allItems={false} />
```

**Sample Code with Tab Has Content**

You can see in `core\modules\product\pages\default\components\DesktopTabs\index.js`

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `data`       | optional    | (`required` if `tabHasContent` is `false`), data for render tabs label | `array` |
| `onChange`       | optional    | (`required` if `tabHasContent` is `false`), function action every change or click item tabs | `function` |
| `allItems`       | optional    | (`required` if `tabHasContent` is `false`), condition for make `all items` for first item tabs | `bool` |
| `tabHasContent`    | optional | component for render content tabs | `component` |
| `tabWrapperClassName` | optional | class name for tabs wrapper | `string` |
| `tabTitleWrapperClassName` | optional | class name for tabs title wrapper | `string` |
| `tabTitleClassName` | optional | class name for tabs title | `string` |
| `tabTitleActiveClassName` | optional | class name for tabs title active | `string` |
| `tabTitleListClassName` | optional | class name for tabs title list | `string` |
| `tabTitleListActiveClassName` | optional | class name for tabs title list active | `string` |
| `tabContentClassName` | optional | class name for tabs content | `string` |

