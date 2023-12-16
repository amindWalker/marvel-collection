interface LoadingProps {
    container?: boolean;
    spinner?: boolean;
    style?: LoadingStyle;
}

interface LoadingStyle {
    container?: string;
    spinner?: string;
}

const Loading: React.FC<LoadingProps> = ({ container, spinner, style }) => {
    return (
        <div className="grid place-items-center">
            {container ? (
                <div className={style?.container}>
                    {spinner && <i className={style?.spinner} />}
                </div>
            ) : (
                spinner && <i className={style?.spinner} />
            )}
        </div>
    );
};

export default Loading;
