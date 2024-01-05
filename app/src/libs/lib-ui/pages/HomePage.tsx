import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { AppDispatch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacters } from "../../../store/characterSlice";
import { Status } from "../../../types";
import { Outlet } from "react-router-dom";
import { fetchCharactersData } from "../../../services";
import { CharacterList } from "../components";
import Loading from "../components/Loading";
import { selectOffset, setOffset } from "../../../store/offsetSlice";
import MarvelPlaceHolder from "../../../assets/MarvelUnavailable.svg";
import MarvelBranding from "../../../assets/marvel.svg";

export default function Home() {
    const dispatch: AppDispatch = useDispatch();
    const charactersLength = localStorage.getItem("charactersLength")
        ? localStorage.getItem("charactersLength")
        : "0";
    const { characters, status } = useSelector(selectCharacters);
    const [charactersOffset, setCharactersOffset] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { offset } = useSelector(selectOffset);

    useEffect(() => {
        dispatch(fetchCharactersData(charactersOffset));
    }, [dispatch, offset]);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setCharactersOffset(/^\d+$/.test(value) ? parseInt(value) : 0);
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleOnClick();
    }

    function handleOnClick() {
        dispatch(setOffset(charactersOffset));
    }

    return (
        <div className="base-all w-100vw h-100vh overflow-hidden grid <lg:grid-flow-col">
            <span
                id="marvel-branding"
                className="grid absolute justify-items-center bg-white w-100vw h-13 bg-op-50"
            >
                <a href="https://www.marvel.com/">
                    <img
                        src={MarvelBranding}
                        alt=""
                    />
                </a>
            </span>
            <nav
                className={`absolute z-2 mt-16 <lg:mt-0 <lg:backdrop-blur <lg:backdrop-brightness-80 rounded-lg justify-self-center
                <lg:justify-self-auto w-1/2 <lg:w-max <lg:min-h-screen text-center ${
                    isOpen ? "<lg:translate-x-0" : "<lg:-translate-x-110%"
                } <lg:shadow shadow-black`}
            >
                <div
                    className={`z-1 p-5 h-full grid grid-auto-flow-col
                    <lg:grid-flow-row <lg:grid-auto-rows-max <lg:place-items-center justify-center gap-4`}
                >
                    <i
                        className={`fixed cursor-pointer scale-150 ${
                            isOpen
                                ? "<lg:i-line-md:menu-to-close-alt-transition"
                                : "bg-black <lg:i-line-md:close-to-menu-alt-transition translate-x-500% "
                        } grid-self-start justify-self-end`}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    <h1 className="text-red-6 hidden <lg:block leading-0 <lg:mt-16">
                        MARVEL
                    </h1>
                    <span className="leading-0 hidden <lg:block text-4xl">
                        COMICS
                    </span>
                    <div className="grid <lg:mt-8 w-min place-items-center leading-0">
                        <h2 className="text-red-6">TOTAL</h2>
                        <span className="text-lg bg-black rounded-lg p-y-2 w-8ch">
                            {charactersLength}
                        </span>
                    </div>
                    <div className="grid w-min <lg:mt-4 <lg:p-4 rounded-lg leading-0">
                        <h2>OFFSET</h2>
                        <span className="flex">
                            <input
                                type="text"
                                value={charactersOffset}
                                onChange={handleOnChange}
                                onKeyDown={handleKey}
                                className="text-lg rounded-lg text-center w-5ch rounded-r-none"
                            />
                            <button
                                type="button"
                                onClick={handleOnClick}
                                className="bg-red-6 rounded-l-none"
                            >
                                SET
                            </button>
                        </span>
                    </div>
                </div>
            </nav>
            <div className="absolute grid grid-flow-col gap-4 place-items-center absolute top-50 <lg:top-35 left-50% -translate-x-50%">
                <i className="i-line-md:search-twotone scale-150 bg-red-6" />
                <input
                    type="search"
                    placeholder="search"
                    className="text-center p-3 rounded-xl placeholder-dark-9"
                />
            </div>
            <section
                className="grid"
                onClick={() => setIsOpen(false)}
            >
                <div className="-rotate-z-1 grid grid-flow-col overflow-x-scroll self-center">
                    <Outlet />
                    <h1 className="-rotate-z-90 font-black self-center sticky animate-pulse leading-0 translate-x-20 -ml-24">
                        CHOOSE
                        <br />
                        <span className="text-2xl leading-20">YOUR HERO</span>
                    </h1>
                    {status === Status.Idle
                        ? characters.map((char, i) => {
                              return (
                                  <div
                                      key={i}
                                      className="animate-jack-in animate-duration-2000"
                                      style={{ transitionDelay: `${i}000ms` }}
                                  >
                                      <CharacterList
                                          id={char.id}
                                          name={char.name}
                                          comics={char.comics}
                                          thumbnail={char.thumbnail}
                                      />
                                  </div>
                              );
                          })
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                              <div
                                  key={i}
                                  className="animate-jack-in animate-duration-2000"
                                  style={{ transitionDelay: `${i}000ms` }}
                              >
                                  <Loading
                                      container
                                      spinner
                                      style={{
                                          container:
                                              "grid place-items-center w-64 h-64 mb-12 mx-1",
                                          spinner:
                                              "i-line-md:loading-twotone-loop bg-white p-10 absolute",
                                      }}
                                  >
                                      <img
                                          src={MarvelPlaceHolder}
                                          className="rounded"
                                      />
                                  </Loading>
                              </div>
                          ))}
                </div>
            </section>
        </div>
    );
}
