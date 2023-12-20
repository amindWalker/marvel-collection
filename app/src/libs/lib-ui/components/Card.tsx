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

export default function Card({
    style,
    avatarImage,
    imgAlt,
    children,
    subTitle,
}: CardProps) {
    return (
        <div className={style?.container}>
            <div className={style?.layout}>
                <figure className={style?.avatarImage}>
                    <img
                        src={avatarImage}
                        alt={imgAlt}
                        className={style?.avatarImage}
                    />
                </figure>
                 <h2 className={style?.subTitle}>{subTitle}</h2>
                <span className={style?.separator} />
                <div className={style?.content}>{children}</div>
            </div>
        </div>
    );
}
