import Typography from '@common/Typography';
import WarningIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

const AlertCustom = ({ text }) => (
    <div className="w-full h-full">
        <div className="bg-yellow-50 p-4 flex flex-row items-center gap-4">
            <WarningIcon className="w-10 h-10 text-yellow-700" />
            <Typography>
                {text}
            </Typography>
        </div>
    </div>
);

export default AlertCustom;
