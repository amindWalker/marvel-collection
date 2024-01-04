import { useEffect, useRef, useState } from "react";
import { AppDispatch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacters } from "../../../store/characterSlice";
import { Status } from "../../../types";
import { Outlet } from "react-router-dom";
import { fetchCharactersData } from "../../../services";
import { CharacterList } from "../components";
import Loading from "../components/Loading";
import MarvelPlaceHolder from "../../../assets/MarvelUnavailable.svg";

export default function Home() {
    const dispatch: AppDispatch = useDispatch();
    const { characters, status } = useSelector(selectCharacters);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        dispatch(fetchCharactersData());
    }, [dispatch]);

    return (
        <div className="base-all overflow-x-hidden grid grid-flow-col w-100vw h-100vh">
            <nav className="bg-red-600 w-screen-lg">
                <section className="bg-red-600 absolute inset-0 h-full w-screen-lg mix-blend-color-dodge z-2 pointer-events-none"></section>
                <div className="outer-panel">
                    <div className="relative inner-panel grid place-items-start ring-op-30 shadow-dark-1">
                        <div className="z-2 overflow-hidden max-w-64 max-h-64 rounded-lg">
                            <img
                                className="max-w-64 hover:brightness-125 hover:scale-105"
                                src={`${characters[0]?.thumbnail?.path}.${characters[0]?.thumbnail?.extension}`}
                            />
                        </div>
                        <div className="inner-panel m-4 ring-op-40 mix-blend-overlay">
                            <button className="btn">BUTTON</button>
                            <span>This is a Marvel Character</span>
                        </div>
                        <div className="relative outer-dialog z-3 justify-self-stretch mix-blend-overlay">
                            <h1>Dialog</h1>
                            <div className="relative z-3 std-text grid grid-cols-5">
                                <button
                                    className="btn col-span-1 self-start"
                                    onClick={() => setOpenDialog(true)}
                                >
                                    BUTTON
                                </button>
                                <div className="col-span-1">
                                    This is a Marvel Character
                                </div>
                                <div className="w-full py8 rounded-lg bg-light text-center col-span-3 h-50 z-3 relative">
                                    TEST
                                </div>
                            </div>
                            <dialog
                                open={openDialog}
                                className="backdrop-bg z-3"
                            />
                            <dialog
                                open={openDialog}
                                className="inner-dialog relative z-4 w-full"
                            >
                                <button
                                    className="btn"
                                    onClick={() => setOpenDialog(false)}
                                >
                                    CLOSE
                                </button>
                            </dialog>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="-rotate-z-1 grid grid-flow-col overflow-x-scroll self-center">
                <Outlet />
                <h1 className="text-center font-black self-center sticky animate-pulse leading-0">
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
        </div>
    );
}
