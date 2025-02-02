export default function Loader({
    className
}: {
    className?: string;
}) {
    return (
        <div className={`h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-400 border-t-transparent ${className}`}></div>
    );
};
