# Description

Drawer is components for create modal drawer

### Properties
| Props       | Required | Default |  Description | Type |
| :---        | :---     | :---        | :---         |:---  |
| `open`      | `true`   |        | boolean condition for show or hide drawer | `bool` |
| `handleClose`     | `true`   |        | Funsi to handle close drawer | `function` |
| `position`     | `true`   |   `left`     | Position to render drawer can be has value `left`, `right` or `bottom` | `string` |
| `className`     | `false`   |        | Custom classname for wrapper drawer | `string` or `object` |
| `backdrop`     | `false`   |    `true`    | Backdrop background drawer | `boolean` |
| `backdropClass` | `false` | | Custom class for backdrop | `string` or `object` |


### How to use
```
import Drawer from `@common_drawer`

const Page = () => {
    const [open, setOpen] = useState(false);

    // handle open Drawer
    const handleOpen = () => setOpen(true)

    // handle close Drawer
    const handleClose = () => setOpen(false)

    return (
        <div className="w-full h-full">
            <Drawer open={open} handleClose={handleClose}>
                {/* Children Contet Drawer */}
                <div>
                    <h1>Test</h1>
                </div>
            </Drawer>

            {/* Sample Open Drawer */}
            <button className="bg-primary" onClick={handleOpen}>
                Open Drawer
            </button>
        </div>
    );

}

```

