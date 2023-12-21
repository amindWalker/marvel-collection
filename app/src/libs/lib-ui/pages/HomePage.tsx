import { useEffect } from "react";
import { AppDispatch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacters } from "../../../store/characterSlice";
import { Status } from "../../../types";
import { Outlet } from "react-router-dom";
import { fetchCharactersData } from "../../../services";
import { CharacterList } from "../components";

export default function Home() {
    const dispatch: AppDispatch = useDispatch();
    const { characters, status } = useSelector(selectCharacters);

    useEffect(() => {
        dispatch(fetchCharactersData());
    }, [dispatch]);

    return (
        <div className="base-all overflow-hidden grid grid-flow-col w-screen h-screen">
            <nav className="bg-blue-600 w-64"></nav>
            <div className="-rotate-z-1 grid grid-flow-col overflow-x-scroll self-center">
                <Outlet />
                <h1 className="text-center font-black self-center sticky -rotate-z-90 m-0 -mr-20 mb-10 animate-pulse leading-0">
                    CHOOSE
                    <br />
                    <span className="text-2xl leading-20">YOUR HERO</span>
                </h1>
                {status == Status.Idle ? (
                    characters.map((char) => {
                        return (
                            <div key={char.id}>
                                <CharacterList
                                    id={char.id}
                                    name={char.name}
                                    comics={char.comics}
                                    thumbnail={char.thumbnail}
                                />
                            </div>
                        );
                    })
                ) : (
                    <i className="i-line-md:loading-twotone-loop bg-red-700 p-8 m-4" />
                )}
            </div>
        </div>
    );
}
