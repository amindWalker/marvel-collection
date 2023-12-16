import { useEffect, useState } from "react";

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
    mainTitle?: string;
    subTitle?: string;
    children?: React.ReactNode;
    loading?: boolean;
}

export default function CardStateful({
    style,
    mainTitle,
    children,
    subTitle,
    loading,
}: CardProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loading) setIsLoading(loading);
    }, [loading]);

    return (
        <div className={style?.container}>
            <div className={style?.layout}>
                <h2 className={style?.avatarImage}>{mainTitle}</h2>
                <h2 className={style?.subTitle}>{subTitle}</h2>
                <span className={style?.separator} />
                <div className={style?.content}>
                    {isLoading ? (
                        <div className="w-48 h-64 bg-gray-900 m-4 p-8 rounded-xl">
                            <i className="i-line-md:loading-twotone-loop bg-red-700 p-4 m-4" />
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
}
