import Alert from '@common/Alert';

const AlertCustom = ({ variant, text }) => (
    <Alert className="alert mt-4" severity={variant}>
        {text}
    </Alert>
);

export default AlertCustom;
