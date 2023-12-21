interface LoadingProps {
    container?: boolean;
    spinner?: boolean;
    style?: LoadingStyle;
    children: React.ReactNode;
}

interface LoadingStyle {
    container?: string;
    spinner?: string;
}

const Loading: React.FC<LoadingProps> = ({
    container,
    spinner,
    style,
    children,
}) => {
    return (
        <div className="grid place-items-center">
            {container ? (
                <div className={style?.container}>
                    {spinner && (
                        <>
                            <i className={style?.spinner} />
                            {children}
                        </>
                    )}
                </div>
            ) : (
                spinner && <i className={style?.spinner} />
            )}
        </div>
    );
};

export default Loading;
