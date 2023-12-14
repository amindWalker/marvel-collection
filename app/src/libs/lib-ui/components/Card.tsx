export interface CardStyle {
    container: string;
    layout: string;
    mainTitle: string;
    subTitle?: string;
    textContent?: string;
    separator?: string;
}

export interface CardProps {
    style: CardStyle;
    mainTitle: string;
    subTitle?: string;
    children: React.ReactNode;
}

export default function Card({
    style,
    mainTitle,
    children,
    subTitle,
}: CardProps) {
    return (
        <div className={style.container}>
            <div className={style.layout}>
                <h2 className={style.mainTitle}>{mainTitle}</h2>
                <h2 className={style.subTitle}>{subTitle}</h2>
                <span className={style.separator} />
                <p className={style.textContent}>{children}</p>
            </div>
        </div>
    );
}
