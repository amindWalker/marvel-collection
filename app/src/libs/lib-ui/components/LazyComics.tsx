import { useState } from "react";
import { Comic } from "../../../types";
import Loading from "./Loadings";

interface ComicsProps {
    length: number;
    index: number;
    comic: Comic;
}

export default function LazyComics({
    length,
    index,
    comic: { title, thumbnail },
}: ComicsProps) {
    const [imageLoaded, setImageLoaded] = useState(Array(length).fill(false));

    const handleImageLoad = (index: number) => {
        const newImageLoaded = [...imageLoaded];
        newImageLoaded[index] = true;
        setImageLoaded(newImageLoaded);
    };

    return (
        <div>
            <p>{title}</p>
            {imageLoaded[index] ? (
                <img
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    className="max-w-32 max-h-64 rounded-xl"
                    src={`${thumbnail?.path}.${thumbnail?.extension}`}
                    alt={title}
                />
            ) : (
                <Loading />
            )}
        </div>
    );
}
