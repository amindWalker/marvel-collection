export interface CardStyle {
    container?: string;
    layout?: string;
    profileImage?: string;
    figureContainer?: string;
    legend?: string;
    children?: string;
}

export interface CardProps {
    style?: CardStyle;
    profileURL?: string;
    imgAlt?: string;
    legend?: string;
    children: React.ReactNode;
}

export default function Card({
    style,
    profileURL,
    imgAlt,
    legend,
    children,
}: CardProps) {
    return (
        <div
            className={style?.container}
            tabIndex={0}
        >
            <div className={style?.layout}>
                <figure className={style?.figureContainer}>
                    <img
                        src={profileURL}
                        alt={imgAlt}
                        className={style?.profileImage}
                    />
                    <legend className={style?.legend}>{legend}</legend>
                </figure>
                <div className={style?.children}>{children}</div>
            </div>
        </div>
    );
}
