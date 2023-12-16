import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { selectModal } from "../../../store/modalSlice";
import { selectComics } from "../../../store/comicSlice";
import { useEffect, useState } from "react";
import { fetchComicsByCharacterID } from "../../../services";
import { selectCharacters } from "../../../store/characterSlice";
import { CardStateless } from "../components";
import Loading from "../components/Loadings";
import CardStateful from "../components/Cards/CardStateful";
import { Status } from "../../../types";
import MarvelPlaceHolder from "../../../assets/MarvelUnavailable.svg";

export default function CharacterPage() {
    const dispatch: AppDispatch = useDispatch();
    const characterID = useSelector(selectModal)?.characterID;
    const character = useSelector(selectCharacters)?.characters.find(
        (char) => char.id === characterID
    );
    const { comics, status } = useSelector(selectComics);
    const [loadedContent, setLoadedContent] = useState<number[]>([]);

    const handleLoadedContent = async (index: number) => {
        setLoadedContent((prevLoadedContent) => [...prevLoadedContent, index]);
    };

    useEffect(() => {
        dispatch(fetchComicsByCharacterID(characterID?.toString()));
    }, [dispatch, characterID]);

    return (
        <div
            className={`w-80vw h-80vh grid gap-4 grid-flow-col overflow-x-scroll m-4`}
        >
            {status === Status.Idle
                ? comics?.map((comic, i) => {
                      return (
                          <div
                              key={comic.id}
                              className="w-64 h-96 bg-red-900 rounded-xl grid place-items-center"
                          >
                              {loadedContent.includes(i) ? (
                                  <img
                                      key={comic.id}
                                      loading="lazy"
                                      src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                                      className={`min-w-48 min-h-64 max-w-64 max-h-96 rounded-xl`}
                                      alt={comic.title}
                                  />
                              ) : (
                                  <div className="w-64 h-96 bg-red-900 rounded-xl grid place-items-center">
                                      <img
                                          key={comic.id}
                                          onLoad={() => handleLoadedContent(i)}
                                          src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                                          className="hidden"
                                      />
                                      <i
                                          className={`z-1 i-line-md:loading-twotone-loop bg-red-700 p-10`}
                                      />
                                      <img
                                          src={MarvelPlaceHolder}
                                          alt="No image avaiable"
                                          className="w-full h-full rounded-xl"
                                      />
                                  </div>
                              )}
                          </div>
                      );
                  })
                : comics.map(() => {
                      return (
                          <div className="w-64 h-96 bg-red-900 rounded-xl grid place-items-center">
                              <i
                                  className={`z-1 i-line-md:loading-twotone-loop bg-red-700 p-10`}
                              />
                              <img
                                  src={MarvelPlaceHolder}
                                  alt="No image avaiable"
                                  className="w-full h-full rounded-xl"
                              />
                          </div>
                      );
                  })}
        </div>
    );
}

{
    /* <Loading
        key={comic.id}
        container={true}
        spinner={true}
        style={{
            container:
                "w-48 h-64 bg-gray-900 m-4 p-8 rounded-xl",
            spinner:
                "i-line-md:loading-twotone-loop bg-red-700 p-4 m-4",
        }}
    /> */
}
