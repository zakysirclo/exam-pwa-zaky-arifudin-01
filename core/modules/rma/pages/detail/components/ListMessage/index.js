import classNames from 'classnames';
import Typography from '@common_typography';
import Divider from '@common/Divider';

const ListMessage = ({
    data = [],
}) => (
    <div className="flex flex-col gap-4 mt-2">
        <Divider />
        <ul className="list-none">
            {
                data.map((item, index) => (
                    <li
                        key={index}
                        className={
                            classNames(
                                'clear-both inline-block p-4 mb-2 rounded-md w-full',
                                item.owner_type === 2
                                    ? 'float-right bg-neutral-100'
                                    : 'float-left bg-neutral-500',
                            )
                        }
                    >
                        <div className="flex flex-col overflow-hidden">
                            <Typography
                                color={item.owner_type === 2 ? '' : 'text-neutral-white'}
                                variant="bd-2"
                            >
                                {item.owner_type === 2 ? `${item.owner_name} (Me)` : '(Customer Service)'}
                                {' '}
                                {item.created_at}
                            </Typography>
                            <Typography
                                variant="bd-2b"
                                color={item.owner_type === 2 ? '' : 'text-neutral-white'}
                            >
                                {item.text}
                            </Typography>
                            {
                                item.attachments.length > 0 && item.attachments.map((file, ind) => (
                                    <a key={ind} href={file.image_url} target="blank">
                                        <Typography decoration="underline">
                                            {file.name}
                                        </Typography>
                                    </a>
                                ))
                            }
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
);

export default ListMessage;
