const ErrorInfo = ({ variant = 'success', text = '' }) => (
    <div className="">
        <div className="m-15" severity={variant}>{text}</div>
    </div>
);

export default ErrorInfo;
