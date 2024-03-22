import Accordion from '@common/Accordion';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezonIcon';
import { useState } from 'react';

const MagezonToggle = (props) => {
    const {
        //
        icon,
        active_icon,
        toggle_title,
        toggle_content,
        ...other
    } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Accordion
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            label={toggle_title}
            classLabel="accordion-label [&.accordion-label]:ml-[5px]"
            classSummary="flex-row-reverse !justify-end"
            CustomIcon={<MagezonIcon icon={open ? active_icon : icon} {...other} />}
        >
            <div dangerouslySetInnerHTML={{ __html: toggle_content }} />
        </Accordion>
    );
};

export default MagezonToggle;
