export interface CardStyle {
    container?: string;
    layout?: string;
    avatarImage?: string;
    subTitle?: string;
    content?: string;
    separator?: string;
}

export interface CardProps {
    style?: CardStyle;
    avatarImage?: string;
    imgAlt?: string;
    subTitle?: string;
    children: React.ReactNode;
}

export default function CardStateless({
    style,
    avatarImage,
    imgAlt,
    children,
    subTitle,
}: CardProps) {
    return (
        <div className={style?.container}>
            <div className={style?.layout}>
                <img src={avatarImage} alt={imgAlt} className={style?.avatarImage} />
                <h2 className={style?.subTitle}>{subTitle}</h2>
                <span className={style?.separator} />
                <div className={style?.content}>{children}</div>
            </div>
        </div>
    );
}
