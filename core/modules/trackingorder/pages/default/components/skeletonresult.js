/* eslint-disable jsx-a11y/control-has-associated-label */
import Skeleton from '@common_skeleton';

const SkeleteonTracking = () => (
    <table style={{ width: '100%', padding: '0 20px' }}>
        <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <tr key={i}>
                    <td className="" style={{ width: '50%' }}><Skeleton /></td>
                    <td className="" style={{ width: '2%' }} />
                    <td className=""><Skeleton /></td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default SkeleteonTracking;
