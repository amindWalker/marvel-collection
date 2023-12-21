import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { selectModal } from "../../../store/modalSlice";
import { selectComics } from "../../../store/comicSlice";
import { useEffect, useState } from "react";
import { fetchComicsByCharacterID } from "../../../services";
import { selectCharacters } from "../../../store/characterSlice";
import Loading from "../components/Loading";
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
            className={`w-80vw h-80vh grid gap-4 grid-flow-col <lg:grid-flow-row place-items-center m-4`}
        >
            <div className="col-span-1 text-center text-xl <lg:text-lg">
                <label>{character?.name}</label>
                <div className="avatar m-4">
                    <img
                        className="<lg:w-24 lg:max-w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                        src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                        alt={character?.name}
                    />
                </div>
            </div>
            <div className="col-span-3">
                <div className="grid grid-flow-col">
                    <h2>COMICS</h2>
                    {status === Status.Idle
                        ? comics?.map((comic, i) => {
                              return (
                                  <div
                                      key={comic.id}
                                      tabIndex={100}
                                      className={`w-64 h-96 m-4 bg-red-900 rounded-xl grid place-items-center hover:-translate-y-2 hover:ring-8 ring-red-600 hover:drop-shadow-lg`}
                                  >
                                      {loadedContent.includes(i) ? (
                                          <img
                                              key={comic.id}
                                              loading="lazy"
                                              src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                                              className={`min-w-48 min-h-64 max-w-64 max-h-96 rounded-xl animate-fade-in`}
                                              alt={comic.title}
                                          />
                                      ) : (
                                          <div className="w-64 h-96 bg-red-900 rounded-xl grid place-items-center">
                                              <img
                                                  key={comic.id}
                                                  onLoad={() =>
                                                      handleLoadedContent(i)
                                                  }
                                                  src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                                                  className="hidden"
                                              />
                                              <Loading
                                                  container
                                                  spinner
                                                  style={{
                                                      spinner:
                                                          "i-line-md:loading-twotone-loop bg-red-700 p-10 self-center",
                                                  }}
                                              >
                                                  <img
                                                      src={MarvelPlaceHolder}
                                                      alt="No image avaiable"
                                                      className="w-full h-full rounded-xl"
                                                      style={{
                                                          animationDelay: `${i}00ms`,
                                                      }}
                                                  />
                                              </Loading>
                                          </div>
                                      )}
                                  </div>
                              );
                          })
                        : comics.map(() => {
                              return (
                                  <div className="w-64 h-96 m-4 bg-red-900 rounded-xl grid place-items-center">
                                      <Loading
                                          container
                                          spinner
                                          style={{
                                              spinner:
                                                  "i-line-md:loading-twotone-loop bg-red-700 p-10 self-center",
                                          }}
                                      >
                                          <img
                                              src={MarvelPlaceHolder}
                                              alt="No image avaiable"
                                              className="w-full h-full rounded-xl"
                                          />
                                      </Loading>
                                  </div>
                              );
                          })}
                </div>
            </div>
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
