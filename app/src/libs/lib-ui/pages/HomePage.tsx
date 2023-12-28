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
import { createPortal } from "react-dom";

export default function Home() {
    const dispatch: AppDispatch = useDispatch();
    const { characters, status } = useSelector(selectCharacters);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        dispatch(fetchCharactersData());
    }, [dispatch]);

    return (
        <div className="base-all overflow-hidden grid grid-flow-col w-screen h-screen">
            <nav className="bg-red-600 w-screen-lg mix-blend-color-dodge bg-op-0">
                <div className="outer-panel">
                    <div className="inner-panel isolate">
                        <button className="btn">BUTTON</button>
                    </div>
                </div>
                {/* <section className="bg-red-900 absolute inset-0 mix-blend-color-dodge z-0"></section> */}
                <div className="outer-panel mix-blend-normal">
                    <div className="inner-panel grid place-items-start">
                        <button className="btn isolate mix-blend-luminosity">
                            BUTTON
                        </button>
                        <img
                            className="max-w-64 isolate hover:brightness-125"
                            src={`${characters[0]?.thumbnail?.path}.${characters[0]?.thumbnail?.extension}`}
                        />
                        <div className="outer-dialog z-1 justify-self-stretch">
                            <button
                                className="btn"
                                onClick={() => setOpenDialog(true)}
                            >
                                BUTTON
                            </button>
                            <dialog
                                open={openDialog}
                                className="backdrop-bg z-0"
                            />
                            <dialog
                                open={openDialog}
                                className="inner-dialog relative z-2 w-full"
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
                <div className="outer-dialog">
                    <button
                        className="btn"
                        onClick={() => setOpenDialog(true)}
                    >
                        BUTTON
                    </button>
                    <dialog
                        open={openDialog}
                        className="backdrop-bg z-0"
                    />
                    <dialog
                        open={openDialog}
                        className="inner-dialog relative w-full z-1"
                    >
                        <button
                            className="btn"
                            onClick={() => setOpenDialog(false)}
                        >
                            CLOSE
                        </button>
                    </dialog>
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
