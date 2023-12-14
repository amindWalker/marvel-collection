import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { selectModal } from "../../../store/modalSlice";
import { selectComics } from "../../../store/comicSlice";
import { useEffect, useState } from "react";
import { fetchComicsByCharacterID } from "../../../services";
import { selectCharacters } from "../../../store/characterSlice";
import { Card } from "../components";
import { Status } from "../../../types";

export default function CharacterPage() {
    const handleImageLoad = (index: number) => {
        const newImageLoaded = [...imageLoaded];
        newImageLoaded[index] = true;
        setImageLoaded(newImageLoaded);
    };

    const dispatch: AppDispatch = useDispatch();
    const characterID = useSelector(selectModal)?.characterID;
    const character = useSelector(selectCharacters)?.characters.find(
        (char) => char.id === characterID
    );
    const { comics, status } = useSelector(selectComics);
    const [imageLoaded, setImageLoaded] = useState(
        Array(character?.comics?.available).fill(false)
    );

    useEffect(() => {
        dispatch(fetchComicsByCharacterID(characterID?.toString()));
    }, [dispatch, characterID]);

    return (
        <Card
            style={{
                container: "@apply bg-gray-400 rounded-xl m-4",
                layout: "grid grid-flow-col place-items-center",
                mainTitle: "text-2xl",
                textContent: "text-xl p-4",
                separator: "ring h-80%",
            }}
            mainTitle={character ? character?.name : ""}
        >
            <div className="grid grid-flow-col max-w-screen-md overflow-scroll">
                {status === Status.Idle ? (
                    comics.map((comic, index) => {
                        return (
                            <div key={comic.id}>
                                <img
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(index)}
                                    className="max-h-64 max-w-64"
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt={comic.isbn}
                                />
                                <h1>
                                    {imageLoaded[index] ? (
                                        index
                                    ) : (
                                        <i className="i-line-md:loading-twotone-loop bg-red-700 p-8 m-4" />
                                    )}
                                </h1>
                            </div>
                        );
                    })
                ) : (
                    <>
                        {[1, 2, 3, 4].map((item) => {
                            return (
                                <div
                                    key={item}
                                    className="w-32 h-64 bg-gray-700 animate-pulse m-4 p-8 rounded-xl"
                                >
                                    <i className="i-line-md:loading-twotone-loop bg-red-700 p-8 m-4" />
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </Card>
    );
}
